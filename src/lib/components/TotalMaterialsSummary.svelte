<script lang="ts">
  import MaterialCard from "./MaterialCard.svelte";

  export let materials: Record<string, number>;
  export let gearCount: number;

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
</script>

<div
  class="total-materials bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-lg p-6 border border-purple-500/30"
>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-white flex items-center gap-2">
      <span class="text-3xl">📊</span> Total Materials
    </h3>
    <span
      class="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
    >
      {gearCount} gear{gearCount !== 1 ? "s" : ""}
    </span>
  </div>

  {#if materialsList.length > 0}
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
