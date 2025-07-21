// src/app/api/auth/[...nextauth]/route.ts
import dbConnect from "@/lib/db";
import { User } from "@/models/auth/User.model";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Document } from "mongoose";

// Extend the User type to include the id field
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

interface IUserDocument extends Document {
  _id: string;
  email: string;
  name: string;
  password?: string;
  isVerified?: boolean;
  // Add other fields from your User model as needed
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

        const user = await User.findOne({ email: credentials.email })
  .select("+password")
  .lean();
          
          if (!user) throw new Error("No user found");
          if (!user.isVerified) throw new Error("Please verify your email first");
          if (!user.password) throw new Error("Invalid user data");
          
          const isValid = await bcrypt.compare(
            credentials.password, 
            user.password
          );
          
          if (!isValid) throw new Error("Invalid credentials");
          
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin", 
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };