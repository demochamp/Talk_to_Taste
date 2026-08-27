import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import clientPromise from "@/lib/db"
import { sendAdminNotification } from "@/lib/mail"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "talktotaste_secret_key_generated_by_antigravity_12345",
    session: { strategy: "jwt" },
    providers: [
        ...authConfig.providers,
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = (credentials.email as string).toLowerCase().trim();
                const password = credentials.password as string;

                try {
                    const client = await Promise.race([
                        clientPromise,
                        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Database connection timeout")), 4000))
                    ]);
                    
                    if (client) {
                        const db = client.db();
                        const user = await db.collection("users").findOne({ email });

                        if (user && user.password) {
                            const passwordsMatch = await bcrypt.compare(password, user.password);
                            if (passwordsMatch) {
                                sendAdminNotification(email, 'Manual Login').catch(err => console.error("Admin notification failed:", err));
                                return {
                                    id: user._id.toString(),
                                    name: user.name || email.split('@')[0],
                                    email: user.email,
                                    role: user.role || (email === "choudharykhushi499@gmail.com" ? 'admin' : 'user'),
                                    image: user.image || null
                                };
                            }
                        }
                    }
                } catch (error) {
                    console.warn("[Auth] Database check failed, checking fallback:", error);
                }

                return null;
            }
        })
    ]
})

