export function detectIntent(text: string) {
  const t = text.toLowerCase()

  if (t.includes("next")) return "NEXT_STEP"
  if (t.includes("repeat")) return "REPEAT_STEP"
  if (t.includes("timer")) return "SET_TIMER"
  if (t.includes("save recipe")) return "SAVE"
  if (t.includes("share")) return "SHARE"
  if (t.includes("whistle")) return "WHISTLE"
  if (t.includes("what can i cook")) return "INGREDIENT_SEARCH"
  if (t.includes("how to fix")) return "KITCHEN_HELP"

  return "RECIPE_SEARCH"
}
