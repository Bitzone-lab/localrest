export function IDNumber(): number {
  return new Date().valueOf()
}

export function IDString(): string {
  return Math.random().toString(36).substr(2, 9)
}
