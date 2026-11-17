export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function countWords(str) {
  const counts = {};
  if (str === '') {
    return counts;
  }
  for (const word of str.toLowerCase().split(' ')) {
    counts[word] = (counts[word] ?? 0) + 1;
  }
  return counts;
}

export function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

export function zip(a, b) {
  const length = Math.min(a.length, b.length);
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push([a[i], b[i]]);
  }
  return result;
}
