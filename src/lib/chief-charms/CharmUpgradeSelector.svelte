<!-- src/lib/chief-charms/CharmUpgradeSelector.svelte -->
<script lang="ts">
  import type { CharmStep } from "../../types/chiefCharm";

  export let charmSteps: CharmStep[] = [];
  export let fromId: number;
  export let toId: number;

  // Bubble a generic change event so parent can recalc
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch("change", { fromId, toId });
  }
</script>

<div class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-slate-300 mb-1">
      Current Charm Part
    </label>
    <select
      class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      bind:value={fromId}
      on:change={handleChange}
    >
      {#each charmSteps as step}
        <option value={step.id}>
          {step.label}
        </option>
      {/each}
    </select>
  </div>

  <div>
    <label class="block text-sm font-medium text-slate-300 mb-1">
      Target Charm Part
    </label>
    <select
      class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      bind:value={toId}
      on:change={handleChange}
    >
      {#each charmSteps as step}
        <option value={step.id}>
          {step.label}
        </option>
      {/each}
    </select>
  </div>

  <p class="text-xs text-slate-400 mt-2">
    Target must be higher than current. Each level is divided into four equal
    parts.
  </p>
</div>
