import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "./AuthContext";

const EnergyContext = createContext(null);

export function EnergyProvider({ children }) {
  const { user, authFetch } = useAuth();
  const [energia, setEnergia] = useState(null);
  const [energiaMax, setEnergiaMax] = useState(null);
  const [segundosParaProxima, setSegundosParaProxima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tickRef = useRef(null);

  const aplicarEstado = useCallback((data) => {
    setEnergia(data.energia);
    setEnergiaMax(data.energia_max);
    setSegundosParaProxima(
      data.energia < data.energia_max ? data.segundos_para_proxima : null
    );
  }, []);

  const refreshEnergy = useCallback(async () => {
    if (!user) return;
    try {
      setError(null);
      const res = await authFetch("/api/energia/estado");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo consultar la energía");
      aplicarEstado(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo consultar tu energía.");
    } finally {
      setLoading(false);
    }
  }, [user, authFetch, aplicarEstado]);

  useEffect(() => {
    if (!user) {
      setEnergia(null);
      setEnergiaMax(null);
      setSegundosParaProxima(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    refreshEnergy();
  }, [user, refreshEnergy]);

  // Cuenta regresiva local (solo visual). Al llegar a 0 vuelve a
  // consultar el backend, que es la única fuente de verdad.
  useEffect(() => {
    clearInterval(tickRef.current);
    if (segundosParaProxima == null) return;

    tickRef.current = setInterval(() => {
      setSegundosParaProxima((prev) => {
        if (prev == null) return prev;
        if (prev <= 1) {
          refreshEnergy();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tickRef.current);
  }, [segundosParaProxima, refreshEnergy]);

  const spendEnergy = useCallback(
    async (cantidad, accion) => {
      try {
        const res = await authFetch("/api/energia/gastar", {
          method: "POST",
          body: JSON.stringify({ cantidad, accion }),
        });
        const data = await res.json();

        if (!res.ok) {
          if (res.status === 409) {
            aplicarEstado(data);
            return { ok: false, motivo: "sin_energia", estado: data };
          }
          throw new Error(data.error || "No se pudo descontar energía");
        }

        aplicarEstado(data);
        return { ok: true, estado: data };
      } catch (err) {
        console.error(err);
        return { ok: false, motivo: "error", error: err };
      }
    },
    [authFetch, aplicarEstado]
  );

  return (
    <EnergyContext.Provider
      value={{ energia, energiaMax, segundosParaProxima, loading, error, spendEnergy, refreshEnergy }}
    >
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  return useContext(EnergyContext);
}