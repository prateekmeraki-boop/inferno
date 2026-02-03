<script lang="ts">
  // Troop inputs
  let infantryTotal = 0;
  let lancerTotal = 0;
  let marksmanTotal = 0;

  // Capacity input (no rally capacity for CJ)
  let deploymentCapacity = 0;

  // Check if all required fields are filled
  $: allFieldsFilled =
    infantryTotal > 0 &&
    lancerTotal > 0 &&
    marksmanTotal > 0 &&
    deploymentCapacity > 0;

  // Calculated values
  $: totalTroops = infantryTotal + lancerTotal + marksmanTotal;

  // Calculate what percentage each troop type is of total troops
  $: infantryTroopPercent =
    totalTroops > 0 ? (infantryTotal / totalTroops) * 100 : 0;
  $: lancerTroopPercent =
    totalTroops > 0 ? (lancerTotal / totalTroops) * 100 : 0;
  $: marksmanTroopPercent =
    totalTroops > 0 ? (marksmanTotal / totalTroops) * 100 : 0;

  // Calculate deployment for Crazy Joe
  // Priority: Infantry (max) > Lancers (fill remaining) > Marksmen (0)
  let actualInfantryDeploy: number;
  let actualLancerDeploy: number;
  let actualMarksmanDeploy: number;

  $: {
    // NO MARKSMEN for Crazy Joe
    actualMarksmanDeploy = 0;

    // Calculate how much infantry we can send (based on available infantry)
    const infantryPercentOfDeployment =
      (infantryTotal / (infantryTotal + lancerTotal)) * 100;
    const infantryByPercent = Math.floor(
      (infantryPercentOfDeployment / 100) * deploymentCapacity,
    );

    // Maximize Infantry (limited by available troops)
    const maxInfantryCanSend = Math.floor(infantryTotal);
    actualInfantryDeploy = Math.min(
      infantryByPercent,
      maxInfantryCanSend,
      deploymentCapacity,
    );

    // Fill remaining with Lancers
    const remainingSpace = deploymentCapacity - actualInfantryDeploy;
    const maxLancerCanSend = Math.floor(lancerTotal);
    actualLancerDeploy = Math.min(remainingSpace, maxLancerCanSend);
  }

  // Calculate deployment percentages
  $: infantryDeployPercent =
    deploymentCapacity > 0
      ? (actualInfantryDeploy / deploymentCapacity) * 100
      : 0;
  $: lancerDeployPercent =
    deploymentCapacity > 0
      ? (actualLancerDeploy / deploymentCapacity) * 100
      : 0;
  $: marksmanDeployPercent = 0; // Always 0 for Crazy Joe

  // Total deployed
  $: totalDeployed =
    actualInfantryDeploy + actualLancerDeploy + actualMarksmanDeploy;

  // Recommended heroes for Crazy Joe
  const crazyJoeHeroes = [
    "Ahmose",
    "Patrick",
    "Bahiti",
    "Sergey",
    "Ling Xue",
    "Lumak Bokan",
    "Zinman",
    "Xura",
  ];

  function formatNumber(num: number): string {
    return Math.floor(num).toLocaleString();
  }

  function formatPercent(num: number): string {
    return num.toFixed(2) + "%";
  }
</script>

