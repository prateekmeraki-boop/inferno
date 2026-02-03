<script lang="ts">
  let infantry = 0;
  let lancer = 0;
  let marksman = 0;
  let rallyCapacity = 0;
  let deploymentCapacity = 0;

  // Calculated values
  $: totalTroops = infantry + lancer + marksman;
  $: infantryPercent = totalTroops > 0 ? (infantry / totalTroops) * 100 : 0;
  $: lancerPercent = totalTroops > 0 ? (lancer / totalTroops) * 100 : 0;
  $: marksmanPercent = totalTroops > 0 ? (marksman / totalTroops) * 100 : 0;

  // Queue calculations (based on deployment capacity)
  $: queueInfantry =
    deploymentCapacity > 0 ? (infantryPercent / 100) * deploymentCapacity : 0;
  $: queueLancer =
    deploymentCapacity > 0 ? (lancerPercent / 100) * deploymentCapacity : 0;
  $: queueMarksman =
    deploymentCapacity > 0 ? (marksmanPercent / 100) * deploymentCapacity : 0;
  $: queueTotal = queueInfantry + queueLancer + queueMarksman;

  // Rally calculations
  $: rallyInfantry =
    rallyCapacity > 0 ? (infantryPercent / 100) * rallyCapacity : 0;
  $: rallyLancer =
    rallyCapacity > 0 ? (lancerPercent / 100) * rallyCapacity : 0;
  $: rallyMarksman =
    rallyCapacity > 0 ? (marksmanPercent / 100) * rallyCapacity : 0;
  $: rallyTotal = rallyInfantry + rallyLancer + rallyMarksman;

  function clearAll() {
    infantry = 0;
    lancer = 0;
    marksman = 0;
    rallyCapacity = 0;
    deploymentCapacity = 0;
  }
</script>

<svelte:head>
  <title>Bear Hunt Calculator - Whiteout Survival</title>
</svelte:head>

<div
  class="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 py-12 px-4"
