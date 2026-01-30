<script lang="ts">
  import type { ChiefGear } from "$types";
  import { createEventDispatcher } from "svelte";

  export let gear: ChiefGear;
  export let isSelected: boolean = false;

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("select", gear);
  }
</script>

<button
  on:click={handleClick}
  class="w-full p-3 rounded-lg transition-all duration-200 text-left
         {isSelected
    ? 'bg-slate-600 ring-2 ring-blue-400'
    : 'bg-slate-700 hover:bg-slate-600'}"
  aria-current={isSelected ? "true" : undefined}
>
  <!-- button content -->
</button>
