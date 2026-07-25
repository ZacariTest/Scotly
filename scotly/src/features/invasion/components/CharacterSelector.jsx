import { useState, useEffect } from "react";
import CardDisplay from "./CardDisplay";
import { CHARACTERS } from "../data/characters";
import { CURRENT_SEASON } from "../data/seasons";
import { useAuth } from "../../../context/AuthContext";
import { aplicarEscaladoPorNivel } from "../utils/nivelScaling";

const MAX_SELECTION = 3;

export default function CharacterSelector({ selected, onToggle, onConfirm, confirmDisabled = false }) {
  const { authFetch, user, loading: authLoading } = useAuth();
  const [ownedCharacters, setOwnedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    async function cargarInventario() {
      try {
        const res = await authFetch("/api/inventario/cartas");
        const data = await res.json();
        if (res.ok) {
          const infoPorCodigo = {};
          data.cartas.forEach((c) => {
            infoPorCodigo[(c.codigo ?? "").toLowerCase()] = {
              nivel: c.nivel ?? 1,
              cantidad: c.cantidad ?? 1,
            };
          });

          const disponibles = CHARACTERS
            .filter((c) => infoPorCodigo[c.id.toLowerCase()])
            .map((c) => aplicarEscaladoPorNivel(c, infoPorCodigo[c.id.toLowerCase()].nivel));

          setOwnedCharacters(disponibles);
        }
      } catch (err) {
        console.error("Error al cargar inventario para Invasión:", err);
      } finally {
        setLoading(false);
      }
    }
    cargarInventario();
  }, [authFetch, user, authLoading]);

  const ready = selected.length === MAX_SELECTION;
  const disabled = !ready || confirmDisabled;

  return (
    <div className="inv-selector">

      <div className="inv-season-banner">
        <div className="inv-season-badge">{CURRENT_SEASON.badge}</div>
        <h2 className="inv-season-name">{CURRENT_SEASON.name}</h2>
        <p className="inv-season-desc">{CURRENT_SEASON.description}</p>
        <div className="inv-season-reward">
          <span>🏆 Victoria: <strong>{CURRENT_SEASON.reward.coins} monedas</strong> + <strong>{CURRENT_SEASON.reward.xp} XP</strong></span>
        </div>
      </div>

      <div className="inv-enemy-preview">
        <p className="inv-enemy-preview__label">Rival de temporada</p>
        <div className="inv-enemy-preview__members">
          {CURRENT_SEASON.enemy.members.map((m) => (
            <div key={m.id} className={`inv-enemy-chip inv-enemy-chip--${m.rarity}`}>
              <span className="inv-enemy-chip__name">{m.name}</span>
              <span className="inv-enemy-chip__stats">❤{m.hp} ⚔{m.attack} ⚡{m.speed}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="inv-selector__header">
        <h3 className="inv-selector__title">Elegí tu equipo</h3>
        <span className="inv-selector__count">{selected.length} / {MAX_SELECTION}</span>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem", opacity: 0.7 }}>Cargando tu colección...</p>
      ) : ownedCharacters.length === 0 ? (
        <p style={{ textAlign: "center", padding: "2rem", opacity: 0.7 }}>
          Todavía no tenés guerreros para esta batalla. Conseguí cartas en la tienda o reclamando regalos.
        </p>
      ) : (
        <div className="inv-selector__grid">
          {ownedCharacters.map((char) => (
            <CardDisplay
              key={char.id}
              character={char}
              selected={selected.some((s) => s.id === char.id)}
              disabled={selected.length >= MAX_SELECTION && !selected.some((s) => s.id === char.id)}
              onClick={() => onToggle(char)}
            />
          ))}
        </div>
      )}

      <button
        className="inv-selector__confirm"
        disabled={disabled}
        onClick={onConfirm}
      >
        {ready ? "¡Defender las Highlands!" : `Elegí ${MAX_SELECTION - selected.length} personaje${MAX_SELECTION - selected.length !== 1 ? "s" : ""} más`}
      </button>
    </div>
  );
}