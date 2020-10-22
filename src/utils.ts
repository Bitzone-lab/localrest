export function generator() {
  let count = 0

  function getID(): number {
    count++
    return new Date().valueOf() + count
  }

  return {
    getID
  }
}
