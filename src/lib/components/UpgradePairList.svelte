<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { UpgradePair } from "$lib/types";

  export let upgradePairs: UpgradePair[];

  const dispatch = createEventDispatcher();

  function getGearDisplayName(tier: string, stars: number): string {
    const starIcons = "⭐".repeat(stars);
    return `${tier} ${starIcons}`;
  }

  function handleRemove(id: string) {
    dispatch("removepair", id);
  }
</script>

<div class="upgrade-pairs bg-slate-700/30 rounded-lg p-4">
  <h3 class="text-lg font-semibold text-white mb-4">
    Upgrade Paths ({upgradePairs.length})
  </h3>
  <div class="space-y-3">
    {#each upgradePairs as pair}
      <div
        class="pair-item bg-slate-600/40 rounded-lg p-4 border-l-4 border-purple-500"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="text-gray-400 text-xs mb-1">
              Quantity: {pair.quantity}×
            </div>
            <div class="flex items-center gap-2 text-white">
              <span class="font-medium"
                >{getGearDisplayName(pair.from.tier, pair.from.stars)}</span
              >
              <span class="text-purple-400">→</span>
              <span class="font-medium"
                >{getGearDisplayName(pair.to.tier, pair.to.stars)}</span
              >
            </div>
            <div class="text-xs text-gray-500 mt-1">
              {pair.from.bonus} → {pair.to.bonus}
            </div>
          </div>
          <button
            class="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
            on:click={() => handleRemove(pair.id)}>×</button
          >
        </div>
      </div>
    {/each}
  </div>
</div>
