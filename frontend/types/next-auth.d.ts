import "next-auth";

declare module "next-auth" {
  interface User {
    access_token?: string;
    refresh_token?: string;
    provider?: string;
    user?: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
      role?: string;
      status?: string;
    }
  }
  interface Session {
    provider?: string;
    error?: string;
    user?: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
      role?: string;
      status?: string;
    }
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** The user's role */
    accessToken: string;
    refreshToken: string;
    user: {
      name: string;
      email: string;
      image: string;
      id: string;
      role: string;
    }
  }
}
