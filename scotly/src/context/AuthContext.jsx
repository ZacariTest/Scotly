import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, recupera sesión guardada en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("scotly_token");
    const storedUser = localStorage.getItem("scotly_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const guardarSesion = (data) => {
    setToken(data.token);
    setUser(data.usuario);
    localStorage.setItem("scotly_token", data.token);
    localStorage.setItem("scotly_user", JSON.stringify(data.usuario));
  };

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("No se pudo iniciar sesión. Verificá tus datos.");
    }

    guardarSesion(data);
  };

  const register = async ({ username, email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        "No se pudo crear la cuenta. Intentá con otro usuario o email."
      );
    }

    guardarSesion(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("scotly_token");
    localStorage.removeItem("scotly_user");
  };

  const updateUser = (partial) => {
    setUser((prev) => {
      const actualizado = { ...prev, ...partial };
      localStorage.setItem("scotly_user", JSON.stringify(actualizado));
      return actualizado;
    });
  };

  // Actualizar perfil
  const updateProfile = async ({ email, foto_perfil }) => {
    const res = await authFetch("/api/usuarios/me", {
      method: "PUT",
      body: JSON.stringify({ email, foto_perfil }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo actualizar el perfil");
    }

    updateUser(data.usuario);
    return data.usuario;
  };

  // Cambiar contraseña
  const changePassword = async (passwordActual, passwordNueva) => {
    const res = await authFetch("/api/usuarios/password", {
      method: "PUT",
      body: JSON.stringify({ passwordActual, passwordNueva }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo cambiar la contraseña");
    }

    return data.mensaje;
  };

  // Wrapper de fetch que agrega el JWT automáticamente
  const authFetch = (path, options = {}) => {
    return fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        authFetch,
        updateUser,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}