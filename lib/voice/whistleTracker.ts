let target = 0
let count = 0

export function startWhistleTracking(n: number) {
  target = n
  count = 0
}

export function whistleDone() {
  count++
  return target - count
}
