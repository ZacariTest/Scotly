import { resolveSkill } from "./skillEngine.js";

function cloneTeam(team) {
  return team.map((c) => ({
    ...c,
    currentHp: c.hp,
    currentAttack: c.attack,
    skillCooldown: 0,
    buffs: [],
  }));
}

function applyBuffs(char) {
  // Reducir duración de buffs activos
  char.buffs = char.buffs
    .map((b) => ({ ...b, duration: b.duration - 1 }))
    .filter((b) => b.duration > 0);
  // Recalcular ataque con buffs activos
  char.currentAttack = char.attack;
  char.buffs.forEach((b) => {
    if (b.stat === "attack") {
      char.currentAttack = Math.round(char.currentAttack * b.multiplier);
    }
  });
}

function getActive(team) {
  return team.find((c) => c.currentHp > 0) ?? null;
}

function snapshotTeams(player, enemy) {
  return {
    player: player.map((c) => ({
      id: c.id,
      name: c.name,
      img: c.img,
      currentHp: Math.max(0, c.currentHp),
      hp: c.hp,
    })),
    enemy: enemy.map((c) => ({
      id: c.id,
      name: c.name,
      img: c.img,
      currentHp: Math.max(0, c.currentHp),
      hp: c.hp,
    })),
  };
}

export function simulateBattle(playerTeam, enemyTeam) {
  const player = cloneTeam(playerTeam);
  const enemy = cloneTeam(enemyTeam);
  const log = [];
  let turn = 0;
  const MAX_TURNS = 80;

  log.push({
    turn: 0,
    type: "system",
    text: "¡La batalla comienza!",
    snapshot: snapshotTeams(player, enemy),
  });

  while (turn < MAX_TURNS) {
    turn++;
    const pActive = getActive(player);
    const eActive = getActive(enemy);
    if (!pActive || !eActive) break;

    applyBuffs(pActive);
    applyBuffs(eActive);

    // Orden por velocidad
    const order =
      pActive.speed >= eActive.speed
        ? [
            { attacker: pActive, defender: eActive, side: "player" },
            { attacker: eActive, defender: pActive, side: "enemy" },
          ]
        : [
            { attacker: eActive, defender: pActive, side: "enemy" },
            { attacker: pActive, defender: eActive, side: "player" },
          ];

    for (const { attacker, defender, side } of order) {
      if (attacker.currentHp <= 0 || defender.currentHp <= 0) continue;

      const useSkill = attacker.skillCooldown === 0;
      let events = [];

      if (useSkill) {
        events = resolveSkill(attacker.skill, attacker, defender);
        attacker.skillCooldown = attacker.skill.cooldown;
      } else {
        attacker.skillCooldown = Math.max(0, attacker.skillCooldown - 1);
        const dmg = Math.round(attacker.currentAttack);
        events = [{ type: "damage", target: "defender", amount: dmg, label: `Ataque básico: ${dmg} daño` }];
      }

      // Aplicar eventos
      for (const ev of events) {
        const tgt = ev.target === "defender" ? defender : attacker;
        if (ev.type === "damage") {
          tgt.currentHp = Math.max(0, tgt.currentHp - ev.amount);
        } else if (ev.type === "heal") {
          tgt.currentHp = Math.min(tgt.hp, tgt.currentHp + ev.amount);
        } else if (ev.type === "buff" || ev.type === "debuff") {
          tgt.buffs.push({ stat: ev.stat, multiplier: ev.multiplier, duration: ev.duration });
        }
      }

      log.push({
        turn,
        side,
        type: useSkill ? "skill" : "attack",
        character: attacker.name,
        skillName: useSkill ? attacker.skill.name : null,
        events,
        snapshot: snapshotTeams(player, enemy),
      });

      if (defender.currentHp <= 0) {
        log.push({
          turn,
          side,
          type: "ko",
          text: `💀 ${defender.name} fue derrotado`,
          snapshot: snapshotTeams(player, enemy),
        });
      }
    }
  }

  const playerAlive = player.filter((c) => c.currentHp > 0).length;
  const enemyAlive = enemy.filter((c) => c.currentHp > 0).length;
  const winner =
    playerAlive > enemyAlive ? "player" : enemyAlive > playerAlive ? "enemy" : "draw";

  return { log, winner, finalPlayer: player, finalEnemy: enemy };
}