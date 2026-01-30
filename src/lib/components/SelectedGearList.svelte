<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SelectedGear } from "$lib/types";

  export let selectedGears: SelectedGear[];

  const dispatch = createEventDispatcher();

  function getGearDisplayName(gear: SelectedGear): string {
    // Create display name from tier and stars if name is not available
    if (gear.name) return gear.name;

    const stars = "⭐".repeat(gear.stars || 0);
    return `${gear.tier} ${stars || "⭐0"}`;
  }

  function handleQuantityChange(id: string, newQty: number) {
    dispatch("quantitychange", { id, quantity: newQty });
  }

  function handleRemove(id: string) {
    dispatch("removegear", id);
  }
</script>

<div class="selected-gears bg-slate-700/30 rounded-lg p-4">
  <h3 class="text-lg font-semibold text-white mb-4">
    Selected Gear ({selectedGears.length})
  </h3>
  <div class="space-y-2">
    {#each selectedGears as gear}
      <div
        class="gear-item bg-slate-600/40 rounded-lg p-3 flex items-center justify-between"
      >
        <div class="flex-1">
          <p class="text-white font-medium">{getGearDisplayName(gear)}</p>
          <p class="text-gray-400 text-sm">{gear.tier}</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="quantity-controls flex items-center gap-2">
            <button
              class="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded"
              on:click={() => handleQuantityChange(gear.id, gear.quantity - 1)}
              >-</button
            >
            <span class="text-white font-semibold w-12 text-center"
              >{gear.quantity}</span
            >
            <button
              class="bg-slate-700 hover:bg-slate-600 text-white w-8 h-8 rounded"
              on:click={() => handleQuantityChange(gear.id, gear.quantity + 1)}
              >+</button
            >
          </div>
          <button
            class="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded"
            on:click={() => handleRemove(gear.id)}>×</button
          >
        </div>
      </div>
    {/each}
  </div>
</div>
