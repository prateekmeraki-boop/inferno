export const charmData = {
  1: { designs: 5, guides: 5, jewels: 0, power: 205700 },
  2: { designs: 15, guides: 40, jewels: 0, power: 288000 },
  3: { designs: 40, guides: 60, jewels: 0, power: 370000 },
  4: { designs: 100, guides: 80, jewels: 0, power: 452000 },
  5: { designs: 200, guides: 100, jewels: 0, power: 576000 },
  6: { designs: 300, guides: 120, jewels: 0, power: 700000 },
  7: { designs: 400, guides: 140, jewels: 0, power: 824000 },
  8: { designs: 400, guides: 200, jewels: 0, power: 948000 },
  9: { designs: 400, guides: 300, jewels: 0, power: 1072000 },
  10: { designs: 420, guides: 420, jewels: 0, power: 1196000 },
  11: { designs: 420, guides: 560, jewels: 0, power: 1320000 },
  12: { designs: 450, guides: 580, jewels: 15, power: 1444000 },
  13: { designs: 450, guides: 580, jewels: 30, power: 1568000 },
  14: { designs: 500, guides: 600, jewels: 45, power: 1692000 },
  15: { designs: 500, guides: 600, jewels: 70, power: 1816000 },
  16: { designs: 550, guides: 650, jewels: 100, power: 1940000 },
};

export function getPerPartCost(level: number) {
  const totalCost = charmData[level as keyof typeof charmData];
  if (!totalCost) {
    return { guides: 0, designs: 0, jewels: 0, power: 0 };
  }

  const divisor = level <= 10 ? 4 : 5;

  return {
    guides: totalCost.guides / divisor,
    designs: totalCost.designs / divisor,
    jewels: totalCost.jewels / divisor,
    power: totalCost.power / divisor,
  };
}

export const charmSteps = (() => {
  const steps = [];
  let stepId = 0;

  for (let level = 1; level <= 10; level++) {
    for (let part = 1; part <= 3; part++) {
      steps.push({
        id: stepId++,
        label: `Lv ${level} - Part ${part}`,
      });
    }
    steps.push({
      id: stepId++,
      label: `Lv ${level + 1}`,
    });
  }

  for (let level = 11; level <= 15; level++) {
    for (let part = 1; part <= 4; part++) {
      steps.push({
        id: stepId++,
        label: `Lv ${level} - Part ${part}`,
      });
    }
    steps.push({
      id: stepId++,
      label: `Lv ${level + 1}`,
    });
  }

  for (let part = 1; part <= 4; part++) {
    steps.push({
      id: stepId++,
      label: `Lv 16 - Part ${part}`,
    });
  }
  steps.push({
    id: stepId++,
    label: `Lv 17`,
  });

  return steps;
})();
