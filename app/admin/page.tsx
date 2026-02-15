"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserState } from "@/hooks/use-user-state"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash, Loader2 } from "lucide-react"

export default function AdminPage() {
    const { user, isLoaded } = useUserState()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        nameHindi: "",
        cuisine: "North Indian",
        category: "Curries",
        time: "30 mins",
        prepTime: "10 mins",
        cookTime: "20 mins",
        servings: 4,
        difficulty: "Medium",
        image: "/placeholder.jpg",
        description: "",
        descriptionHindi: "",
        rating: 4.5,
        youtubeUrl: "",
        whistleCount: 0,
        tags: "",
    })

    const [ingredients, setIngredients] = useState([
        { item: "", itemHindi: "", quantity: "", quantityHindi: "" }
    ])

    const [steps, setSteps] = useState([
        { step: 1, instruction: "", instructionHindi: "", duration: "", tips: "", tipsHindi: "" }
    ])

    // Redirect if not admin
    if (isLoaded && user.role !== "admin") {
        router.push("/")
        return null
    }

    if (!isLoaded) return null

    const handleIngredientChange = (index: number, field: string, value: string) => {
        const newIngredients: any = [...ingredients]
        newIngredients[index][field] = value
        setIngredients(newIngredients)
    }

    const addIngredient = () => {
        setIngredients([...ingredients, { item: "", itemHindi: "", quantity: "", quantityHindi: "" }])
    }

    const removeIngredient = (index: number) => {
        const newIngredients = ingredients.filter((_, i) => i !== index)
        setIngredients(newIngredients)
    }

    const handleStepChange = (index: number, field: string, value: string) => {
        const newSteps: any = [...steps]
        newSteps[index][field] = value
        setSteps(newSteps)
    }

    const addStep = () => {
        setSteps([...steps, { step: steps.length + 1, instruction: "", instructionHindi: "", duration: "", tips: "", tipsHindi: "" }])
    }

    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 }))
        setSteps(newSteps)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const recipeData = {
                ...formData,
                ingredients,
                steps,
                tags: formData.tags.split(",").map(t => t.trim()), // Convert comma separated string to array
            }

            const res = await fetch("/api/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipeData)
            })

            if (res.ok) {
                alert("Recipe added successfully!")
                router.push("/recipes")
            } else {
                alert("Failed to add recipe")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-8 gradient-text">Admin Dashboard</h1>
                <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6">Add New Recipe</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Recipe Name</Label>
                                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Name (Hindi)</Label>
                                <Input value={formData.nameHindi} onChange={e => setFormData({ ...formData, nameHindi: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Cuisine</Label>
                                <Input value={formData.cuisine} onChange={e => setFormData({ ...formData, cuisine: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                        </div>

                        {/* Times & Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label>Prep Time</Label>
                                <Input value={formData.prepTime} onChange={e => setFormData({ ...formData, prepTime: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Cook Time</Label>
                                <Input value={formData.cookTime} onChange={e => setFormData({ ...formData, cookTime: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Select Total Time</Label>
                                <Input value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Servings</Label>
                                <Input type="number" value={formData.servings} onChange={e => setFormData({ ...formData, servings: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Rating (0-5)</Label>
                                <Input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} />
                            </div>

                            <div className="space-y-2">
                                <Label>Difficulty</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                    value={formData.difficulty}
                                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Description (Hindi)</Label>
                            <Textarea value={formData.descriptionHindi} onChange={e => setFormData({ ...formData, descriptionHindi: e.target.value })} />
                        </div>

                        {/* Media */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Image URL (e.g. /image.jpg)</Label>
                                <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>YouTube URL</Label>
                                <Input value={formData.youtubeUrl} onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })} />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label>Tags (comma separated)</Label>
                            <Input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="spicy, lunch, curry" />
                        </div>

                        {/* Ingredients */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Ingredients</h3>
                                <Button type="button" variant="outline" size="sm" onClick={addIngredient}><Plus className="w-4 h-4 mr-2" /> Add</Button>
                            </div>
                            {ingredients.map((ing, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end bg-secondary/20 p-3 rounded-lg">
                                    <div className="space-y-1">
                                        <Label className="text-xs">Item</Label>
                                        <Input value={ing.item} onChange={e => handleIngredientChange(i, 'item', e.target.value)} placeholder="Onion" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Item (Hindi)</Label>
                                        <Input value={ing.itemHindi} onChange={e => handleIngredientChange(i, 'itemHindi', e.target.value)} placeholder="प्याज" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Quantity</Label>
                                        <Input value={ing.quantity} onChange={e => handleIngredientChange(i, 'quantity', e.target.value)} placeholder="1 cup" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs">Quantity (Hindi)</Label>
                                        <Input value={ing.quantityHindi} onChange={e => handleIngredientChange(i, 'quantityHindi', e.target.value)} placeholder="1 कप" />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(i)} disabled={ingredients.length === 1}>
                                        <Trash className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Steps */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Instructions</h3>
                                <Button type="button" variant="outline" size="sm" onClick={addStep}><Plus className="w-4 h-4 mr-2" /> Add</Button>
                            </div>
                            {steps.map((step, i) => (
                                <div key={i} className="bg-secondary/20 p-4 rounded-lg space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold">Step {step.step}</span>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(i)} disabled={steps.length === 1}>
                                            <Trash className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label>Instruction</Label>
                                            <Textarea value={step.instruction} onChange={e => handleStepChange(i, 'instruction', e.target.value)} />
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Instruction (Hindi)</Label>
                                            <Textarea value={step.instructionHindi} onChange={e => handleStepChange(i, 'instructionHindi', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <Label>Duration</Label>
                                            <Input value={step.duration} onChange={e => handleStepChange(i, 'duration', e.target.value)} placeholder="5 mins" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Tips (Optional)</Label>
                                            <Input value={step.tips} onChange={e => handleStepChange(i, 'tips', e.target.value)} />
                                        </div>
                                        <div className="space-y-1">
                                            <Label>Tips Hindi (Optional)</Label>
                                            <Input value={step.tipsHindi} onChange={e => handleStepChange(i, 'tipsHindi', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg rounded-xl">
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                            {isLoading ? "Saving Recipe..." : "Save Recipe"}
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
