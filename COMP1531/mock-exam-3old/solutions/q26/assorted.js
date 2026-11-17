// SOLUTION - Mock Exam 3, Q26

export function sumBy(arr, key) {
  let total = 0;
  for (const obj of arr) {
    // obj[key], not obj.key: we want the property whose NAME is stored in `key`.
    if (obj[key] !== undefined) {
      total += obj[key];
    }
  }
  return total;
}

export function partition(arr, predicate) {
  const pass = [];
  const fail = [];
  for (const item of arr) {
    // predicate is just a variable holding a function, so call it like any function.
    if (predicate(item)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  }
  return [pass, fail];
}

export function mergeCounts(a, b) {
  // Start from a COPY of a. `const result = a` would be the same object, so
  // changing result would change the caller's a.
  const result = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (result[key] === undefined) {
      result[key] = value;
    } else {
      result[key] += value;
    }
  }
  return result;
}

export function isAnagram(a, b) {
  // Two strings are anagrams exactly when their sorted letters are identical.
  const normalise = (str) => {
    const letters = str.toLowerCase().split('').filter(char => char !== ' ');
    // split() made a brand new array, so sorting it does not touch the input.
    return letters.sort().join('');
  };
  return normalise(a) === normalise(b);
}
