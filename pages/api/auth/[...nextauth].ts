import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch('https://itinevel-back-lug1ncmym-itinevels-projects.vercel.app/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
      
          // Check for non-JSON response
          if (!res.ok) {
            const text = await res.text();
            console.error('Non-JSON response from backend:', text);
            throw new Error('Backend did not return JSON');
          }
      
          const user = await res.json();
          if (user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
      
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      // On login, set the token with the user's id and roles
      if (user) {
        token.id = user.id;
        token.roles = user.roles;  // Pass roles if available
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user id and roles to the session object
      session.user.id = token.id as string;
      session.user.roles = token.roles as string[];
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect to custom login page
  },
});
