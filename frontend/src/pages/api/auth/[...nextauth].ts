import NextAuth, { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        const name = credentials && credentials.username
        const password = credentials && credentials.password
        const res = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: name,
            password: password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()
        console.log('data', data)
        if (!!data.data) {
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com", token: "token" };
          // Any object returned will be saved in `user` property of the JWT
          return data.data[0]
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
      credentials: {
        username: { label: 'Username', type: 'text ' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.provider === 'credentials') {
        console.log('account', user)
        const userInfo = user

        token = Object.assign({}, token, {
          provider: 'credentials',
        })

        token = Object.assign({}, token, {
          user: userInfo,
        })
      }

      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          error: token.error,
        })

        session = Object.assign({}, session, {
          provider: token.provider,
        })

        if (token.user) {
          session = Object.assign({}, session, {
            user: token.user,
          })
        }
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
