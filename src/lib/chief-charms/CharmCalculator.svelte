<script lang="ts">
  import { charmSteps, getPerPartCost } from "../../data/chiefCharmData";

  type UpgradePath = {
    id: number;
    fromId: number;
    toId: number;
    fromLabel: string;
    toLabel: string;
    materials: {
      guides: number;
      designs: number;
      jewels: number;
      power: number;
    };
  };

  let currentFromId = 0;
  let currentToId = 0;
  let upgradePaths: UpgradePath[] = [];

  function addUpgradePath() {
    if (currentToId <= currentFromId) {
      return;
    }

    let guides = 0;
    let designs = 0;
    let jewels = 0;
    let power = 0;

    for (let step = currentFromId + 1; step <= currentToId; step++) {
      let targetLevel: number;

      if (step <= 39) {
        // Steps 1-39: Levels 1-11
        targetLevel = Math.floor((step + 3) / 4) + 1;
      } else {
        // Steps 40+: Levels 12-16
        // Step 40 is "Lv 11 - Part 1" but uses Level 12 costs
        targetLevel = Math.floor((step - 40) / 5) + 12;
      }

      const partCost = getPerPartCost(targetLevel);

      guides += partCost.guides;
      designs += partCost.designs;
      jewels += partCost.jewels;
      power += partCost.power;
    }

    const fromStep = charmSteps.find((s) => s.id === currentFromId);
    const toStep = charmSteps.find((s) => s.id === currentToId);

    const newPath: UpgradePath = {
      id: Date.now(),
      fromId: currentFromId,
      toId: currentToId,
      fromLabel: fromStep?.label || "",
      toLabel: toStep?.label || "",
      materials: { guides, designs, jewels, power },
    };

    upgradePaths = [...upgradePaths, newPath];

    currentFromId = 0;
    currentToId = 0;
  }

  function removeUpgradePath(id: number) {
    upgradePaths = upgradePaths.filter((path) => path.id !== id);
  }

  function clearAll() {
    upgradePaths = [];
  }

  $: totals = upgradePaths.reduce(
    (acc, path) => ({
      guides: acc.guides + path.materials.guides,
      designs: acc.designs + path.materials.designs,
      jewels: acc.jewels + path.materials.jewels,
      power: acc.power + path.materials.power,
    }),
    { guides: 0, designs: 0, jewels: 0, power: 0 },
  );
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-12 px-4"
>
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="text-5xl">🔮</div>
        <h1 class="text-4xl md:text-5xl font-bold text-white">
          Chief Charm Material Calculator
        </h1>
      </div>
      <p class="text-slate-300 text-lg">
        Calculate Charm Guides, Charm Designs, and Jewel Secrets needed from any
        charm part to another.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700"
      >
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Upgrade Path</h2>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-slate-300 text-sm font-medium mb-2"
              >Current Charm Part</label
            >
            <select
              bind:value={currentFromId}
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              {#each charmSteps as step}
                <option value={step.id}>
                  {step.label}
                </option>
              {/each}
            </select>
          </div>

          <div>
            <label class="block text-slate-300 text-sm font-medium mb-2"
              >Target Charm Part</label
            >
            <select
              bind:value={currentToId}
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              {#each charmSteps as step}
                <option value={step.id}>
                  {step.label}
                </option>
              {/each}
            </select>
            <p class="text-slate-400 text-xs mt-2">
              Target must be higher than current. Levels 1-10 have 4 parts each,
              levels 11+ have 5 parts each.
            </p>
          </div>

          <button
            on:click={addUpgradePath}
            disabled={currentToId <= currentFromId}
            class="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Upgrade Path
          </button>
        </div>
      </div>

      <div
        class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-white">Materials Required</h2>
          {#if upgradePaths.length > 0}
            <button
              on:click={clearAll}
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all text-sm"
            >
              Clear All
            </button>
          {/if}
        </div>

        {#if upgradePaths.length > 0}
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-white mb-3">
              Upgrade Paths ({upgradePaths.length})
            </h3>
            <div class="space-y-3 max-h-64 overflow-y-auto pr-2">
              {#each upgradePaths as path}
                <div
                  class="bg-purple-700/30 border-l-4 border-purple-500 rounded-lg p-4 flex items-center justify-between"
                >
                  <div class="flex-1">
                    <div class="text-sm text-slate-400 mb-1">Quantity: 1x</div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-white font-medium"
                        >{path.fromLabel}</span
                      >
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
                      <span class="text-white font-medium">{path.toLabel}</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-1">
                      Power: +{path.materials.power.toLocaleString()}
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

        <div
          class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 shadow-xl"
        >
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white">Summary</h3>
            </div>
            <div class="bg-purple-700 px-3 py-1 rounded-lg">
              <span class="text-white font-semibold"
                >{upgradePaths.length} upgrade{upgradePaths.length !== 1
                  ? "s"
                  : ""}</span
              >
            </div>
          </div>

          {#if upgradePaths.length > 0}
            <div class="bg-slate-700/50 rounded-lg p-4 backdrop-blur-sm mb-6">
              <div class="text-slate-300 text-xs font-medium mb-1">
                POWER INCREASE
              </div>
              <div class="text-3xl font-bold text-green-400">
                +{totals.power.toLocaleString()}
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                <h4 class="text-sm font-bold text-white">Materials Needed</h4>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div
                  class="bg-slate-800/70 rounded-lg p-4 border-2 border-orange-500/50 hover:border-orange-500 transition-all"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <span class="text-2xl">📋</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-slate-300 text-sm font-medium">
                        Charm Designs
                      </div>
                    </div>
                  </div>
                  <div class="text-3xl font-bold text-white text-right">
                    {totals.designs.toLocaleString()}
                  </div>
                </div>

                <div
                  class="bg-slate-800/70 rounded-lg p-4 border-2 border-yellow-500/50 hover:border-yellow-500 transition-all"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <span class="text-2xl">📦</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-slate-300 text-sm font-medium">
                        Charm Guides
                      </div>
                    </div>
                  </div>
                  <div class="text-3xl font-bold text-white text-right">
                    {totals.guides.toLocaleString()}
                  </div>
                </div>

                <div
                  class="bg-slate-800/70 rounded-lg p-4 border-2 border-cyan-500/50 hover:border-cyan-500 transition-all"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <div
                      class="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <span class="text-2xl">💎</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="text-slate-300 text-sm font-medium">
                        Jewel Secrets
                      </div>
                    </div>
                  </div>
                  <div class="text-3xl font-bold text-white text-right">
                    {totals.jewels.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          {:else}
            <div
              class="flex flex-col items-center justify-center text-center text-slate-400 py-10 border border-dashed border-slate-700 rounded-lg"
            >
              <div class="text-5xl mb-3">✨</div>
              <p class="text-sm mb-1">
                Select your current and target charm parts
              </p>
              <p class="text-xs">
                We will show the total materials and power gain here
              </p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
