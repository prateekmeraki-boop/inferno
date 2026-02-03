<script lang="ts">
  // Troop inputs - default to 0 for empty calculator
  let infantryTotal = 0;
  let lancerTotal = 0;
  let marksmanTotal = 0;

  // Capacity inputs
  let rallyCapacity = 0;
  let deploymentCapacity = 0;

  // Check if all required fields are filled
  $: allFieldsFilled =
    infantryTotal > 0 &&
    lancerTotal > 0 &&
    marksmanTotal > 0 &&
    rallyCapacity > 0 &&
    deploymentCapacity > 0;

  // Number of rallies (1 main + 6 joins = 7 total)
  const totalRallies = 7;

  // Calculated values
  $: totalTroops = infantryTotal + lancerTotal + marksmanTotal;

  // Calculate how many of each troop type we can deploy per rally
  $: marksmanPerRally = Math.floor(marksmanTotal / totalRallies);
  $: lancerPerRally = Math.floor(lancerTotal / totalRallies);
  $: infantryPerRally = Math.floor(infantryTotal / totalRallies);

  // Check if player has enough Marksmen to fill entire deployment
  $: hasEnoughMarksmen = marksmanPerRally >= deploymentCapacity - 2; // -2 for 1 infantry + 1 lancer

  // Calculate minimum requirements
  $: minInfantryPerRally = hasEnoughMarksmen
    ? 1
    : Math.ceil(deploymentCapacity * 0.01);
  $: minLancerPerRally = hasEnoughMarksmen
    ? 1
    : Math.ceil(deploymentCapacity * 0.01);

  // Step 3: Calculate optimal deployment
  let actualInfantryDeploy: number;
  let actualLancerDeploy: number;
  let actualMarksmanDeploy: number;

  $: {
    if (hasEnoughMarksmen) {
      // Special case: 1 Infantry, 1 Lancer, rest Marksmen
      actualInfantryDeploy = 1;
      actualLancerDeploy = 1;
      actualMarksmanDeploy = deploymentCapacity - 2;
    } else {
      // Normal distribution: Ensure min 1% Infantry AND min 1% Lancer
      const minInfantry = Math.ceil(deploymentCapacity * 0.01);
      const minLancer = Math.ceil(deploymentCapacity * 0.01);

      // Start with maximizing marksmen
      actualMarksmanDeploy = Math.min(
        marksmanPerRally,
        deploymentCapacity - minInfantry - minLancer,
      );

      // Fill remaining with Lancers (after ensuring minimums)
      const remainingAfterMarksmen =
        deploymentCapacity - actualMarksmanDeploy - minInfantry;
      actualLancerDeploy = Math.min(
        lancerPerRally,
        Math.max(minLancer, remainingAfterMarksmen),
      );

      // Finally calculate infantry
      const remainingAfterLancers =
        deploymentCapacity - actualMarksmanDeploy - actualLancerDeploy;
      actualInfantryDeploy = Math.min(
        infantryPerRally,
        Math.max(minInfantry, remainingAfterLancers),
      );
    }
  }

  // Calculate percentages based on deployment capacity
  $: infantryDeployPercent = (actualInfantryDeploy / deploymentCapacity) * 100;
  $: lancerDeployPercent = (actualLancerDeploy / deploymentCapacity) * 100;
  $: marksmanDeployPercent = (actualMarksmanDeploy / deploymentCapacity) * 100;

  // Total deployed
  $: totalDeployed =
    actualInfantryDeploy + actualLancerDeploy + actualMarksmanDeploy;

  // Calculate for Rally (uses Rally Capacity) - apply same percentages
  $: actualInfantryRally = Math.round(
    (infantryDeployPercent / 100) * rallyCapacity,
  );
  $: actualLancerRally = Math.round(
    (lancerDeployPercent / 100) * rallyCapacity,
  );
  $: actualMarksmanRally =
    rallyCapacity - actualInfantryRally - actualLancerRally;

  $: totalRallyDeployed =
    actualInfantryRally + actualLancerRally + actualMarksmanRally;

  // Queue data structure
  interface QueueData {
    name: string;
    heroes: string[];
  }

  let queues: QueueData[] = [
    { name: "Main Rally", heroes: ["Hector", "Mia", "Bradley"] },
    { name: "Queue 1", heroes: ["", "", ""] },
    { name: "Queue 2", heroes: ["", "", ""] },
    { name: "Queue 3", heroes: ["", "", ""] },
    { name: "Queue 4", heroes: ["", "", ""] },
    { name: "Queue 5", heroes: ["", "", ""] },
    { name: "Queue 6", heroes: ["", "", ""] },
  ];

  // Recommended joiner heroes
  const joinerHeroes = [
    "Reina",
    "Bradley",
    "Magnus",
    "Sonya",
    "Jessie",
    "Jasser",
    "Jeronimo",
    "Seo-Yoon",
  ];

  function formatNumber(num: number): string {
    return Math.floor(num).toLocaleString();
  }

  function formatPercent(num: number): string {
    return num.toFixed(2) + "%";
  }
