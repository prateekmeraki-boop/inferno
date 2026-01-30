export interface Material {
  name: string;
  count: number;
}

export interface ChiefGear {
  id: string;
  tier: string;
  name?: string;
  tierColor: 'green' | 'blue' | 'purple' | 'gold' | 'red';
  stars: number;
  materials: {
    designPlan?: number;
    hardenedAlloy?: number;
    polishingSolution?: number;
    lunarAmber?: number;
  };
  bonus: string;
  statTotal?: string;
  powerTotal: number;
}

export interface SelectedGear extends ChiefGear {
  quantity: number;
}

export interface CalculationResult {
  gearId: string;
  quantity: number;
  totalDesignPlan: number;
  totalHardenedAlloy: number;
  totalPolishingSolution: number;
  totalLunarAmber: number;
  totalPower: number;
}
