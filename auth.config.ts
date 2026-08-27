import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

console.log("Auth Config Loaded");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID ? "Set" : "Not Set");
console.log("GITHUB_ID:", process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID || process.env.GITHUB_CLIENT_ID ? "Set" : "Not Set");

const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_ID || "dummy_google_id";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_SECRET || "dummy_google_secret";

const githubId = process.env.GITHUB_ID || process.env.AUTH_GITHUB_ID || process.env.GITHUB_CLIENT_ID || "dummy_github_id";
const githubSecret = process.env.GITHUB_SECRET || process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_CLIENT_SECRET || "dummy_github_secret";

export const authConfig = {
    trustHost: true,
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "talktotaste_secret_key_generated_by_antigravity_12345",
    providers: [
        Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHub({
            clientId: githubId,
            clientSecret: githubSecret,
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: nextUrl }) {
            const isLoggedIn = !!auth?.user;
            const pathname = nextUrl.nextUrl.pathname;

            // 1. Redirect /login to / (User requirement: No standalone login page)
            if (pathname === '/login') {
                return Response.redirect(new URL('/', nextUrl.url));
            }

            // 2. Protect Admin Routes
            if (pathname.startsWith('/admin')) {
                if (isLoggedIn) return true;
                return false;
            }

            // 3. Allow everything else (Home, Bot, Recipes)
            return true;
        },
        async session({ session, token }) {
            if (session.user && token?.sub) {
                session.user.id = token.sub;
            }

            if (session.user && token?.email) {
                // Check for admin email (Basic RBAC)
                if (token.email === "choudharykhushi499@gmail.com") {
                    session.user.role = "admin"
                } else {
                    session.user.role = "user"
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    session: { strategy: "jwt" },
} satisfies NextAuthConfig


