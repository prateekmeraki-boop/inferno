<script lang="ts">
  import MaterialCard from "./MaterialCard.svelte";

  export let materials: Record<string, number>;
  export let gearCount: number;
  export let powerIncrease: number = 0;
  export let fromPower: number = 0;
  export let toPower: number = 0;

  interface MaterialInfo {
    name: string;
    quantity: number;
    tier: string;
  }

  function getMaterialsArray(): MaterialInfo[] {
    const result: MaterialInfo[] = [];

    for (const [key, value] of Object.entries(materials)) {
      if (value > 0) {
        let tier = "";
        if (key.includes("Green") || key.includes("Uncommon")) tier = "Green";
        else if (key.includes("Blue") || key.includes("Rare")) tier = "Blue";
        else if (key.includes("Purple") || key.includes("Epic"))
          tier = "Purple";
        else if (key.includes("Gold") || key.includes("Mythic")) tier = "Gold";
        else if (key.includes("Red") || key.includes("Legendary")) tier = "Red";

        result.push({
          name: key,
          quantity: value,
          tier: tier,
        });
      }
    }

    return result;
  }

  $: materialsList = getMaterialsArray();
  $: hasMaterials = materialsList.length > 0;
</script>

<div
  class="total-materials bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-6 border border-purple-500/30"
>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-white flex items-center gap-2">
      <span class="text-3xl">📊</span> Summary
    </h3>
    <span
      class="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
    >
      {gearCount} upgrade{gearCount !== 1 ? "s" : ""}
    </span>
  </div>

  {#if hasMaterials}
    <!-- Power Increase Summary -->
    <div
      class="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-500/50 rounded-lg p-5 mb-6"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <p class="text-xs text-gray-300 mb-2 uppercase tracking-wide">
            Current Power
          </p>
          <span class="text-3xl font-bold text-white"
            >{fromPower.toLocaleString()}</span
          >
        </div>
        <div class="text-center">
          <p class="text-xs text-gray-300 mb-2 uppercase tracking-wide">
            Target Power
          </p>
          <span class="text-3xl font-bold text-green-300"
            >{toPower.toLocaleString()}</span
          >
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-green-500/30 text-center">
        <p class="text-sm text-gray-300 mb-2 uppercase tracking-wide">
          Power Increase
        </p>
        <span class="text-5xl font-black text-green-300"
          >+{powerIncrease.toLocaleString()}</span
        >
      </div>
    </div>

    <!-- Materials Grid -->
    <h4 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <span>🎒</span> Materials Needed
    </h4>
    <div class="materials-grid grid grid-cols-1 lg:grid-cols-2 gap-4">
      {#each materialsList as material}
        <MaterialCard
          name={material.name}
          quantity={material.quantity}
          tier={material.tier}
        />
      {/each}
    </div>
  {:else}
    <div class="text-center py-12 text-gray-400">
      <p class="text-lg">No materials calculated yet</p>
      <p class="text-sm mt-2">
        Select gear pieces from the left panel to calculate materials
      </p>
    </div>
  {/if}
</div>
