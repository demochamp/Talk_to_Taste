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
  id: { type: Number, unique: true }, // numeric display id
  name: { type: String, required: true },
  nameHindi: String,
  cuisine: String,
  category: String,
  time: String,
  prepTime: String,
  cookTime: String,
  servings: Number,
  difficulty: String,
  rating: { type: Number, default: 4.5 },
  image: { type: String, default: "/placeholder.jpg" },
  description: String,
  descriptionHindi: String,
  ingredients: [IngredientSchema],
  steps: [StepSchema],
  whistleCount: Number,
  youtubeUrl: String,
  tags: [String],
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.Recipe ?? mongoose.model("Recipe", RecipeSchema)
