/**
 * Returns a string of requested characters length with leading zeros if initial value is shorter
 */
export function leadingZeros(num: number | string, charsCount: number) {
  let str = String(num);

  while (str.length < charsCount) {
    str = "0" + str;
  }

  return str;
}
