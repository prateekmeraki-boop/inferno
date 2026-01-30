// src/data/chiefCharmData.ts
import type { ChiefCharmLevel, CharmStep } from '../types/chiefCharm';

export const chiefCharmLevels: ChiefCharmLevel[] = [
  { level: 1,  guides: 5,   designs: 5,   jewels: 0,   statTotal: 9.0,  power: 205700 },
  { level: 2,  guides: 40,  designs: 15,  jewels: 0,   statTotal: 12.0, power: 288000 },
  { level: 3,  guides: 60,  designs: 40,  jewels: 0,   statTotal: 16.0, power: 370000 },
  { level: 4,  guides: 100, designs: 80,  jewels: 0,   statTotal: 19.0, power: 452000 },
  { level: 5,  guides: 200, designs: 100, jewels: 0,   statTotal: 25.0, power: 576000 },
  { level: 6,  guides: 120, designs: 300, jewels: 0,   statTotal: 30.0, power: 700000 },
  { level: 7,  guides: 140, designs: 400, jewels: 0,   statTotal: 35.0, power: 824000 },
  { level: 8,  guides: 200, designs: 400, jewels: 0,   statTotal: 40.0, power: 948000 },
  { level: 9,  guides: 400, designs: 300, jewels: 0,   statTotal: 45.0, power: 1072000 },
  { level: 10, guides: 420, designs: 420, jewels: 0,   statTotal: 50.0, power: 1196000 },
  { level: 11, guides: 420, designs: 560, jewels: 0,   statTotal: 55.0, power: 1320000 },
  { level: 12, guides: 450, designs: 580, jewels: 15,  statTotal: 64.0, power: 1444000 },
  { level: 13, guides: 450, designs: 580, jewels: 30,  statTotal: 73.0, power: 1568000 },
  { level: 14, guides: 500, designs: 600, jewels: 45,  statTotal: 82.0, power: 1692000 },
  { level: 15, guides: 500, designs: 600, jewels: 70,  statTotal: 91.0, power: 1816000 },
  { level: 16, guides: 550, designs: 650, jewels: 100, statTotal: 100.0, power: 1940000 },
];

// 64 charm sub-steps (4 per level)
export const charmSteps: CharmStep[] = [];

for (let level = 1; level <= 16; level++) {
  for (let part = 1; part <= 4; part++) {
    const id = (level - 1) * 4 + (part - 1);
    const isLastPart = part === 4;

    const displayLevel = isLastPart ? level + 1 : level;
    const label = isLastPart
      ? `Lv ${displayLevel}`
      : `Lv ${displayLevel} - Part ${part}`;

    charmSteps.push({
      id,
      level,
      part,
      label,
    });
  }
}

// 🚨 Make sure this export exists:
export function getPerPartCost(level: number) {
  const row = chiefCharmLevels.find((l) => l.level === level);
  if (!row) throw new Error(`Missing charm level ${level}`);
  return {
    guides: row.guides / 4,
    designs: row.designs / 4,
    jewels: row.jewels / 4,
    power: row.power / 4,
  };
}
