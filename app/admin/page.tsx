"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserState } from "@/hooks/use-user-state"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Users, ChefHat, Shield, Search, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { recipes as staticRecipes } from "@/lib/recipes-data"

const getAvatarColor = (name: string) => {
    const colors = [
        "bg-orange-400", "bg-rose-400", "bg-amber-400", "bg-yellow-400",
        "bg-emerald-400", "bg-teal-400", "bg-sky-400", "bg-indigo-400"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};

export default function AdminPage() {
    const { user, isLoaded } = useUserState()
    const router = useRouter()
    const [users, setUsers] = useState<any[]>([])
    const [recipes, setRecipes] = useState<any[]>(staticRecipes)
    const [activeTab, setActiveTab] = useState("users")
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (isLoaded && (!user || user.role !== "admin")) {
            router.push("/")
        }
    }, [isLoaded, user, router])

    useEffect(() => {
        if (user?.role === "admin" || user?.email === "choudharykhushi499@gmail.com") {
            const fetchData = async () => {
                // 1. Fetch Users independently
                try {
                    const usersRes = await fetch("/api/admin/users")
                    if (usersRes.ok) {
                        const usersData = await usersRes.json()
                        if (Array.isArray(usersData) && usersData.length > 0) {
                            setUsers(usersData)
                        }
                    }
                } catch (error) {
                    console.warn("Users fetch error:", error);
                }

                // Check localStorage for any devices/accounts synced locally
                try {
                    const localKnown = localStorage.getItem("talktotaste-known-users")
                    if (localKnown) {
                        const parsed = JSON.parse(localKnown)
                        if (Array.isArray(parsed)) {
                            setUsers(prev => {
                                const map = new Map<string, any>()
                                prev.forEach(u => u.email && map.set(u.email.toLowerCase(), u))
                                parsed.forEach(u => {
                                    if (u.email && !map.has(u.email.toLowerCase())) {
                                        map.set(u.email.toLowerCase(), u)
                                    }
                                })
                                return Array.from(map.values())
                            })
                        }
                    }
                } catch (e) {}

                // 2. Fetch fresh / DB recipes independently
                try {
                    const recipesRes = await fetch("/api/recipes")
                    if (recipesRes.ok) {
                        const recipesData = await recipesRes.json()
                        if (Array.isArray(recipesData) && recipesData.length > 0) {
                            setRecipes(recipesData)
                        }
                    }
                } catch (error) {
                    console.warn("Recipes fetch error:", error);
                }
            };
            fetchData();
        }
    }, [user])

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Are you sure? This will delete the user permanently.")) return
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
            if (res.ok) {
                setUsers(prev => prev.filter(u => u._id !== id && u.email !== id))
            }
        } catch (error) { console.error(error) }
    }

    const handleDeleteRecipe = async (id: number) => {
        if (!confirm("Are you sure? This will delete the recipe permanently.")) return
        try {
            const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" })
            if (res.ok) {
                setRecipes(recipes.filter(r => r.id !== id))
                router.refresh()
            }
        } catch (error) { console.error(error) }
    }

    if (!isLoaded || !user || user.role !== "admin") return null

    const filteredUsers = users.filter(u =>
        (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    const filteredRecipes = recipes.filter(r =>
        (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.nameHindi || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.cuisine || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
            {/* Ambient Background Gradient (consistent with Profile & Recipes pages) */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none -z-10" />

            <Navigation />

            <div className="container mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 text-center md:text-left relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Control Center</span>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary font-bold mt-1">
                                Admin Dashboard
                            </h1>
                        </div>

                        {/* Search bar */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={activeTab === "users" ? "Search users..." : "Search recipes..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 bg-card/80 backdrop-blur-md border-border text-foreground placeholder:text-muted-foreground rounded-full h-10 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm w-full transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center md:justify-start mb-6 sm:mb-8 w-full">
                        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSearchTerm(""); }} className="w-full sm:w-auto">
                            <TabsList className="bg-card/80 backdrop-blur-md p-1.5 rounded-2xl sm:rounded-full border border-border shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 w-full sm:w-auto h-auto">
                                <TabsTrigger
                                    value="users"
                                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground hover:text-foreground px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 font-bold text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                                >
                                    <Users className="w-4 h-4" /> User Management ({users.length})
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manage"
                                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground hover:text-foreground px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full transition-all flex items-center justify-center gap-2 font-bold text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                                >
                                    <ChefHat className="w-4 h-4" /> Manage Recipes ({recipes.length})
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </motion.div>

                <div className="max-w-6xl mx-auto md:mx-0">
                    <AnimatePresence mode="wait">
                        {activeTab === "users" ? (
                            <motion.div
                                key="users-tab"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-card/90 backdrop-blur-md rounded-[1.5rem] p-4 sm:p-6 md:p-8 shadow-md border border-border"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 pb-5 border-b border-border">
                                    <h2 className="text-xl font-bold text-foreground">User Network</h2>
                                    <div className="text-[10px] font-bold text-primary bg-primary/15 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-widest shrink-0">
                                        Total: {filteredUsers.length}
                                    </div>
                                </div>

                                <div className="overflow-x-auto -mx-2 sm:mx-0 pb-4">
                                    <table className="w-full text-left min-w-[700px]">
                                        <thead>
                                            <tr className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest border-b border-border">
                                                <th className="py-4 px-3 sm:px-4 font-bold">User</th>
                                                <th className="py-4 px-3 sm:px-4 font-bold">Email</th>
                                                <th className="py-4 px-3 sm:px-4 font-bold">Role</th>
                                                <th className="py-4 px-3 sm:px-4 font-bold text-right">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/40">
                                            {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                                                <tr key={u._id} className="hover:bg-muted/40 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar className="w-10 h-10 shadow-sm border border-border">
                                                                {u.image && <AvatarImage src={u.image} alt={u.name} />}
                                                                <AvatarFallback className={`${getAvatarColor(u.name || u.email)} text-white font-bold text-base`}>
                                                                    {(u.name || u.email || "?").charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="font-bold text-foreground text-base group-hover:text-primary transition-colors">{u.name || "App User"}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-muted-foreground font-medium text-sm">{u.email}</td>
                                                    <td className="py-4 px-4">
                                                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${
                                                            u.role === 'admin' 
                                                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                                                : 'bg-muted text-muted-foreground border border-border'
                                                        }`}>
                                                            {u.role || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        {u.role !== 'admin' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDeleteUser(u._id)}
                                                                className="text-muted-foreground/60 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                                                            >
                                                                <Trash className="w-5 h-5" />
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={4} className="py-20 text-center text-muted-foreground italic font-medium">No users found in database</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="recipes-tab"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-card/90 backdrop-blur-md rounded-[1.5rem] p-4 sm:p-6 md:p-8 shadow-md border border-border"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 pb-5 border-b border-border">
                                    <h2 className="text-xl font-bold text-foreground">Recipe Catalog</h2>
                                    <div className="text-[10px] font-bold text-primary bg-primary/15 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-widest shrink-0">
                                        Total Items: {recipes.length}
                                    </div>
                                </div>
                                <div className="overflow-x-auto -mx-2 sm:mx-0 pb-4">
                                    <table className="w-full text-left min-w-[500px]">
                                        <thead>
                                            <tr className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest border-b border-border">
                                                <th className="py-4 px-3 sm:px-4 font-bold">Image</th>
                                                <th className="py-4 px-3 sm:px-4 font-bold">Name & Translation</th>
                                                <th className="py-4 px-3 sm:px-4 font-bold text-right">Management</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/40">
                                            {filteredRecipes.map((r) => (
                                                <tr key={r.id} className="hover:bg-muted/40 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <div className="relative w-16 h-16 rounded-[1rem] overflow-hidden shadow-sm border border-border/50">
                                                            <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{r.name}</div>
                                                        <div className="text-xs text-muted-foreground font-medium mt-1">{r.nameHindi}</div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRecipe(r.id)} className="text-muted-foreground/60 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all h-8 w-8">
                                                            <Trash className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <Footer />
        </div>
    )
}

