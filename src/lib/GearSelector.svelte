<script lang="ts">
  import { gearData } from "../lib/gearData";
  import type { GearItem, UpgradePath } from "../lib/types";

  export let upgradePaths: UpgradePath[] = [];

  let currentGear: GearItem | null = null;
  let targetGear: GearItem | null = null;
  let quantity: number = 1;

  // Reactive statement to filter target options
  $: targetGearOptions = currentGear
    ? gearData.filter(
        (g) => g.level > currentGear!.level && g.rarity === currentGear!.rarity,
      )
    : [];

  // Reset target when current changes
  $: if (currentGear && targetGear) {
    if (
      targetGear.level <= currentGear.level ||
      targetGear.rarity !== currentGear.rarity
    ) {
      targetGear = null;
    }
  }

  function addUpgradePath() {
    if (!currentGear || !targetGear) return;

    const newPath: UpgradePath = {
      id: Date.now(),
      current: currentGear,
      target: targetGear,
      quantity,
    };

    upgradePaths = [...upgradePaths, newPath];

    // Reset
    currentGear = null;
    targetGear = null;
    quantity = 1;
  }

  function removeUpgradePath(id: number) {
    upgradePaths = upgradePaths.filter((path) => path.id !== id);
  }

  function clearAll() {
    upgradePaths = [];
  }

  $: currentGearOptions = gearData;
</script>

<div class="space-y-6">
  <!-- Selector Section -->
  <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
    <div class="flex items-center gap-3 mb-6">
      <div
        class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center"
      >
        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white">Select Gear</h2>
    </div>

    <div class="space-y-4">
      <!-- Current Level -->
      <div>
        <label class="block text-slate-300 text-sm font-medium mb-2"
          >Current Level</label
        >
        <select
          bind:value={currentGear}
          class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        >
          <option value={null}>Select current gear...</option>
          {#each currentGearOptions as gear}
            <option value={gear}>
              {gear.name} ({gear.rarity})
            </option>
          {/each}
        </select>
      </div>

      <!-- Target Level -->
      <div>
        <label class="block text-slate-300 text-sm font-medium mb-2"
          >Target Level</label
        >
        <select
          bind:value={targetGear}
          disabled={!currentGear}
          class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value={null}>
            {#if !currentGear}
              Please select current gear first...
            {:else}
              Select target gear...
            {/if}
          </option>
          {#each targetGearOptions as gear}
            <option value={gear}>
              {gear.name} ({gear.rarity})
            </option>
          {/each}
        </select>
        <p class="text-slate-400 text-xs mt-2">
          {#if !currentGear}
            Please select a current gear level first.
          {:else if targetGearOptions.length === 0}
            No higher levels available for this rarity.
          {:else}
            Target must be higher than current within the same rarity.
          {/if}
        </p>
      </div>

      <!-- Quantity -->
      <div>
        <label class="block text-slate-300 text-sm font-medium mb-2"
          >Quantity</label
        >
        <input
          type="number"
          bind:value={quantity}
          min="1"
          class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <!-- Add Button -->
      <button
        on:click={addUpgradePath}
        disabled={!currentGear || !targetGear}
        class="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-purple-500"
      >
        Add Upgrade Path
      </button>
    </div>
  </div>

  <!-- Upgrade Paths Display -->
  {#if upgradePaths.length > 0}
    <div class="bg-slate-800 rounded-xl p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-bold text-white">
          Upgrade Paths ({upgradePaths.length})
        </h3>
        <button
          on:click={clearAll}
          class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
        >
          Clear All
        </button>
      </div>

      <div class="space-y-3">
        {#each upgradePaths as path}
          <div
            class="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between"
          >
            <div class="flex-1">
              <div class="text-sm text-slate-400 mb-1">
                Quantity: {path.quantity}x
              </div>
              <div class="flex items-center gap-2">
                <span class="text-white font-medium">{path.current.name}</span>
                <span class="text-yellow-400">★</span>
                <svg
                  class="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span class="text-red-400">★</span>
                <span class="text-white font-medium">{path.target.name}</span>
              </div>
              <div class="text-xs text-slate-400 mt-1">
                {path.current.power.toLocaleString()} → {path.target.power.toLocaleString()}
                power
              </div>
            </div>
            <button
              on:click={() => removeUpgradePath(path.id)}
              class="ml-4 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
            >
              ✕
            </button>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
