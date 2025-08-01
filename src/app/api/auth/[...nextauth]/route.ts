/*import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserFromDatabase } from '../../../../../utils/database'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Replace this with your actual database call
        const user = await getUserFromDatabase(credentials?.email!, credentials?.password!)
        return user
      }
    })
],
  // ... rest of config
})*/
/*if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.username, // ← Add username here
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add username to token
      if (user) {
        token.username = user.name // username is stored in name field
      }
      return token
    },
    async session({ session, token }) {
      // Add username to session
      session.user.username = token.username
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST } */

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserFromDatabase } from '../../../../../utils/database'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call your database function
          const user = await getUserFromDatabase(credentials.email, credentials.password)
          
          if (user) {
            return {
              id: user.id.toString(),
              email: user.email,
              username: user.full_name,
            }
          }
          
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string
        session.user.id = token.userId as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }