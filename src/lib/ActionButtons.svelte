<script lang="ts">
  import type { SelectedGear } from "$types";
  import type { CalculationResult } from "$types";

  export let selectedGears: SelectedGear[] = [];
  export let totals: Partial<CalculationResult> = {};

  let copyMessage = "";

  function formatMaterialSummary(): string {
    const lines: string[] = [];
    lines.push("=== CHIEF GEAR MATERIALS REQUIRED ===\n");

    if (selectedGears.length > 0) {
      lines.push("Selected Gears:");
      selectedGears.forEach((gear) => {
        lines.push(`  • ${gear.tier} ⭐${gear.stars} x${gear.quantity}`);
      });
      lines.push("");
    }

    lines.push("Total Materials Needed:");
    if ((totals.totalDesignPlan || 0) > 0)
      lines.push(
        `  📋 Design Plan: ${totals.totalDesignPlan?.toLocaleString()}`,
      );
    if ((totals.totalHardenedAlloy || 0) > 0)
      lines.push(
        `  ⚒️ Hardened Alloy: ${totals.totalHardenedAlloy?.toLocaleString()}`,
      );
    if ((totals.totalPolishingSolution || 0) > 0)
      lines.push(
        `  💧 Polishing Solution: ${totals.totalPolishingSolution?.toLocaleString()}`,
      );
    if ((totals.totalLunarAmber || 0) > 0)
      lines.push(
        `  ✨ Lunar Amber: ${totals.totalLunarAmber?.toLocaleString()}`,
      );

    if ((totals.totalPower || 0) > 0) {
      lines.push("");
      lines.push(`Total Power Gain: ⚡ ${totals.totalPower?.toLocaleString()}`);
    }

    return lines.join("\n");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(formatMaterialSummary()).then(() => {
      copyMessage = "Copied to clipboard!";
      setTimeout(() => {
        copyMessage = "";
      }, 2000);
    });
  }

  function exportAsJSON() {
    const data = {
      selectedGears: selectedGears.map((gear) => ({
        tier: gear.tier,
        stars: gear.stars,
        quantity: gear.quantity,
        bonus: gear.bonus,
        powerTotal: gear.powerTotal,
      })),
      totals: {
        lunarAmber: totals.totalLunarAmber || 0,
        totalPowerGain: totals.totalPower || 0,
      },
      exportedAt: new Date().toISOString(),
    };

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data, null, 2)),
    );
    element.setAttribute(
      "download",
      `chief-gear-calculation-${new Date().getTime()}.json`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
</script>

<div class="pt-4 border-t border-purple-700/30 space-y-2">
  <button
    on:click={copyToClipboard}
    class="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
  >
    <span>📋</span>
    <span>Copy to Clipboard</span>
  </button>

  <button
    on:click={exportAsJSON}
    class="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2"
  >
    <span>💾</span>
    <span>Export as JSON</span>
  </button>

  {#if copyMessage}
    <div class="text-center text-green-400 text-sm font-semibold animate-pulse">
      ✓ {copyMessage}
    </div>
  {/if}
</div>
