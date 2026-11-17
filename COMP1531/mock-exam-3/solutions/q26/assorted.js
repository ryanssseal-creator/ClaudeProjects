// SOLUTION - Mock Exam 3, Q26

export function sumBy(arr, key) {
  let total = 0;
  // `of` gives each object. `in` would give the indices as strings.
  for (const obj of arr) {
    // obj[key], not obj.key: we want the property whose NAME is stored in `key`.
    total += obj[key];
  }
  return total;
}

export function lastN(arr, n) {
  const result = [];
  // Start n places from the end, but never before index 0.
  let start = arr.length - n;
  if (start < 0) {
    start = 0;
  }
  for (let i = start; i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result;
  // One-liner alternative: return arr.slice(start);
}

export function renameKey(obj, oldKey, newKey) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === oldKey) {
      // Square brackets: use the VALUE stored in newKey as the key name.
      result[newKey] = value;
    } else {
      result[key] = value;
    }
  }
  return result;
}

export function isPalindrome(str) {
  const lower = str.toLowerCase();
  // split('') makes a new array of letters, so reversing it doesn't touch the string.
  const reversed = lower.split('').reverse().join('');
  return lower === reversed;
}
