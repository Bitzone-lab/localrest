export function IDNumber(): number {
  const typedArray = new Uint8Array(10);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return parseInt(randomValues.join(''))
}

export function IDString(): string {
  return Math.random().toString(36).substr(2, 9)
}