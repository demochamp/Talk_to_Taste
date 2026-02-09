import mongoose from "mongoose"

const RecipeSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  ingredients: [String],
  steps: [String],
  time: Number,
})

export default mongoose.models.Recipe ||
  mongoose.model("Recipe", RecipeSchema)
