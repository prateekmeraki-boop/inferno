<script lang="ts">
  import Calculator from "$lib/components/Calculator.svelte";
  import CharmCalculator from "$lib/chief-charms/CharmCalculator.svelte";

  let currentPage = "home";
  let navOpen = false;

  const tools = [
    {
      id: "chief-gear",
      title: "Chief Gear Material Calculator",
      description:
        "Calculate materials needed to upgrade your chief gear effortlessly",
      icon: "⚔️",
      gradient: "from-purple-600 to-blue-600",
      page: "calculator",
      comingSoon: false,
    },
    {
      id: "chief-charm",
      title: "Chief Charm Material Calculator",
      description: "Calculate charm upgrade materials with precision",
      icon: "🔮",
      gradient: "from-pink-600 to-purple-600",
      page: "charm-calculator", // NEW
      comingSoon: false, // enabled
    },
    {
      id: "bear-hunt",
      title: "Bear Hunt Guide",
      description: "Complete strategies and tips for Bear Hunt events",
      icon: "🐻",
      gradient: "from-orange-600 to-red-600",
      comingSoon: true,
    },
    {
      id: "crazy-joe",
      title: "Crazy Joe Guide",
      description: "Master the Crazy Joe event with detailed guides",
      icon: "🤪",
      gradient: "from-green-600 to-teal-600",
      comingSoon: true,
    },
  ];

  function navigateTo(page: string) {
    currentPage = page;
    navOpen = false;
    window.scrollTo(0, 0);
  }

  function toggleNav() {
    navOpen = !navOpen;
  }
</script>

<svelte:head>
  <title>Whiteout Survival - Tools & Guides</title>
</svelte:head>

