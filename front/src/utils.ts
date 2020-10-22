export function css(
  ...args: (string | null | undefined)[]
): string | undefined {
  let result = undefined;
  for (const name of args) {
    if (name !== null && name !== undefined && name.length > 0) {
      if (result) {
        result += " " + name;
      } else {
        result = name;
      }
    }
  }
  return result;
}
