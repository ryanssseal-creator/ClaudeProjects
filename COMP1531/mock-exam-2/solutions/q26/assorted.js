// SOLUTION - Mock Exam 2, Q26

export function intersection(a, b) {
  const result = [];
  // `of` gives the values. `in` would give the indices as strings.
  for (const item of a) {
    if (b.includes(item)) {
      result.push(item);
    }
  }
  return result;
}

export function flatten(arr) {
  const result = [];
  for (const inner of arr) {
    for (const item of inner) {
      result.push(item);
    }
  }
  return result;
}

export function invert(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // Square brackets: use the VALUE stored in `value` as the new key.
    // result.value would create a key literally called "value".
    result[value] = key;
  }
  return result;
}

export function initials(str) {
  const words = str.split(' ');
  let result = '';
  for (const word of words) {
    // charAt(0) is safe on an empty string (it gives ''), unlike word[0].toUpperCase().
    // Strings can't be changed in place, so build up a new one and RETURN it.
    result += word.charAt(0).toUpperCase();
  }
  return result;
}
