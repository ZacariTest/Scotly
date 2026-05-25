import { useEffect, useRef } from "react";

export default function BattleLog({ entries }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [entries]);

  return (
    <div className="inv-log" ref={ref}>
      {entries.map((e, i) => (
        <div key={i} className={`inv-log__entry inv-log__entry--${e.side ?? "system"}`}>
          {e.turn > 0 && <span className="inv-log__turn">T{e.turn}</span>}
          <span className="inv-log__text">{e.text}</span>
        </div>
      ))}
    </div>
  );
}
