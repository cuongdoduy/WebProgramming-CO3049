import 'next-auth'

declare module 'next-auth' {
  interface User {
    provider?: string
    data?: {
      email?: string
      id?: number
      role?: string
      token?: string
      cart_id?: number
    }
  }
  interface Session {
    provider?: string
    error?: string
    user?: {
      email?: string
      id?: number
      role?: string
      token?: string
      cart_id?: number
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's role */
    user: {
      email?: string
      id?: string
      role?: string
      token?: string
    }
  }
}
