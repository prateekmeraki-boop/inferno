<script lang="ts">
  import type { CalculationResult } from "$types";

  export let result: CalculationResult;
</script>

<div class="text-xs text-gray-200 space-y-1 pt-2 border-t border-gray-600">
  {#if result.totalDesignPlan > 0}
    <div class="flex justify-between">
      <span>📋 Design Plan:</span>
      <span class="font-semibold text-yellow-300"
        >{result.totalDesignPlan.toLocaleString()}</span
      >
    </div>
  {/if}

  {#if result.totalHardenedAlloy > 0}
    <div class="flex justify-between">
      <span>⚒️ Hardened Alloy:</span>
      <span class="font-semibold text-orange-300"
        >{result.totalHardenedAlloy.toLocaleString()}</span
      >
    </div>
  {/if}

  {#if result.totalPolishingSolution > 0}
    <div class="flex justify-between">
      <span>💧 Polishing Solution:</span>
      <span class="font-semibold text-cyan-300"
        >{result.totalPolishingSolution.toLocaleString()}</span
      >
    </div>
  {/if}

  {#if result.totalLunarAmber > 0}
    <div class="flex justify-between">
      <span>✨ Lunar Amber:</span>
      <span class="font-semibold text-pink-300"
        >{result.totalLunarAmber.toLocaleString()}</span
      >
    </div>
  {/if}

  <div class="flex justify-between pt-2 border-t border-gray-600 font-semibold">
    <span>⚡ Power Gain:</span>
    <span class="text-green-300"
      >{(result.totalPower || 0).toLocaleString()}</span
    >
  </div>
</div>