>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="text-5xl">🐻</div>
        <h1 class="text-4xl md:text-5xl font-bold text-white">
          Bear Hunt Calculator
        </h1>
      </div>
      <p class="text-slate-300 text-lg">
        Calculate optimal troop distribution for Bear Hunt based on your troops
        and capacities.
      </p>
    </div>

    <!-- Main Layout: Two Column Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- LEFT SIDE: Input Section -->
      <div
        class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700"
      >
        <div class="flex items-center gap-3 mb-6">
          <div
            class="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white">Troop Information</h2>
        </div>

        <div class="space-y-4">
          <!-- Infantry -->
          <div>
            <label class="block text-slate-300 text-sm font-medium mb-2">
              <span class="flex items-center gap-2">
                <span>🛡️</span>
                Infantry Troops
              </span>
            </label>
            <input
              type="number"
              bind:value={infantry}
              min="0"
              placeholder="Enter infantry count"
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <!-- Lancer -->
          <div>
            <label class="block text-slate-300 text-sm font-medium mb-2">
              <span class="flex items-center gap-2">
                <span>⚔️</span>
                Lancer Troops
              </span>
            </label>
            <input
              type="number"
              bind:value={lancer}
              min="0"
              placeholder="Enter lancer count"
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <!-- Marksman -->
          <div>
            <label class="block text-slate-300 text-sm font-medium mb-2">
              <span class="flex items-center gap-2">
                <span>🏹</span>
                Marksman Troops
              </span>
            </label>
            <input
              type="number"
              bind:value={marksman}
              min="0"
              placeholder="Enter marksman count"
              class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <!-- Total Display -->
          <div class="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
            <div class="text-slate-300 text-sm font-medium mb-1">
              Total Troops
            </div>
            <div class="text-2xl font-bold text-white">
              {totalTroops.toLocaleString()}
            </div>
          </div>

          <div class="border-t border-slate-700 pt-4 mt-6">
            <h3 class="text-lg font-semibold text-white mb-4">Capacities</h3>

            <!-- Rally Capacity -->
            <div class="mb-4">
              <label class="block text-slate-300 text-sm font-medium mb-2">
                Rally Capacity
              </label>
              <input
                type="number"
                bind:value={rallyCapacity}
                min="0"
                placeholder="Enter rally capacity"
                class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <!-- Deployment Capacity -->
            <div>
              <label class="block text-slate-300 text-sm font-medium mb-2">
                Deployment Capacity
              </label>
              <input
                type="number"
                bind:value={deploymentCapacity}
                min="0"
                placeholder="Enter deployment capacity"
                class="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <!-- Clear Button -->
          <button
            on:click={clearAll}
            class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all mt-4"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- RIGHT SIDE: Results Section -->
      <div class="space-y-6">
        <!-- Troop Distribution -->
        <div
          class="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-slate-700"
        >
          <h2 class="text-2xl font-bold text-white mb-6">Troop Distribution</h2>

          {#if totalTroops > 0}
            <div class="space-y-4">
              <!-- Infantry -->
              <div class="bg-slate-700/50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-slate-300 font-medium">🛡️ Infantry</span>
                  <span class="text-white font-bold"
                    >{infantryPercent.toFixed(2)}%</span
                  >
                </div>
                <div class="w-full bg-slate-600 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style="width: {infantryPercent}%"
                  ></div>
                </div>
                <div class="text-slate-400 text-sm mt-1">
                  {infantry.toLocaleString()} troops
                </div>
              </div>

              <!-- Lancer -->
              <div class="bg-slate-700/50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-slate-300 font-medium">⚔️ Lancer</span>
                  <span class="text-white font-bold"
                    >{lancerPercent.toFixed(2)}%</span
                  >
                </div>
                <div class="w-full bg-slate-600 rounded-full h-2">
                  <div
                    class="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style="width: {lancerPercent}%"
                  ></div>
                </div>
                <div class="text-slate-400 text-sm mt-1">
                  {lancer.toLocaleString()} troops
                </div>
              </div>

              <!-- Marksman -->
              <div class="bg-slate-700/50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-slate-300 text font-medium"
                    >🏹 Marksman</span
                  >
                  <span class="text-white font-bold"
                    >{marksmanPercent.toFixed(2)}%</span
                  >
                </div>
                <div class="w-full bg-slate-600 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style="width: {marksmanPercent}%"
                  ></div>
                </div>
                <div class="text-slate-400 text-sm mt-1">
                  {marksman.toLocaleString()} troops
                </div>
              </div>
            </div>
          {:else}
            <div
              class="flex flex-col items-center justify-center text-center text-slate-400 py-10 border border-dashed border-slate-700 rounded-lg"
            >
              <div class="text-5xl mb-3">📊</div>
              <p class="text-sm">
                Enter your troop numbers to see distribution
              </p>
            </div>
          {/if}
        </div>

        <!-- Queue Distribution -->
        {#if deploymentCapacity > 0}
          <div
            class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 shadow-xl"
          >
            <h3 class="text-xl font-bold text-white mb-4">
              Deployment Queue Distribution
            </h3>

            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">🛡️ Infantry</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(queueInfantry).toLocaleString()}
                </div>
              </div>
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">⚔️ Lancer</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(queueLancer).toLocaleString()}
                </div>
              </div>
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">🏹 Marksman</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(queueMarksman).toLocaleString()}
                </div>
              </div>
            </div>

            <div class="bg-slate-700/50 rounded-lg p-3">
              <div class="text-slate-300 text-sm">Total Queue</div>
              <div class="text-2xl font-bold text-amber-400">
                {Math.floor(queueTotal).toLocaleString()}
              </div>
            </div>
          </div>
        {/if}

        <!-- Rally Distribution -->
        {#if rallyCapacity > 0}
          <div
            class="bg-gradient-to-br from-amber-900 to-orange-800 rounded-xl p-6 shadow-xl"
          >
            <h3 class="text-xl font-bold text-white mb-4">
              Rally Distribution
            </h3>

            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">🛡️ Infantry</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(rallyInfantry).toLocaleString()}
                </div>
              </div>
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">⚔️ Lancer</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(rallyLancer).toLocaleString()}
                </div>
              </div>
              <div class="bg-slate-800/70 rounded-lg p-3">
                <div class="text-slate-300 text-xs mb-1">🏹 Marksman</div>
                <div class="text-lg font-bold text-white">
                  {Math.floor(rallyMarksman).toLocaleString()}
                </div>
              </div>
            </div>

            <div class="bg-slate-700/50 rounded-lg p-3">
              <div class="text-slate-300 text-sm">Total Rally</div>
              <div class="text-2xl font-bold text-amber-400">
                {Math.floor(rallyTotal).toLocaleString()}
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
