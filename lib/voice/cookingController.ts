let stepIndex = 0

export function resetSteps() {
  stepIndex = 0
}

export function nextStep(steps: string[]) {
  if (stepIndex < steps.length - 1) stepIndex++
  return steps[stepIndex]
}

export function repeatStep(steps: string[]) {
  return steps[stepIndex]
}
