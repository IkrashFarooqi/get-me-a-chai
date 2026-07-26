
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ]
})

export { authoptions as GET, authoptions as POST } 