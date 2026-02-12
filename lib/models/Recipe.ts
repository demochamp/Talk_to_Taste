import mongoose, { Schema } from "mongoose"

const StepSchema = new Schema({
  step: Number,
  instruction: String,
  instructionHindi: String,
  duration: String,
  tips: String,
  tipsHindi: String,
}, { _id: false })

const IngredientSchema = new Schema({
  item: String,
  itemHindi: String,
  quantity: String,
  quantityHindi: String,
}, { _id: false })

const RecipeSchema = new Schema({
  id: Number, // numeric display id
  name: String, 
  nameHindi: String,
  cuisine: String,
  category: String,
  time: String,
  servings: Number,
  difficulty: String,
  image: String,
  ingredients: [IngredientSchema],
  steps: [StepSchema],
})

export default mongoose.models.Recipe ?? mongoose.model("Recipe", RecipeSchema)
