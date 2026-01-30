<script lang="ts">
  export let name: string;
  export let quantity: number;
  export let tier: string = "";

  // Format material name from camelCase to proper case
  function formatMaterialName(name: string): string {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  // Get emoji icon for material
  function getMaterialIcon(materialName: string): string {
    const lowerName = materialName.toLowerCase();

    if (lowerName.includes("lunar") || lowerName.includes("amber")) {
      return "💎";
    } else if (lowerName.includes("hardened") || lowerName.includes("alloy")) {
      return "🔩";
    } else if (lowerName.includes("design") || lowerName.includes("plan")) {
      return "📜";
    } else if (
      lowerName.includes("polishing") ||
      lowerName.includes("solution")
    ) {
      return "🧪";
    }
    return "📦";
  }

  // Map tier to color
  function getTierColor(tier: string, materialName: string): string {
    const tierColors: Record<string, string> = {
      Green: "bg-green-500/20 border-green-500",
      Blue: "bg-blue-500/20 border-blue-500",
      Purple: "bg-purple-500/20 border-purple-500",
      Gold: "bg-yellow-500/20 border-yellow-500",
      Red: "bg-red-500/20 border-red-500",
    };

    const lowerName = materialName.toLowerCase();
    if (lowerName.includes("lunar") || lowerName.includes("amber")) {
      return tierColors["Red"];
    } else if (lowerName.includes("design") || lowerName.includes("plan")) {
      return tierColors["Gold"];
    }

    return tierColors[tier] || "bg-slate-500/20 border-slate-500";
  }

  $: displayName = formatMaterialName(name);
  $: tierColor = getTierColor(tier, name);
  $: materialIcon = getMaterialIcon(name);
</script>

<div class="material-card p-5 rounded-lg border-2 {tierColor} backdrop-blur-sm">
  <div class="flex flex-col gap-4">
    <!-- Icon and Name Row -->
    <div class="flex items-center gap-3">
      <div class="flex-shrink-0 text-4xl leading-none">
        {materialIcon}
      </div>
      <div class="flex-1 min-w-0">
        <h4
          class="text-base font-semibold text-white break-words leading-tight"
        >
          {displayName}
        </h4>
        {#if tier}
          <span class="text-xs text-gray-400 block mt-0.5">{tier}</span>
        {/if}
      </div>
    </div>

    <!-- Quantity Row with Clean Bold Typography -->
    <div class="text-center py-2">
      <span
        class="quantity-display text-5xl font-extrabold text-white tracking-tight"
      >
        {quantity.toLocaleString()}
      </span>
    </div>
  </div>
</div>

<style>
  .material-card {
    transition: all 0.2s ease-in-out;
  }

  .material-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .quantity-display {
    font-variant-numeric: tabular-nums;
  }
</style>
