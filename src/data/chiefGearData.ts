import type { ChiefGear } from '$types';

export const chiefGearDatabase: ChiefGear[] = [
  // Green (Uncommon)
  { id: 'green_0', tier: 'Green (Uncommon)', tierColor: 'green', stars: 0, materials: { hardenedAlloy: 1500, polishingSolution: 15 }, bonus: '9.35%', powerTotal: 224400 },
  { id: 'green_1', tier: 'Green (Uncommon)', tierColor: 'green', stars: 1, materials: { hardenedAlloy: 3800, polishingSolution: 40 }, bonus: '+12.75%', powerTotal: 306000 },
  
  // Blue (Rare)
  { id: 'blue_0', tier: 'Blue (Rare)', tierColor: 'blue', stars: 0, materials: { hardenedAlloy: 7000, polishingSolution: 70 }, bonus: '+17.00%', powerTotal: 408000 },
  { id: 'blue_1', tier: 'Blue (Rare)', tierColor: 'blue', stars: 1, materials: { hardenedAlloy: 9700, polishingSolution: 95 }, bonus: '+21.25%', powerTotal: 510000 },
  { id: 'blue_2', tier: 'Blue (Rare)', tierColor: 'blue', stars: 2, materials: { designPlan: 45 }, bonus: '+25.50%', powerTotal: 612000 },
  { id: 'blue_3', tier: 'Blue (Rare)', tierColor: 'blue', stars: 3, materials: { designPlan: 50 }, bonus: '+29.75%', powerTotal: 714000 },
  
  // Purple (Epic)
  { id: 'purple_0', tier: 'Purple (Epic)', tierColor: 'purple', stars: 0, materials: { designPlan: 60 }, bonus: '+34.00%', powerTotal: 816000 },
  { id: 'purple_1', tier: 'Purple (Epic)', tierColor: 'purple', stars: 1, materials: { designPlan: 70 }, bonus: '+36.89%', powerTotal: 885360 },
  { id: 'purple_2', tier: 'Purple (Epic)', tierColor: 'purple', stars: 2, materials: { designPlan: 40, hardenedAlloy: 6500, polishingSolution: 65 }, bonus: '+39.78%', powerTotal: 954720 },
  { id: 'purple_3', tier: 'Purple (Epic)', tierColor: 'purple', stars: 3, materials: { designPlan: 50, hardenedAlloy: 8000, polishingSolution: 80 }, bonus: '+42.67%', powerTotal: 1024080 },
  
  // Purple (Epic) T1
  { id: 'purple_t1_0', tier: 'Purple (Epic) T1', tierColor: 'purple', stars: 0, materials: { designPlan: 60, hardenedAlloy: 10000, polishingSolution: 95 }, bonus: '+45.56%', powerTotal: 1093440 },
  { id: 'purple_t1_1', tier: 'Purple (Epic) T1', tierColor: 'purple', stars: 1, materials: { designPlan: 70, hardenedAlloy: 11000, polishingSolution: 110 }, bonus: '+48.45%', powerTotal: 1162800 },
  { id: 'purple_t1_2', tier: 'Purple (Epic) T1', tierColor: 'purple', stars: 2, materials: { designPlan: 85, hardenedAlloy: 13000, polishingSolution: 130 }, bonus: '+51.34%', powerTotal: 1232160 },
  { id: 'purple_t1_3', tier: 'Purple (Epic) T1', tierColor: 'purple', stars: 3, materials: { designPlan: 100, hardenedAlloy: 15000, polishingSolution: 160 }, bonus: '+54.23%', powerTotal: 1301520 },
  
  // Gold (Mythic)
  { id: 'gold_0', tier: 'Gold (Mythic)', tierColor: 'gold', stars: 0, materials: { designPlan: 40, hardenedAlloy: 22000, polishingSolution: 220 }, bonus: '+56.78%', powerTotal: 1362720 },
  { id: 'gold_1', tier: 'Gold (Mythic)', tierColor: 'gold', stars: 1, materials: { designPlan: 40, hardenedAlloy: 23000, polishingSolution: 230 }, bonus: '+59.33%', powerTotal: 1423920 },
  { id: 'gold_2', tier: 'Gold (Mythic)', tierColor: 'gold', stars: 2, materials: { designPlan: 45, hardenedAlloy: 25000, polishingSolution: 250 }, bonus: '+61.88%', powerTotal: 1485120 },
  { id: 'gold_3', tier: 'Gold (Mythic)', tierColor: 'gold', stars: 3, materials: { designPlan: 45, hardenedAlloy: 26000, polishingSolution: 260 }, bonus: '+64.43%', powerTotal: 1546320 },
  
  // Gold (Mythic) T1
  { id: 'gold_t1_0', tier: 'Gold (Mythic) T1', tierColor: 'gold', stars: 0, materials: { designPlan: 45, hardenedAlloy: 28000, polishingSolution: 280 }, bonus: '+66.98%', powerTotal: 1607520 },
  { id: 'gold_t1_1', tier: 'Gold (Mythic) T1', tierColor: 'gold', stars: 1, materials: { designPlan: 55, hardenedAlloy: 30000, polishingSolution: 300 }, bonus: '+69.53%', powerTotal: 1668720 },
  { id: 'gold_t1_2', tier: 'Gold (Mythic) T1', tierColor: 'gold', stars: 2, materials: { designPlan: 55, hardenedAlloy: 32000, polishingSolution: 320 }, bonus: '+72.08%', powerTotal: 1729920 },
  { id: 'gold_t1_3', tier: 'Gold (Mythic) T1', tierColor: 'gold', stars: 3, materials: { designPlan: 55, hardenedAlloy: 35000, polishingSolution: 340 }, bonus: '+74.63%', powerTotal: 1791120 },
  
  // Gold (Mythic) T2
  { id: 'gold_t2_0', tier: 'Gold (Mythic) T2', tierColor: 'gold', stars: 0, materials: { designPlan: 55, hardenedAlloy: 38000, polishingSolution: 360 }, bonus: '+77.18%', powerTotal: 1852320 },
  { id: 'gold_t2_1', tier: 'Gold (Mythic) T2', tierColor: 'gold', stars: 1, materials: { designPlan: 75, hardenedAlloy: 43000, polishingSolution: 430 }, bonus: '+79.73%', powerTotal: 1913520 },
  { id: 'gold_t2_2', tier: 'Gold (Mythic) T2', tierColor: 'gold', stars: 2, materials: { designPlan: 80, hardenedAlloy: 45000, polishingSolution: 460 }, bonus: '+82.28%', powerTotal: 1974720 },
  { id: 'gold_t2_3', tier: 'Gold (Mythic) T2', tierColor: 'gold', stars: 3, materials: { designPlan: 85, hardenedAlloy: 48000, polishingSolution: 500 }, bonus: '+85.00%', powerTotal: 2040000 },
  
  // Red (Legendary)
  { id: 'red_0', tier: 'Red (Legendary)', tierColor: 'red', stars: 0, materials: { designPlan: 85, hardenedAlloy: 50000, polishingSolution: 530, lunarAmber: 10 }, bonus: '+89.25%', powerTotal: 2142000 },
  { id: 'red_1', tier: 'Red (Legendary)', tierColor: 'red', stars: 1, materials: { designPlan: 90, hardenedAlloy: 52000, polishingSolution: 560, lunarAmber: 10 }, bonus: '+93.50%', powerTotal: 2244000 },
  { id: 'red_2', tier: 'Red (Legendary)', tierColor: 'red', stars: 2, materials: { designPlan: 95, hardenedAlloy: 54000, polishingSolution: 590, lunarAmber: 10 }, bonus: '+97.75%', powerTotal: 2346000 },
  { id: 'red_3', tier: 'Red (Legendary)', tierColor: 'red', stars: 3, materials: { designPlan: 100, hardenedAlloy: 56000, polishingSolution: 620, lunarAmber: 10 }, bonus: '+102.00%', powerTotal: 2448000 },
  
  // Red (Legendary) T1
  { id: 'red_t1_0', tier: 'Red (Legendary) T1', tierColor: 'red', stars: 0, materials: { designPlan: 110, hardenedAlloy: 59000, polishingSolution: 670, lunarAmber: 15 }, bonus: '+106.25%', powerTotal: 2550000 },
  { id: 'red_t1_1', tier: 'Red (Legendary) T1', tierColor: 'red', stars: 1, materials: { designPlan: 115, hardenedAlloy: 61000, polishingSolution: 700, lunarAmber: 15 }, bonus: '+110.50%', powerTotal: 2652000 },
  { id: 'red_t1_2', tier: 'Red (Legendary) T1', tierColor: 'red', stars: 2, materials: { designPlan: 120, hardenedAlloy: 63000, polishingSolution: 730, lunarAmber: 15 }, bonus: '+114.75%', powerTotal: 2754000 },
  { id: 'red_t1_3', tier: 'Red (Legendary) T1', tierColor: 'red', stars: 3, materials: { designPlan: 125, hardenedAlloy: 65000, polishingSolution: 760, lunarAmber: 15 }, bonus: '+119.00%', powerTotal: 2856000 },
  
  // Red (Legendary) T2
  { id: 'red_t2_0', tier: 'Red (Legendary) T2', tierColor: 'red', stars: 0, materials: { designPlan: 135, hardenedAlloy: 68000, polishingSolution: 810, lunarAmber: 20 }, bonus: '+123.25%', powerTotal: 2958000 },
  { id: 'red_t2_1', tier: 'Red (Legendary) T2', tierColor: 'red', stars: 1, materials: { designPlan: 140, hardenedAlloy: 70000, polishingSolution: 840, lunarAmber: 20 }, bonus: '+127.50%', powerTotal: 3060000 },
  { id: 'red_t2_2', tier: 'Red (Legendary) T2', tierColor: 'red', stars: 2, materials: { designPlan: 145, hardenedAlloy: 72000, polishingSolution: 870, lunarAmber: 20 }, bonus: '+131.75%', powerTotal: 3162000 },
  { id: 'red_t2_3', tier: 'Red (Legendary) T2', tierColor: 'red', stars: 3, materials: { designPlan: 150, hardenedAlloy: 74000, polishingSolution: 900, lunarAmber: 20 }, bonus: '+136.00%', powerTotal: 3264000 },
  
  // Red (Legendary) T3
  { id: 'red_t3_0', tier: 'Red (Legendary) T3', tierColor: 'red', stars: 0, materials: { designPlan: 160, hardenedAlloy: 77000, polishingSolution: 950, lunarAmber: 25 }, bonus: '+140.25%', powerTotal: 3366000 },
  { id: 'red_t3_1', tier: 'Red (Legendary) T3', tierColor: 'red', stars: 1, materials: { designPlan: 165, hardenedAlloy: 80000, polishingSolution: 990, lunarAmber: 25 }, bonus: '+144.50%', powerTotal: 3468000 },
  { id: 'red_t3_2', tier: 'Red (Legendary) T3', tierColor: 'red', stars: 2, materials: { designPlan: 170, hardenedAlloy: 83000, polishingSolution: 1030, lunarAmber: 25 }, bonus: '+148.75%', powerTotal: 3570000 },
  { id: 'red_t3_3', tier: 'Red (Legendary) T3', tierColor: 'red', stars: 3, materials: { designPlan: 180, hardenedAlloy: 86000, polishingSolution: 1070, lunarAmber: 25 }, bonus: '+153.00%', powerTotal: 3672000 },
  
  // Red (Legendary) T4
  { id: 'red_t4_0', tier: 'Red (Legendary) T4', tierColor: 'red', stars: 0, materials: { designPlan: 250, hardenedAlloy: 120000, polishingSolution: 1500, lunarAmber: 40 }, bonus: '+161.50%', powerTotal: 3876000 },
  { id: 'red_t4_1', tier: 'Red (Legendary) T4', tierColor: 'red', stars: 1, materials: { designPlan: 275, hardenedAlloy: 140000, polishingSolution: 1650, lunarAmber: 40 }, bonus: '+170.00%', powerTotal: 4080000 },
  { id: 'red_t4_2', tier: 'Red (Legendary) T4', tierColor: 'red', stars: 2, materials: { designPlan: 300, hardenedAlloy: 160000, polishingSolution: 1800, lunarAmber: 40 }, bonus: '+178.50%', powerTotal: 4284000 },
  { id: 'red_t4_3', tier: 'Red (Legendary) T4', tierColor: 'red', stars: 3, materials: { designPlan: 325, hardenedAlloy: 180000, polishingSolution: 1950, lunarAmber: 40 }, bonus: '+187.00%', powerTotal: 4488000 },
];

export function getGearById(id: string): ChiefGear | undefined {
  return chiefGearDatabase.find(gear => gear.id === id);
}

export function getGearsByTier(tier: string): ChiefGear[] {
  return chiefGearDatabase.filter(gear => gear.tier === tier);
}

export function getAllTiers(): string[] {
  return [...new Set(chiefGearDatabase.map(gear => gear.tier))];
}
