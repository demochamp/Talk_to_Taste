import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/db"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { sendAdminNotification } from "@/lib/mail"

console.log("Initializing NextAuth with secret:", process.env.AUTH_SECRET ? "Present" : "Missing");

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
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
                    console.warn("[Auth] Missing credentials");
                    return null;
                }

                const email = (credentials.email as string).toLowerCase().trim();
                const password = credentials.password as string;

                try {
                    const client = await clientPromise;
                    const db = client.db();
                    const user = await db.collection("users").findOne({ email });

                    if (!user) {
                        console.warn(`[Auth] User not found: ${email}`);
                        return null;
                    }

                    if (!user.password) {
                        console.warn(`[Auth] User exists but has no password (likely social login): ${email}`);
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        console.log(`[Auth] Manual login successful for: ${email}`);
                        // Notify Admin of successful manual login
                        sendAdminNotification(email, 'Manual Login').catch(err => console.error("Admin notification failed:", err));

                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role || 'user',
                            image: user.image
                        };
                    } else {
                        console.warn(`[Auth] Password mismatch for: ${email}`);
                    }
                } catch (error) {
                    console.error("[Auth] Critical error:", error);
                }
                return null;
            }
        })
    ]
})
