import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser, login } from '../../../util/API';

const AuthOptions = (req, res) => ({
  providers: [
    CredentialsProvider({
      // name: 'Email',
      authorize: async (credentials) => {
        const result = await login(credentials);
        if (result.error) throw new Error(result.error || 'User not found!');
        const { data, cookies } = result;
        res.setHeader('Set-Cookie', cookies);
        if (data.status === 'success')
          return { ...data.user, token: data.token };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token.user;
      session.accessToken = token.accessToken;

      if (token?.user?._id) {
        const data = await getUser(token.user._id);
        if (data?.status === 'success') {
          session.user = data.user;
          token.user = data.user;
        }
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});

export default (req, res) => NextAuth(req, res, AuthOptions(req, res));
