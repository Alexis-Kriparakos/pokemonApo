export function compareStrings(predef, word) {
  return word
    .split('')
    .map((letter, i) => {
      if (predef[i] === letter) return 'Matched';
      if (predef.includes(letter)) return 'Included';
      return 'Unmatched';
    });
}

export function encodeString(str) {
  if (!str) return;
  return btoa(str);
}

export function decodeString(str) {
  if (!str) return;
  return atob(str);
}
