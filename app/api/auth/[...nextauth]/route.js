
import mongoose from 'mongoose'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import User from '@/models/user.model'
import PaymentModel from '@/models/Payment.model'

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github") {
                const client = await mongoose.connect()

                const currentUser = User.findOne({ email })
                if (!currentUser) {
                    const newUser = new User({
                        email: email,
                        username: email.split("@")[0],
                    })
                    await newUser.save()
                    user.name = newUser.username
                } else {
                    user.name = newUser.username
                }
            }
        }
    }
})

export { authoptions as GET, authoptions as POST } 