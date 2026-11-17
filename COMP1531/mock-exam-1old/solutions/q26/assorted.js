// SOLUTION - Mock Exam 1, Q26

export function unique(arr) {
  const result = [];
  // `of` gives the values. `in` would give the indices as strings.
  for (const item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

export function countOccurrences(arr) {
  const counts = {};
  for (const item of arr) {
    // counts[item] with square brackets uses the VALUE of item as the key.
    // counts.item would create a key literally called "item".
    if (counts[item] === undefined) {
      counts[item] = 0;
    }
    counts[item]++;
  }
  return counts;
}

export function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    // `key in obj` rather than `if (obj[key])`, so that 0, '' and false are kept.
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function reverseWords(str) {
  // Strings are immutable: build new ones and RETURN the joined result.
  const words = str.split(' ');
  const reversed = words.map(word => word.split('').reverse().join(''));
  return reversed.join(' ');
}
