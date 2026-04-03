"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserState } from "@/hooks/use-user-state"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Trash, Users, ChefHat, Shield, Search } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"

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
    const [recipes, setRecipes] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState("users")
    const { t } = useTranslation()
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (isLoaded && (!user || user.role !== "admin")) {
            router.push("/")
        }
    }, [isLoaded, user, router])

    useEffect(() => {
        if (user?.role === "admin") {
            const fetchData = async () => {
                try {
                    const [usersRes, recipesRes] = await Promise.all([
                        fetch("/api/admin/users"),
                        fetch("/api/recipes")
                    ]);
                    const usersData = await usersRes.json();
                    const recipesData = await recipesRes.json();
                    setUsers(Array.isArray(usersData) ? usersData : []);
                    setRecipes(Array.isArray(recipesData) ? recipesData : []);
                } catch (error) {
                    console.error("Fetch Error:", error);
                }
            };
            fetchData();
        }
    }, [user?.role])

    const handleDeleteUser = async (id: string) => {
        if (!confirm("Are you sure? This will delete the user permanently.")) return
        try {
            const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" })
            if (res.ok) setUsers(users.filter(u => u._id !== id))
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
        (r.cuisine || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#FFF9F5]">
            <Navigation />

            <div className="container mx-auto px-6 pt-32 pb-12 text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-serif text-[#F27438] font-bold mb-6">
                        Admin Dashboard
                    </h1>

                    <div className="flex justify-center md:justify-start mb-12">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="inline-block">
                            <TabsList className="bg-white/80 p-1 rounded-full border border-orange-100 shadow-sm flex items-center h-auto">
                                <TabsTrigger
                                    value="users"
                                    className="data-[state=active]:bg-[#FEF0E6] data-[state=active]:text-[#F27438] px-6 py-2.5 rounded-full transition-all flex items-center gap-2 font-semibold text-slate-500 text-sm"
                                >
                                    <Users className="w-4 h-4" /> User Management
                                </TabsTrigger>
                                <TabsTrigger
                                    value="manage"
                                    className="data-[state=active]:bg-[#FEF0E6] data-[state=active]:text-[#F27438] px-6 py-2.5 rounded-full transition-all flex items-center gap-2 font-semibold text-slate-500 text-sm"
                                >
                                    <ChefHat className="w-4 h-4" /> Manage Recipes
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-sm border border-orange-50"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 pb-6 border-b border-orange-50">
                                    <h2 className="text-xl font-bold text-slate-800">User Network</h2>
                                    <div className="text-[10px] font-bold text-orange-400 bg-orange-50/50 px-3 py-1 rounded-full uppercase tracking-widest shrink-0">
                                        Total: {users.length}
                                    </div>
                                </div>

                                <div className="overflow-x-auto -mx-2 sm:mx-0 pb-4">
                                    <table className="w-full text-left min-w-[700px]">
                                        <thead>
                                            <tr className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-widest border-b border-orange-50">
                                                <th className="py-4 px-2 sm:px-4 font-bold">User</th>
                                                <th className="py-4 px-2 sm:px-4 font-bold">Email</th>
                                                <th className="py-4 px-2 sm:px-4 font-bold">Role</th>
                                                <th className="py-4 px-2 sm:px-4 font-bold text-right">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-orange-50/50">
                                            {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                                                <tr key={u._id} className="hover:bg-[#FFF9F5]/50 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar className="w-10 h-10 shadow-sm border border-orange-100">
                                                                {u.image && <AvatarImage src={u.image} alt={u.name} />}
                                                                <AvatarFallback className={`${getAvatarColor(u.name || u.email)} text-white font-bold text-base`}>
                                                                    {(u.name || u.email || "?").charAt(0).toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="font-bold text-slate-700 text-base">{u.name || "App User"}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-slate-500 font-medium text-sm">{u.email}</td>
                                                    <td className="py-4 px-4">
                                                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
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
                                                                className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                            >
                                                                <Trash className="w-5 h-5" />
                                                            </Button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr><td colSpan={4} className="py-20 text-center text-slate-400 italic font-medium">No users found in database</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="recipes-tab"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-[1.5rem] p-6 md:p-8 shadow-sm border border-orange-50"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 pb-6 border-b border-orange-50">
                                    <h2 className="text-xl font-bold text-slate-800">Recipe Catalog</h2>
                                    <div className="text-[10px] font-bold text-[#F27438] bg-orange-50 px-3 py-1 rounded-full uppercase tracking-widest shrink-0">
                                        Total Items: {recipes.length}
                                    </div>
                                </div>
                                <div className="overflow-x-auto -mx-2 sm:mx-0 pb-4">
                                    <table className="w-full text-left min-w-[500px]">
                                        <thead>
                                            <tr className="text-slate-400 text-[10px] sm:text-xs uppercase tracking-widest border-b border-orange-50">
                                                <th className="py-4 px-2 sm:px-4 font-bold">Image</th>
                                                <th className="py-4 px-2 sm:px-4 font-bold">Name & Translation</th>
                                                <th className="py-4 px-2 sm:px-4 font-bold text-right">Management</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-orange-50/50">
                                            {filteredRecipes.map((r) => (
                                                <tr key={r.id} className="hover:bg-[#FFF9F5]/30 transition-colors group">
                                                    <td className="py-4 px-4">
                                                        <div className="relative w-16 h-16 rounded-[1rem] overflow-hidden shadow-sm">
                                                            <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-bold text-slate-800 text-lg group-hover:text-[#F27438] transition-colors">{r.name}</div>
                                                        <div className="text-xs text-slate-400 font-medium mt-1">{r.nameHindi}</div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRecipe(r.id)} className="text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-full transition-all h-8 w-8">
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
