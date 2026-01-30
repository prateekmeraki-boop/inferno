<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ChiefGear } from "$lib/types";

  export let gears: ChiefGear[];

  const dispatch = createEventDispatcher();

  let fromGear: ChiefGear | null = null;
  let toGear: ChiefGear | null = null;
  let quantity: number = 1;

  function getGearDisplayName(gear: ChiefGear): string {
    const stars = "⭐".repeat(gear.stars);
    return `${gear.tier} ${stars}`;
  }

  $: validToGears = fromGear
    ? gears.filter((g) => {
        const fromIndex = gears.findIndex((gear) => gear.id === fromGear?.id);
        const toIndex = gears.findIndex((gear) => gear.id === g.id);
        return toIndex > fromIndex;
      })
    : [];

  function handleAddPair() {
    if (fromGear && toGear && quantity > 0) {
      dispatch("addpair", {
        from: fromGear,
        to: toGear,
        quantity,
      });
      // Reset
      fromGear = null;
      toGear = null;
      quantity = 1;
    }
  }
</script>

<div class="upgrade-selector bg-slate-800/50 rounded-lg p-6">
  <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
    <span class="text-3xl">🎯</span> Select Gear
  </h2>

  <div class="space-y-6">
    <!-- Current Level -->
    <div>
      <label class="block text-white text-sm font-medium mb-2"
        >Current Level</label
      >
      <select
        bind:value={fromGear}
        class="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value={null}>Select current gear...</option>
        {#each gears as gear}
          <option value={gear}>{getGearDisplayName(gear)} - {gear.bonus}</option
          >
        {/each}
      </select>
    </div>

    <!-- Target Level -->
    <div>
      <label class="block text-white text-sm font-medium mb-2"
        >Target Level</label
      >
      <select
        bind:value={toGear}
        disabled={!fromGear}
        class="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value={null}>Select target gear...</option>
        {#each validToGears as gear}
          <option value={gear}>{getGearDisplayName(gear)} - {gear.bonus}</option
          >
        {/each}
      </select>
    </div>

    <!-- Quantity -->
    <div>
      <label class="block text-white text-sm font-medium mb-2">Quantity</label>
      <input
        type="number"
        bind:value={quantity}
        min="1"
        class="w-full px-4 py-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    <!-- Add Button -->
    <button
      on:click={handleAddPair}
      disabled={!fromGear || !toGear || quantity < 1}
      class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add Upgrade Path
    </button>

    <!-- Info Box -->
    {#if fromGear && toGear}
      <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
        <p class="text-blue-300 text-sm">
          <strong>Upgrade:</strong><br />
          {getGearDisplayName(fromGear)} → {getGearDisplayName(toGear)}
        </p>
      </div>
    {/if}
  </div>
</div>
