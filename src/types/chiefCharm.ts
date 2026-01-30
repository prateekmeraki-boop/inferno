// src/types/chiefCharm.ts
export type ChiefCharmLevel = {
  level: number;               // 1..16
  guides: number;              // Charm Guides
  designs: number;             // Charm Designs
  jewels: number;              // Jewel Secrets
  statTotal: number;           // e.g. 9.0
  power: number;               // total power at this level
};

export type CharmStep = {
  id: number;                  // 0..63
  level: number;               // 1..16
  part: number;                // 1..4
  label: string;               // "Lv 1 - Part 1"
};