<!-- Fullscreen Navigation Overlay -->
{#if navOpen}
  <div
    class="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-lg animate-fadeIn"
  >
    <button
      on:click={toggleNav}
      class="absolute top-8 right-8 text-white text-4xl hover:text-red-500 transition-colors"
      aria-label="Close menu"
    >
      ✕
    </button>

    <nav class="h-full flex items-center justify-center">
      <ul class="space-y-8 text-center">
        <li class="animate-slideIn" style="animation-delay: 0.1s;">
          <button
            on:click={() => navigateTo("home")}
            class="text-5xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Home
          </button>
        </li>
        <li class="animate-slideIn" style="animation-delay: 0.2s;">
          <button
            on:click={() => navigateTo("calculator")}
            class="text-4xl font-semibold text-white hover:text-blue-400 transition-colors flex items-center justify-center gap-3 mx-auto"
          >
            ⚔️ Chief Gear Calculator
          </button>
        </li>
        <li class="animate-slideIn" style="animation-delay: 0.3s;">
          <button
            on:click={() => navigateTo("charm-calculator")}
            class="text-4xl font-semibold text-white hover:text-blue-400 transition-colors flex items-center justify-center gap-3 mx-auto"
          >
            🔮 Chief Charm Calculator
          </button>
        </li>
        {#each tools.slice(2) as tool, i}
          <li
            class="animate-slideIn"
            style="animation-delay: {0.4 + i * 0.1}s;"
          >
            <span
              class="text-3xl font-semibold text-gray-500 cursor-not-allowed flex items-center justify-center gap-3"
            >
              {tool.icon}
              {tool.title}
              <span class="text-sm bg-yellow-600 px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </span>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

{#if currentPage === "home"}
  <!-- Landing Page -->
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"
      ></div>
      <div
        class="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
        style="animation-delay: 1s;"
      ></div>
    </div>

    <!-- Navigation Bar -->
    <nav class="relative z-10 flex items-center justify-between px-8 py-6">
      <div class="flex items-center gap-3">
        <span class="text-5xl">🎮</span>
        <span class="text-2xl font-bold text-white">Whiteout Survival</span>
      </div>
      <button
        on:click={toggleNav}
        class="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors group"
        aria-label="Open menu"
      >
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
        <span class="w-8 h-0.5 bg-white transition-all"></span>
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
      </button>
    </nav>

    <!-- Hero Section -->
    <div class="relative z-10 container mx-auto px-6 py-20">
      <div class="text-center mb-20">
        <h1 class="text-7xl font-extrabold text-white mb-6 animate-fadeInUp">
          Tools & Guides
        </h1>
        <p
          class="text-2xl text-blue-300 mb-8 animate-fadeInUp"
          style="animation-delay: 0.2s;"
        >
          Your ultimate companion for Whiteout Survival
        </p>
        <div
          class="flex flex-wrap items-center justify-center gap-4 animate-fadeInUp"
          style="animation-delay: 0.4s;"
        >
          <span
            class="px-4 py-2 bg-blue-600/30 rounded-full text-blue-200 text-sm border border-blue-500/30"
          >
            ⚡ Fast & Accurate
          </span>
          <span
            class="px-4 py-2 bg-purple-600/30 rounded-full text-purple-200 text-sm border border-purple-500/30"
          >
            🎯 Always Updated
          </span>
          <span
            class="px-4 py-2 bg-green-600/30 rounded-full text-green-200 text-sm border border-green-500/30"
          >
            💯 100% Free
          </span>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {#each tools as tool, i}
          <button
            on:click={() => !tool.comingSoon && navigateTo(tool.page)}
            disabled={tool.comingSoon}
            class="group relative bg-gradient-to-br {tool.gradient} p-1 rounded-2xl hover:scale-105 transition-all duration-300 animate-fadeInUp disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed text-left"
            style="animation-delay: {0.2 + i * 0.1}s;"
          >
            <div class="bg-slate-900/90 rounded-xl p-8 h-full backdrop-blur-sm">
              <div class="text-6xl mb-4">{tool.icon}</div>
              <h3
                class="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors"
              >
                {tool.title}
              </h3>
              <p class="text-gray-300 mb-4">
                {tool.description}
              </p>
              {#if tool.comingSoon}
                <span
                  class="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold"
                >
                  Coming Soon
                </span>
              {:else}
                <span
                  class="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all"
                >
                  Open Tool
                  <span class="text-2xl">→</span>
                </span>
              {/if}
            </div>
          </button>
        {/each}
      </div>
    </div>

    <!-- Footer -->
    <footer class="relative z-10 text-center py-12 text-gray-400 text-sm">
      <p class="mb-2">
        📊 Data extracted from
        <a
          href="https://www.whiteoutsurvival.wiki"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:text-blue-300">Whiteout Survival Wiki</a
        >
      </p>
      <p>Built with ♥ using Vite • Svelte • TailwindCSS • TypeScript</p>
      <p class="text-xs mt-2">Last updated: 1/30/2026</p>
    </footer>
  </div>
{:else if currentPage === "calculator"}
  <!-- Chief Gear Calculator Page -->
  <main
    class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <nav class="flex items-center justify-between px-8 py-6">
      <button
        on:click={() => navigateTo("home")}
        class="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <span class="text-4xl">🎮</span>
        <span class="text-xl font-bold text-white">Whiteout Survival</span>
      </button>
      <button
        on:click={toggleNav}
        class="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors group"
        aria-label="Open menu"
      >
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
        <span class="w-8 h-0.5 bg-white transition-all"></span>
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
      </button>
    </nav>

    <div class="container mx-auto py-8 px-4">
      <header class="text-center mb-8">
        <h1
          class="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3 flex-wrap"
        >
          <span class="text-6xl">⚔️</span>
          Chief Gear Material Calculator
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto">
          Calculate materials needed to upgrade your chief gear effortlessly.
          Select gears, adjust quantities, and get instant totals.
        </p>
      </header>

      <Calculator />

      <footer class="text-center mt-12 text-gray-400 text-sm pb-8">
        <p class="mb-2">
          📊 Data extracted from
          <a
            href="https://www.whiteoutsurvival.wiki/chief-gear/chief-gear/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300">Whiteout Survival Wiki</a
          >
        </p>
        <p>Built with ♥ using Vite • Svelte • TailwindCSS • TypeScript</p>
        <p class="text-xs mt-2">Last updated: 1/30/2026</p>
      </footer>
    </div>
  </main>
{:else if currentPage === "charm-calculator"}
  <!-- Chief Charm Calculator Page -->
  <main
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
  >
    <nav class="flex items-center justify-between px-8 py-6">
      <button
        on:click={() => navigateTo("home")}
        class="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <span class="text-4xl">🎮</span>
        <span class="text-xl font-bold text-white">Whiteout Survival</span>
      </button>
      <button
        on:click={toggleNav}
        class="flex flex-col gap-1.5 p-2 hover:bg-white/10 rounded-lg transition-colors group"
        aria-label="Open menu"
      >
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
        <span class="w-8 h-0.5 bg-white transition-all"></span>
        <span class="w-8 h-0.5 bg-white group-hover:w-10 transition-all"></span>
      </button>
    </nav>

    <div class="container mx-auto py-8 px-4">
      <header class="text-center mb-8">
        <h1
          class="text-5xl font-bold text-white mb-4 flex items center justify-center gap-3 flex-wrap"
        >
          <span class="text-6xl">🔮</span>
          Chief Charm Material Calculator
        </h1>
        <p class="text-gray-300 max-w-2xl mx-auto">
          Calculate Charm Guides, Charm Designs, and Jewel Secrets needed from
          any charm part to another.
        </p>
      </header>

      <CharmCalculator />

      <footer class="text-center mt-12 text-gray-400 text-sm pb-8">
        <p class="mb-2">
          📊 Data extracted from
          <a
            href="https://www.whiteoutsurvival.wiki/chief-gear/chief-gear/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300"
          >
            Whiteout Survival Wiki
          </a>
        </p>
        <p>Built with ♥ using Vite • Svelte • TailwindCSS • TypeScript</p>
        <p class="text-xs mt-2">Last updated: 1/30/2026</p>
      </footer>
    </div>
  </main>
{/if}

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
  }

  .animate-slideIn {
    animation: slideIn 0.5s ease-out forwards;
    opacity: 0;
  }
</style>
