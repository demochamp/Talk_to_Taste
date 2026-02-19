import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

console.log("Auth Config Loaded");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "Set" : "Not Set");
console.log("GITHUB_ID:", process.env.GITHUB_ID ? "Set" : "Not Set");
console.log("GITHUB_ID Value (First 4 chars):", process.env.GITHUB_ID?.substring(0, 4));


export const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
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
                return false; // Redirect to default signIn page (which we might need to handle if we redirected /login... wait)
                // If we redirect /login to /, where does next-auth send unauth users? 
                // It sends to pages.signIn. We set pages.signIn = '/login'.
                // So untouhenticated admin access -> /login -> /. 
                // This effectively blocks admin logic from showing login page too. 
                // But the user wants a MODAL. 
                // Constructive ambiguity: For admin, maybe we should allow /login? 
                // "The route /login must not show a standalone page". 
                // Ok, we will let admin users be redirected to home, where they can click login to open modal, then go to admin.
            }

            // 3. Allow everything else (Home, Bot, Recipes)
            return true;
        },
        async session({ session, token }) {
            // Keep the session callback logic we had, but adapted for JWT flow if needed
            // Note: In edge middleware, we rely on the token mainly.
            // But sessions are handled in auth.ts with database adapter.

            // We need to re-implement the role check on the JWT callback if we want it in middleware
            // OR keep it simple here and let auth.ts handle the full session enrichment.

            // For now, copying the logic from previous auth.ts to keep consistency across both checks
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
            // Initial sign in
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    session: { strategy: "jwt" }, // Required for Edge compatibility if using middleware to protect routes
} satisfies NextAuthConfig
