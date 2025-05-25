import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserSessionProps {
  id: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ? credentials : {};

        const user = await prisma.user.findUnique({
          where: { email: email as string },
        });
        console.log("userrrrrrrrrrrr", user);

        if (!user || user.password !== password) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("JWT Callback - user:", user); // debug
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const user: UserSessionProps = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
      };

      const formatedSession = {
        ...session,
        user: {
          ...user,
        },
      };
      return formatedSession;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
