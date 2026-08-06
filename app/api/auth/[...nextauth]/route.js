import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import User from '@/models/User.model'
import connectDB from '@/db/connectDB'

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider == "github") {
                await connectDB()
                const currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    await newUser.save()
                }
                return true
            }
        },
        async session({ session }) {
            await connectDB()
            const dbUser = await User.findOne({ email: session.user.email })
            if (dbUser) {
                session.user.name = dbUser.username
            }
            return session
        }
    }
})

export { authoptions as GET, authoptions as POST } 