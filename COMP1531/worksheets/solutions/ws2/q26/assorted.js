export function groupBy(arr, key) {
  const groups = {};
  for (const item of arr) {
    const value = item[key];
    if (groups[value] === undefined) {
      groups[value] = [];
    }
    groups[value].push(item);
  }
  return groups;
}

export function flatten(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

export function mostFrequent(arr) {
  const counts = new Map();
  let best;
  let bestCount = 0;
  for (const item of arr) {
    const count = (counts.get(item) ?? 0) + 1;
    counts.set(item, count);
    // strictly greater, so earlier elements win ties
    if (count > bestCount) {
      best = item;
      bestCount = count;
    }
  }
  return best;
}

export function mergeCounts(a, b) {
  const result = { ...a };
  for (const [key, value] of Object.entries(b)) {
    result[key] = (result[key] ?? 0) + value;
  }
  return result;
}
