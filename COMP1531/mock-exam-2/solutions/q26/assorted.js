// SOLUTION - Mock Exam 2, Q26

export function intersection(a, b) {
  const result = [];
  for (const item of a) {
    // in b, and not already added
    if (b.includes(item) && !result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

export function rotate(arr, k) {
  if (arr.length === 0) {
    return [];
  }
  // Rotating by the full length changes nothing, so only the remainder matters.
  const shift = k % arr.length;
  // slice never modifies the original array (unlike pop/shift/reverse/sort/splice).
  const end = arr.slice(arr.length - shift);
  const start = arr.slice(0, arr.length - shift);
  return [...end, ...start];
}

export function invert(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // Square brackets: use the VALUE of `value` as the new key.
    result[value] = key;
  }
  return result;
}

export function toCamelCase(str) {
  const words = str.split(' ');
  const converted = words.map((word, index) => {
    const lower = word.toLowerCase();
    if (index === 0) {
      return lower;
    }
    // charAt(0) is safe on an empty string (returns ''), unlike word[0].toUpperCase().
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
  return converted.join('');
}
