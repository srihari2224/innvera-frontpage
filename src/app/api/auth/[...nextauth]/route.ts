import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const ADMIN_EMAILS = ["msrihari2224@gmail.com"]
const KIOSK_BACKEND = "https://kiosk-backend-t1mi.onrender.com"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "kiosk-credentials",
      name: "Kiosk Login",
      credentials: {
        username: { label: "Kiosk ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        try {
          const res = await fetch(`${KIOSK_BACKEND}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          })
          const data = await res.json()
          if (!res.ok || !data.success) return null
          return {
            id: data.kioskId,
            name: data.username,
            email: null,
            kioskId: data.kioskId,
            role: "owner",
            token: data.token,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google sign-in: allow anyone to sign in (role check happens client-side)
      if (account?.provider === "google") return true
      // For credentials: always allowed if authorize returned a user
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || null
        token.kioskId = (user as any).kioskId || null
        token.backendToken = (user as any).token || null
      }
      if (account?.provider === "google" && token.email) {
        if (ADMIN_EMAILS.includes(token.email as string)) {
          token.role = "admin"
        } else {
          token.role = "google-user"
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).kioskId = token.kioskId
        ;(session.user as any).backendToken = token.backendToken
      }
      return session
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
