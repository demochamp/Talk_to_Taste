export function startTimer(minutes: number, onDone: () => void) {
  setTimeout(onDone, minutes * 60000)
}
