<script lang="ts">
  import type { ChiefGear } from "$types";
  import { getAllTiers } from "$data/chiefGearData";

  export let chiefGearDatabase: ChiefGear[] = [];
  export let addGear: (gear: ChiefGear) => void;

  let selectedTier: string = "";
  let searchQuery: string = "";

  const allTiers = getAllTiers();

  $: filteredGears = chiefGearDatabase.filter((gear) => {
    const tierMatch = !selectedTier || gear.tier === selectedTier;
    const searchMatch =
      !searchQuery ||
      gear.tier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gear.bonus.toLowerCase().includes(searchQuery.toLowerCase());
    return tierMatch && searchMatch;
  });

  function getTierColor(tierColor: string): string {
    const colors: Record<string, string> = {
      green: "bg-green-600",
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      gold: "bg-yellow-500",
      red: "bg-red-600",
    };
    return colors[tierColor] || "bg-gray-600";
  }

  function getTierTextColor(tierColor: string): string {
    const colors: Record<string, string> = {
      green: "text-green-300",
      blue: "text-blue-300",
      purple: "text-purple-300",
      gold: "text-yellow-300",
      red: "text-red-300",
    };
    return colors[tierColor] || "text-gray-300";
  }
</script>

<div class="bg-gray-800 rounded-lg p-6 space-y-4 h-full">
  <h2 class="text-2xl font-bold text-white mb-4">🎯 Select Gear</h2>

  <!-- Search Box -->
  <div>
    <label for="search" class="block text-sm font-medium text-gray-300 mb-2"
      >Search</label
    >
    <input
      id="search"
      type="text"
      bind:value={searchQuery}
      placeholder="Search gears..."
      class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
    />
  </div>

  <!-- Tier Filter -->
  <div>
    <label for="tier" class="block text-sm font-medium text-gray-300 mb-2"
      >Filter by Tier</label
    >
    <select
      id="tier"
      bind:value={selectedTier}
      class="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
    >
      <option value="">All Tiers ({chiefGearDatabase.length})</option>
      {#each allTiers as tier}
        {@const count = chiefGearDatabase.filter((g) => g.tier === tier).length}
        <option value={tier}>{tier} ({count})</option>
      {/each}
    </select>
  </div>

  <!-- Gears List -->
  <div class="space-y-2 max-h-96 overflow-y-auto">
    {#if filteredGears.length === 0}
      <div class="text-center py-8 text-gray-400">
        <p>No gears found</p>
      </div>
    {:else}
      {#each filteredGears as gear (gear.id)}
        <button
          on:click={() => addGear(gear)}
          class="w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-gray-600 hover:border-gray-500"
        >
          <div class="flex items-center gap-3">
            <div
              class={`w-4 h-4 rounded-full ${getTierColor(gear.tierColor)}`}
            ></div>
            <div class="flex-1 min-w-0">
              <div
                class={`font-semibold text-sm {getTierTextColor(gear.tierColor)}`}
              >
                {gear.tier} ⭐{gear.stars}
              </div>
              <div class="text-xs text-gray-400">{gear.bonus}</div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="text-xs font-medium text-green-400">
                ⚡ {(gear.powerTotal / 1000).toFixed(1)}K
              </div>
            </div>
          </div>
        </button>
      {/each}
    {/if}
  </div>

  <div class="text-xs text-gray-500 pt-2 border-t border-gray-700">
    Showing {filteredGears.length} of {chiefGearDatabase.length} gears
  </div>
</div>

<style>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
</style>
