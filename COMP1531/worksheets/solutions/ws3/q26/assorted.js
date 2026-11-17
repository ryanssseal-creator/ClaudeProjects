export function runLengthEncode(str) {
  let result = '';
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (j < str.length && str[j] === str[i]) {
      j++;
    }
    result += str[i] + (j - i);
    i = j;
  }
  return result;
}

export function transpose(matrix) {
  if (matrix.length === 0) {
    return [];
  }
  const result = [];
  for (let col = 0; col < matrix[0].length; col++) {
    result.push(matrix.map((row) => row[col]));
  }
  return result;
}

export function pick(obj, keys) {
  const result = {};
  for (const key of keys) {
    // `in` (not a truthiness check) so 0, '' and false are kept
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function deepSum(obj) {
  let total = 0;
  for (const value of Object.values(obj)) {
    if (typeof value === 'number') {
      total += value;
    } else if (typeof value === 'object') {
      total += deepSum(value);
    }
  }
  return total;
}
