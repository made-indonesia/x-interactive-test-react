import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import {users} from "@/lib/users";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        const user = users.find(u => u.email === credentials?.email);
        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return {id: user.id, email: user.email};
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({token, user}) {
      if (user) token.id = user.id;
      console.log("email");
      return token;
    },
    async session({session, token}) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};
