<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { UpgradePair } from "$lib/types";
  import TotalMaterialsSummary from "./TotalMaterialsSummary.svelte";
  import UpgradePairList from "./UpgradePairList.svelte";

  export let upgradePairs: UpgradePair[];
  export let totalMaterials: Record<string, number>;
  export let powerIncrease: number = 0;
  export let fromPower: number = 0;
  export let toPower: number = 0;

  const dispatch = createEventDispatcher();

  $: pairCount = upgradePairs.length;

  function handleRemovePair(event: CustomEvent<string>) {
    dispatch("removepair", event.detail);
  }
</script>

<div class="material-result bg-slate-800/50 rounded-lg p-6">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold text-white">Materials Required</h2>
    {#if upgradePairs.length > 0}
      <button
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        on:click={() => dispatch("clearall")}
      >
        Clear All
      </button>
    {/if}
  </div>

  {#if upgradePairs.length > 0}
    <div class="space-y-6">
      <UpgradePairList {upgradePairs} on:removepair={handleRemovePair} />

      <TotalMaterialsSummary
        materials={totalMaterials}
        gearCount={pairCount}
        {powerIncrease}
        {fromPower}
        {toPower}
      />
    </div>
  {:else}
    <div class="empty-state text-center py-20 text-gray-400">
      <div class="text-6xl mb-4">🎯</div>
      <p class="text-xl mb-2">No upgrade paths selected</p>
      <p class="text-sm">
        Select current and target gear levels from the left panel
      </p>
    </div>
  {/if}
</div>

<style>
  .empty-state {
    border: 2px dashed rgba(148, 163, 184, 0.3);
    border-radius: 0.5rem;
  }
</style>