</script>

<div class="max-w-7xl mx-auto">
  <!-- Input Section - ALWAYS VISIBLE -->
  <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
    <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
      <span>📊</span> Troop Information
    </h2>

    <!-- Instructional Message -->
    <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
      <p class="text-blue-200 text-sm">
        <strong>📝 Instructions:</strong> Fill in all your troop totals and capacity
        values below to calculate optimal Bear Hunt deployment strategy.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Infantry Input -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🛡️ Infantry Total
        </label>
        <input
          type="number"
          bind:value={infantryTotal}
          placeholder="Enter Infantry Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <!-- Lancer Input -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🐎 Lancer Total
        </label>
        <input
          type="number"
          bind:value={lancerTotal}
          placeholder="Enter Lancer Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <!-- Marksman Input -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🏹 Marksman Total
        </label>
        <input
          type="number"
          bind:value={marksmanTotal}
          placeholder="Enter Marksman Total"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Rally Capacity -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          🎯 Rally Capacity
        </label>
        <input
          type="number"
          bind:value={rallyCapacity}
          placeholder="Enter Rally Capacity"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <!-- Deployment Capacity -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          ⚔️ Deployment Capacity
        </label>
        <input
          type="number"
          bind:value={deploymentCapacity}
          placeholder="Enter Deployment Capacity"
          class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>

    <!-- Status Message -->
    {#if !allFieldsFilled}
      <div
        class="mt-6 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4"
      >
        <p class="text-yellow-200 text-sm flex items-center gap-2">
          <span class="text-xl">⚠️</span>
          <span
            >Please fill in all fields above to see your Bear Hunt deployment
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

  <!-- CONDITIONAL SECTIONS - Only show when all fields are filled -->
  {#if allFieldsFilled}
    <!-- Special Recommendation for High Marksmen -->
    {#if hasEnoughMarksmen}
      <div
        class="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 mb-6"
      >
        <h3
          class="text-xl font-bold text-green-300 mb-3 flex items-center gap-2"
        >
          <span class="text-2xl">🎯</span> Optimal Strategy Unlocked!
        </h3>
        <p class="text-green-200 text-sm mb-3">
          You have enough Marksmen to maximize damage output! Recommended
          deployment:
        </p>
        <div class="bg-slate-900/50 rounded-lg p-4">
          <ul class="text-green-100 text-sm space-y-2">
            <li>
              ✅ Send <strong>1 Infantry</strong> troop only (minimum requirement)
            </li>
            <li>
              ✅ Send <strong>1 Lancer</strong> troop only (minimum requirement)
            </li>
            <li>
              ✅ Fill remaining <strong
                >{formatNumber(deploymentCapacity - 2)} slots with Marksmen</strong
              > (maximum damage)
            </li>
          </ul>
        </div>
      </div>
    {/if}

    <!-- Troop Distribution Strategy Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
      <h2 class="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>📈</span> Troop Distribution Strategy
      </h2>

      <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
        <p class="text-blue-200 text-sm">
          <strong>Strategy:</strong> Maximize Marksmen (highest damage) → Fill with
          Lancers (medium damage) → Supplement with Infantry (minimum 1% each)
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="bg-slate-900/50 rounded-lg p-4 border-l-4 border-blue-500">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">🛡️ Infantry</span>
            <span class="text-xs bg-blue-600 px-2 py-1 rounded text-white"
              >Priority: 3rd</span
            >
          </div>
          <div class="text-3xl font-bold text-white mb-1">
            {formatPercent(infantryDeployPercent)}
          </div>
          <div class="text-sm text-gray-400">
            {formatNumber(actualInfantryDeploy)} per rally
          </div>
          <div class="text-xs text-orange-400 mt-1">
            {formatNumber(infantryTotal)} available
          </div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-4 border-l-4 border-purple-500"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">🐎 Lancer</span>
            <span class="text-xs bg-purple-600 px-2 py-1 rounded text-white"
              >Priority: 2nd</span
            >
          </div>
          <div class="text-3xl font-bold text-white mb-1">
            {formatPercent(lancerDeployPercent)}
          </div>
          <div class="text-sm text-gray-400">
            {formatNumber(actualLancerDeploy)} per rally
          </div>
          <div class="text-xs text-orange-400 mt-1">
            {formatNumber(lancerTotal)} available
          </div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-4 border-l-4 border-orange-500"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">🏹 Marksman</span>
            <span class="text-xs bg-orange-600 px-2 py-1 rounded text-white"
              >Priority: 1st</span
            >
          </div>
          <div class="text-3xl font-bold text-white mb-1">
            {formatPercent(marksmanDeployPercent)}
          </div>
          <div class="text-sm text-gray-400">
            {formatNumber(actualMarksmanDeploy)} per rally
          </div>
          <div class="text-xs text-orange-400 mt-1">
            {formatNumber(marksmanTotal)} available
          </div>
        </div>
      </div>

      <div class="bg-slate-900/30 rounded-lg p-4 border border-slate-700">
        <div class="flex items-center justify-between">
          <span class="text-gray-300">Total per Deployment:</span>
          <span class="text-white font-bold">
            {formatNumber(totalDeployed)} / {formatNumber(deploymentCapacity)}
            <span class="text-sm text-gray-400 ml-2"
              >({formatPercent(
                (totalDeployed / deploymentCapacity) * 100,
              )})</span
            >
          </span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <span class="text-gray-300">Across 7 Rallies:</span>
          <span class="text-white font-bold"
            >{formatNumber(totalDeployed * 7)} total troops deployed</span
          >
        </div>
      </div>
    </div>

    <!-- Rally Queue (Main) Section -->
    <div
      class="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-orange-500/30"
    >
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>👑</span> Rally Queue (Main) - Capacity: {formatNumber(
          rallyCapacity,
        )}
      </h2>

      <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <p class="text-blue-200 text-sm">
          <strong>Rally Leaders:</strong> Use Hector + Mia + Bradley/Blachette for
          optimal rally performance
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-blue-500 text-center"
        >
          <div class="text-sm text-gray-400 mb-2">🛡️ Infantry</div>
          <div class="text-4xl font-bold text-blue-400 mb-2">
            {formatPercent(infantryDeployPercent)}
          </div>
          <div class="text-sm text-gray-300">
            {formatNumber(actualInfantryRally)} troops
          </div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-purple-500 text-center"
        >
          <div class="text-sm text-gray-400 mb-2">🐎 Lancer</div>
          <div class="text-4xl font-bold text-purple-400 mb-2">
            {formatPercent(lancerDeployPercent)}
          </div>
          <div class="text-sm text-gray-300">
            {formatNumber(actualLancerRally)} troops
          </div>
        </div>

        <div
          class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-orange-500 text-center"
        >
          <div class="text-sm text-gray-400 mb-2">🏹 Marksman</div>
          <div class="text-4xl font-bold text-orange-400 mb-2">
            {formatPercent(marksmanDeployPercent)}
          </div>
          <div class="text-sm text-gray-300">
            {formatNumber(actualMarksmanRally)} troops
          </div>
        </div>
      </div>

      <div class="text-center text-sm text-gray-400 mb-6">
        Used: {formatNumber(totalRallyDeployed)} / {formatNumber(rallyCapacity)}
      </div>

      <div class="bg-slate-900/50 rounded-lg p-6">
        <h3 class="text-sm text-gray-400 mb-4">Rally Heroes</h3>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="px-4 py-3 bg-orange-600/30 border border-orange-500/50 rounded-lg text-center"
          >
            <span class="text-orange-100 text-lg font-semibold">Hector</span>
          </div>
          <div
            class="px-4 py-3 bg-orange-600/30 border border-orange-500/50 rounded-lg text-center"
          >
            <span class="text-orange-100 text-lg font-semibold">Mia</span>
          </div>
          <div
            class="px-4 py-3 bg-orange-600/30 border border-orange-500/50 rounded-lg text-center"
          >
            <span class="text-orange-100 text-lg font-semibold">Bradley</span>
          </div>
        </div>
        <div class="text-xs text-gray-500 mt-3 text-center">
          Can swap Bradley with Blachette
        </div>
      </div>
    </div>

    <!-- Deployment Queues Section -->
    <div class="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6">
      <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>⚔️</span> Deployment Queues (6 Joins)
      </h2>

      <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-300 mb-4">
          Recommended Lead Heroes for Joiners
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {#each joinerHeroes as hero}
            <div
              class="px-4 py-3 bg-blue-600/30 border border-blue-500/50 rounded-lg text-center"
            >
              <span class="text-blue-100 text-lg font-semibold">{hero}</span>
            </div>
          {/each}
        </div>
      </div>

      <div class="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-orange-300 mb-4">
          Troop Distribution per Join
        </h3>
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
          </div>
          <div
            class="bg-slate-900/50 rounded-lg p-6 border-l-4 border-orange-500 text-center"
          >
            <div class="text-sm text-gray-400 mb-2">🏹 Marksman</div>
            <div class="text-4xl font-bold text-orange-400 mb-2">
              {formatPercent(marksmanDeployPercent)}
            </div>
            <div class="text-sm text-gray-300">
              {formatNumber(actualMarksmanDeploy)} troops
            </div>
          </div>
        </div>
        <div class="mt-4 text-center text-sm text-gray-400">
          Total per Join: {formatNumber(totalDeployed)} / {formatNumber(
            deploymentCapacity,
          )}
        </div>
      </div>
    </div>
  {/if}
</div>
