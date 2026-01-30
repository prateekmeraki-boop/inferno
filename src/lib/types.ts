export interface ChiefGear {
  id: string;
  tier: string;
  tierColor: string;
  stars: number;
  materials: Record<string, number>;
  bonus: string;
  powerTotal: number;
}

export interface UpgradePair {
  id: string;
  from: ChiefGear;
  to: ChiefGear;
  quantity: number;
}

export interface SelectedGear extends ChiefGear {
  quantity: number;
}
