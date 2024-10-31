import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/refresh-token`,
      {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: token.refreshToken,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    const newAccessToken = data.data

    return {
      ...token,
      accessToken: newAccessToken.access_token,
      accessTokenExpires: Date.now() + 30 * 60 * 1000, // 30 minutes
      refreshToken: token.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      async authorize(credentials) {
        const name = credentials && credentials.username
        const password = credentials && credentials.password
        const res = await fetch(`${process.env.BACKEND_URL}/api/Auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: name,
            password: password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json()

        if (data.success === true) {
          // const user = { id: "1", name: "J Smith", email: "jsmith@example.com", token: "token" };
          // Any object returned will be saved in `user` property of the JWT
          return data.data
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
    GoogleProvider({
      id: 'google',
      name: 'Google',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      if (account && account.provider === 'google') {
        token = Object.assign({}, token, {
          id_token: account.id_token,
        })

        token = Object.assign({}, token, {
          provider: 'google',
        })

        token = Object.assign({}, token, {
          user: Object.assign({}, token.user, {
            ...user,
          }),
        })
      } else if (account && account.provider === 'credentials') {
        const accessToken = user.access_token
        const refreshToken = user.refresh_token

        const userInfo = user.user

        //expire in 30 minutes
        const accessTokenExpires = Date.now() + 29 * 60 * 1000

        token = Object.assign({}, token, {
          provider: 'credentials',
        })

        token = Object.assign({}, token, {
          accessToken: accessToken,
        })

        token = Object.assign({}, token, {
          refreshToken: refreshToken,
        })

        token = Object.assign({}, token, {
          accessTokenExpires: accessTokenExpires,
        })

        token = Object.assign({}, token, {
          user: userInfo,
        })
      }

      if (token && Date.now() > (token.accessTokenExpires as number)) {
        token = await refreshAccessToken(token)
      }

      if (trigger === 'update' && session.image) {
        token = Object.assign({}, token, {
          user: Object.assign({}, token.user, {
            image: session.image,
          }),
        })
      }

      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          id_token: token.id_token,
        })
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
        })
        session = Object.assign({}, session, {
          refreshToken: token.refreshToken,
        })
        session = Object.assign({}, session, {
          accessTokenExpires: token.accessTokenExpires,
        })

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
