<script lang="ts">
  import { chiefGearDatabase } from "../../data/chiefGearData";
  import UpgradePairSelector from "./UpgradePairSelector.svelte";
  import MaterialResult from "./MaterialResult.svelte";
  import type { ChiefGear, UpgradePair } from "$lib/types";

  let upgradePairs: UpgradePair[] = [];

  function handleAddPair(event: CustomEvent<UpgradePair>) {
    upgradePairs = [
      ...upgradePairs,
      { ...event.detail, id: `pair_${Date.now()}` },
    ];
  }

  function handleRemovePair(event: CustomEvent<string>) {
    upgradePairs = upgradePairs.filter((p) => p.id !== event.detail);
  }

  function handleClearAll() {
    upgradePairs = [];
  }

  // Calculate materials for upgrade path
  function calculateUpgradeMaterials(
    fromGear: ChiefGear,
    toGear: ChiefGear,
  ): Record<string, number> {
    const materials: Record<string, number> = {};

    const fromIndex = chiefGearDatabase.findIndex((g) => g.id === fromGear.id);
    const toIndex = chiefGearDatabase.findIndex((g) => g.id === toGear.id);

    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return materials;
    }

    for (let i = fromIndex + 1; i <= toIndex; i++) {
      const gear = chiefGearDatabase[i];
      if (gear.materials) {
        for (const [material, quantity] of Object.entries(gear.materials)) {
          materials[material] = (materials[material] || 0) + quantity;
        }
      }
    }

    return materials;
  }

  $: totalMaterials = upgradePairs.reduce(
    (acc, pair) => {
      const pairMaterials = calculateUpgradeMaterials(pair.from, pair.to);
      for (const [material, quantity] of Object.entries(pairMaterials)) {
        acc[material] = (acc[material] || 0) + quantity * pair.quantity;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  // Calculate total power - fixed to properly read from gear objects
  $: totalFromPower = upgradePairs.reduce((sum, pair) => {
    const fromPower = pair.from.powerTotal || 0;
    return sum + fromPower * pair.quantity;
  }, 0);

  $: totalToPower = upgradePairs.reduce((sum, pair) => {
    const toPower = pair.to.powerTotal || 0;
    return sum + toPower * pair.quantity;
  }, 0);

  $: totalPowerIncrease = totalToPower - totalFromPower;
</script>

<div class="calculator-container grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
  <div class="gear-selection-panel">
    <UpgradePairSelector gears={chiefGearDatabase} on:addpair={handleAddPair} />
  </div>

  <div class="material-result-panel">
    <MaterialResult
      {upgradePairs}
      {totalMaterials}
      powerIncrease={totalPowerIncrease}
      fromPower={totalFromPower}
      toPower={totalToPower}
      on:removepair={handleRemovePair}
      on:clearall={handleClearAll}
    />
  </div>
</div>

<style>
  .calculator-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .gear-selection-panel,
  .material-result-panel {
    min-height: 600px;
  }
</style>
