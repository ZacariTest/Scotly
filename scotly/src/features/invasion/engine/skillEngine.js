// Resuelve una habilidad y devuelve los eventos que produce
// Puro JS, sin dependencias de React
export function resolveSkill(skill, attacker, defender) {
  const events = [];

  switch (skill.type) {
    case "crit": {
      const dmg = Math.round(attacker.currentAttack * skill.multiplier);
      events.push({
        type: "damage",
        target: "defender",
        amount: dmg,
        label: `¡${skill.name}! ${dmg} daño crítico`,
      });
      break;
    }
    case "multi": {
      for (let i = 0; i < skill.hits; i++) {
        const dmg = Math.round(attacker.currentAttack * skill.multiplier);
        events.push({
          type: "damage",
          target: "defender",
          amount: dmg,
          label: `${skill.name} — Golpe ${i + 1}: ${dmg} daño`,
        });
      }
      break;
    }
    case "heal": {
      events.push({
        type: "heal",
        target: "attacker",
        amount: skill.amount,
        label: `${skill.name}: +${skill.amount} HP recuperado`,
      });
      break;
    }
    case "buff": {
      events.push({
        type: "buff",
        target: "attacker",
        stat: skill.stat,
        multiplier: skill.multiplier,
        duration: skill.duration,
        label: `${skill.name}: ${skill.stat} aumentado por ${skill.duration} turnos`,
      });
      break;
    }
    case "debuff": {
      events.push({
        type: "debuff",
        target: "defender",
        stat: skill.stat,
        multiplier: skill.multiplier,
        duration: skill.duration,
        label: `${skill.name}: ${skill.stat} reducido en el enemigo`,
      });
      break;
    }
    default:
      break;
  }

  return events;
}