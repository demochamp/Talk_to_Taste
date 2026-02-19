import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { sendAdminNotification } from "@/lib/mail"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(clientPromise),
    session: { strategy: "jwt" },
    providers: [
        ...authConfig.providers, // Keep Google/GitHub from config
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const email = credentials.email as string;
                const password = credentials.password as string;

                try {
                    const client = await clientPromise;
                    const db = client.db();
                    const user = await db.collection("users").findOne({ email });

                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        // Notify Admin of successful manual login
                        // Fire and forget (don't await to speed up login)
                        sendAdminNotification(email, 'Manual Login').catch(err => console.error("Admin notification failed:", err));

                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            image: user.image
                        };
                    }
                } catch (error) {
                    console.error("Auth error:", error);
                }
                return null;
            }
        })
    ]
})