<div class="max-w-7xl mx-auto">
  <!-- Input Section -->
  <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
      <span>📊</span> Troop Information
    </h2>

    <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
      <p class="text-blue-200 text-sm">
        <strong>📝 Instructions:</strong> Fill in your troop totals and deployment
        capacity to calculate optimal Crazy Joe strategy.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🛡️ Infantry Total
        </label>
        <input
          type="number"
          bind:value={infantryTotal}
          placeholder="Enter Infantry Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🐎 Lancer Total
        </label>
        <input
          type="number"
          bind:value={lancerTotal}
          placeholder="Enter Lancer Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🏹 Marksman Total
        </label>
        <input
          type="number"
          bind:value={marksmanTotal}
          placeholder="Enter Marksman Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>

    <div class="max-w-md mx-auto">
      <label class="block text-sm font-medium text-gray-300 mb-2">
        ⚔️ Deployment Capacity
      </label>
      <input
        type="number"
        bind:value={deploymentCapacity}
        placeholder="Enter Deployment Capacity"
        class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    <!-- Status Message -->
    {#if !allFieldsFilled}
      <div
        class="mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4"
      >
        <p class="text-yellow-200 text-sm flex items-center gap-2">
          <span class="text-xl">⚠️</span>
          <span
            >Please fill in all fields above to see your Crazy Joe deployment
            strategy</span
          >
        </p>
      </div>
    {:else}
      <div
        class="mt-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4"
      >
        <p class="text-green-200 text-sm flex items-center gap-2">
          <span class="text-xl">✅</span>
          <span
            >All fields filled! Your deployment strategy is calculated below.</span
          >
        </p>
      </div>
    {/if}
  </div>

  {#if allFieldsFilled}
    <!-- Crazy Joe Strategy Alert -->
    <div
      class="bg-yellow-900/20 border border-yellow-500/30 rounded-2xl p-6 mb-6"
    >
      <h3
        class="text-xl font-bold text-yellow-300 mb-3 flex items-center gap-2"
      >
        <span class="text-2xl">🤪</span> Crazy Joe Strategy
      </h3>
      <p class="text-yellow-200 text-sm mb-3">
        Unlike Bear Hunt, Crazy Joe requires a different troop composition:
      </p>
      <div class="bg-slate-900/50 rounded-lg p-4">
        <ul class="text-yellow-100 text-sm space-y-2">
          <li>
            ❌ Send <strong>ZERO Marksmen</strong> (not used in Crazy Joe)
          </li>
          <li>
            ✅ Maximize <strong>Infantry</strong> (highest priority for defense)
          </li>
          <li>✅ Fill remaining with <strong>Lancers</strong></li>
        </ul>
      </div>
    </div>

    <!-- Troop Analysis Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>📈</span> Your Troop Composition
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-900/50 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">🛡️ Infantry</div>
          <div class="text-2xl font-bold text-white">
            {formatNumber(infantryTotal)}
          </div>
          <div class="text-sm text-blue-400">
            {formatPercent(infantryTroopPercent)} of total
          </div>
        </div>

        <div class="bg-slate-900/50 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">🐎 Lancer</div>
          <div class="text-2xl font-bold text-white">
            {formatNumber(lancerTotal)}
          </div>
          <div class="text-sm text-purple-400">
            {formatPercent(lancerTroopPercent)} of total
          </div>
        </div>

        <div class="bg-slate-900/50 rounded-lg p-4">
          <div class="text-gray-400 text-sm mb-1">🏹 Marksman</div>
          <div class="text-2xl font-bold text-white">
            {formatNumber(marksmanTotal)}
          </div>
          <div class="text-sm text-gray-500">
            {formatPercent(marksmanTroopPercent)} (not used in CJ)
          </div>
        </div>
      </div>

      <div class="mt-4 text-center text-gray-300">
        <span class="font-semibold">Total Troops:</span>
        {formatNumber(totalTroops)}
      </div>
    </div>

    <!-- Deployment Strategy Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🎯</span> Deployment Strategy
      </h2>

      <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
        <p class="text-blue-200 text-sm">
          <strong>Strategy:</strong> Maximize Infantry (best for Crazy Joe) → Fill
          with Lancers → NO Marksmen
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-blue-500 text-center"
        >
          <div class="text-sm text-gray-400 mb-2">🛡️ Infantry</div>
          <div class="text-4xl font-bold text-blue-400 mb-2">
            {formatPercent(infantryDeployPercent)}
          </div>
          <div class="text-sm text-gray-300">
            {formatNumber(actualInfantryDeploy)} troops
          </div>
          <div class="text-xs text-green-400 mt-2">Priority: 1st</div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-purple-500 text-center"
        >
          <div class="text-sm text-gray-400 mb-2">🐎 Lancer</div>
          <div class="text-4xl font-bold text-purple-400 mb-2">
            {formatPercent(lancerDeployPercent)}
          </div>
          <div class="text-sm text-gray-300">
            {formatNumber(actualLancerDeploy)} troops
          </div>
          <div class="text-xs text-green-400 mt-2">Priority: 2nd</div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-gray-600 text-center opacity-60"
        >
          <div class="text-sm text-gray-400 mb-2">🏹 Marksman</div>
          <div class="text-4xl font-bold text-gray-500 mb-2">0.00%</div>
          <div class="text-sm text-gray-500">0 troops</div>
          <div class="text-xs text-red-400 mt-2">Not Used</div>
        </div>
      </div>

      <div class="mt-6 bg-slate-900/30 rounded-lg p-4 border border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-gray-300">Total Deployment:</span>
          <span class="text-white font-bold">
            {formatNumber(totalDeployed)} / {formatNumber(deploymentCapacity)}
            <span class="text-sm text-gray-400 ml-2"
              >({formatPercent(
                (totalDeployed / deploymentCapacity) * 100,
              )})</span
            >
          </span>
        </div>
      </div>
    </div>

    <!-- Recommended Heroes Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>👥</span> Recommended Heroes for Crazy Joe
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        {#each crazyJoeHeroes as hero}
          <div
            class="px-4 py-3 bg-green-600/30 border border-green-500/50 rounded-lg text-center"
          >
            <span class="text-green-100 text-lg font-semibold">{hero}</span>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
