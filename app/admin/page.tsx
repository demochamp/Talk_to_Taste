

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserState } from "@/hooks/use-user-state"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash, Loader2, Users, ChefHat } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
    const { user, isLoaded } = useUserState()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState<any[]>([])

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

    const { t } = useTranslation()

    // Redirect if not admin
    useEffect(() => {
        if (isLoaded && user.role !== "admin") {
            router.push("/")
        }
    }, [isLoaded, user.role, router])

    // Fetch users
    useEffect(() => {
        if (user.role === "admin") {
            fetch("/api/admin/users")
                .then(res => res.json())
                .then(data => setUsers(data))
                .catch(err => console.error("Failed to fetch users", err))
        }
    }, [user.role])

    if (!isLoaded || user.role !== "admin") return null

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
                <h1 className="text-4xl font-bold mb-8 gradient-text">{t("admin.dashboard")}</h1>

                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="bg-orange-100 p-1 rounded-lg">
                        <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            User Management
                        </TabsTrigger>
                        <TabsTrigger value="recipes" className="data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm px-6 py-2 rounded-md transition-all flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            Add Recipe
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="users" className="animate-fade-in-up">
                        <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6">Registered Users</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 font-semibold text-gray-700">Name</th>
                                            <th className="py-3 px-4 font-semibold text-gray-700">Email</th>
                                            <th className="py-3 px-4 font-semibold text-gray-700">Role</th>
                                            <th className="py-3 px-4 font-semibold text-gray-700">Provider</th>
                                            <th className="py-3 px-4 font-semibold text-gray-700">Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-4 text-center text-gray-500">No users found or loading...</td>
                                            </tr>
                                        ) : (
                                            users.map((u, i) => (
                                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 px-4 flex items-center gap-2">
                                                        {u.image && <img src={u.image} alt={u.name} className="w-8 h-8 rounded-full" />}
                                                        {u.name || "Unknown"}
                                                    </td>
                                                    <td className="py-3 px-4">{u.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.email === 'choudharykhushi499@gmail.com' || u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                                                            {u.email === 'choudharykhushi499@gmail.com' || u.role === 'admin' ? 'Admin' : 'User'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 capitalize">{u.provider || "oauth"}</td>
                                                    <td className="py-3 px-4 text-sm text-gray-500">
                                                        {new Date().toLocaleDateString()} {/* Placeholder for real date if not checking createdAt */}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="recipes" className="animate-fade-in-up">
                        <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
                            <h2 className="text-2xl font-semibold mb-6">{t("admin.add_new")}</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>{t("admin.recipe_name")}</Label>
                                        <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.recipe_name_hi")}</Label>
                                        <Input value={formData.nameHindi} onChange={e => setFormData({ ...formData, nameHindi: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.cuisine")}</Label>
                                        <Input value={formData.cuisine} onChange={e => setFormData({ ...formData, cuisine: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.category")}</Label>
                                        <Input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    </div>
                                </div>

                                {/* Times & Details */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t("admin.prep_time")}</Label>
                                        <Input value={formData.prepTime} onChange={e => setFormData({ ...formData, prepTime: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.cook_time")}</Label>
                                        <Input value={formData.cookTime} onChange={e => setFormData({ ...formData, cookTime: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.total_time")}</Label>
                                        <Input value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.servings")}</Label>
                                        <Input type="number" value={formData.servings} onChange={e => setFormData({ ...formData, servings: Number(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.rating")}</Label>
                                        <Input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>{t("admin.difficulty")}</Label>
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
                                    <Label>{t("admin.description")}</Label>
                                    <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t("admin.description_hi")}</Label>
                                    <Textarea value={formData.descriptionHindi} onChange={e => setFormData({ ...formData, descriptionHindi: e.target.value })} />
                                </div>

                                {/* Media */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>{t("admin.image_url")}</Label>
                                        <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t("admin.youtube_url")}</Label>
                                        <Input value={formData.youtubeUrl} onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })} />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <Label>{t("admin.tags")}</Label>
                                    <Input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} placeholder="spicy, lunch, curry" />
                                </div>

                                {/* Ingredients */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-semibold">{t("admin.ingredients")}</h3>
                                        <Button type="button" variant="outline" size="sm" onClick={addIngredient}><Plus className="w-4 h-4 mr-2" /> {t("admin.add_btn")}</Button>
                                    </div>
                                    {ingredients.map((ing, i) => (
                                        <div key={i} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end bg-secondary/20 p-3 rounded-lg">
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t("admin.item")}</Label>
                                                <Input value={ing.item} onChange={e => handleIngredientChange(i, 'item', e.target.value)} placeholder="Onion" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t("admin.item_hi")}</Label>
                                                <Input value={ing.itemHindi} onChange={e => handleIngredientChange(i, 'itemHindi', e.target.value)} placeholder="प्याज" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t("admin.quantity")}</Label>
                                                <Input value={ing.quantity} onChange={e => handleIngredientChange(i, 'quantity', e.target.value)} placeholder="1 cup" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t("admin.quantity_hi")}</Label>
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
                                        <h3 className="text-xl font-semibold">{t("admin.instructions")}</h3>
                                        <Button type="button" variant="outline" size="sm" onClick={addStep}><Plus className="w-4 h-4 mr-2" /> {t("admin.add_btn")}</Button>
                                    </div>
                                    {steps.map((step, i) => (
                                        <div key={i} className="bg-secondary/20 p-4 rounded-lg space-y-3">
                                            <div className="flex justify-between">
                                                <span className="font-bold">{t("admin.step")} {step.step}</span>
                                                <Button type="button" variant="ghost" size="icon" onClick={() => removeStep(i)} disabled={steps.length === 1}>
                                                    <Trash className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label>{t("admin.instruction")}</Label>
                                                    <Textarea value={step.instruction} onChange={e => handleStepChange(i, 'instruction', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label>{t("admin.instruction_hi")}</Label>
                                                    <Textarea value={step.instructionHindi} onChange={e => handleStepChange(i, 'instructionHindi', e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-1">
                                                    <Label>{t("admin.duration")}</Label>
                                                    <Input value={step.duration} onChange={e => handleStepChange(i, 'duration', e.target.value)} placeholder="5 mins" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label>{t("admin.tips")}</Label>
                                                    <Input value={step.tips} onChange={e => handleStepChange(i, 'tips', e.target.value)} />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label>{t("admin.tips_hi")}</Label>
                                                    <Input value={step.tipsHindi} onChange={e => handleStepChange(i, 'tipsHindi', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button type="submit" disabled={isLoading} className="w-full py-6 text-lg rounded-xl">
                                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                                    {isLoading ? t("admin.saving") : t("admin.save_recipe")}
                                </Button>
                            </form>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </div>
    )
}
