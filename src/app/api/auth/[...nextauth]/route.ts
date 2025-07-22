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

          // Debug: Log incoming login attempt
          console.log("\n=== [NEXTAUTH LOGIN ATTEMPT] ===");
          console.log("Login email:", credentials?.email);
          console.log("Login password:", credentials?.password);

          if (!credentials?.email || !credentials?.password) {
            console.log("Email or password missing");
            throw new Error("Email and password are required");
          }

          // Always lowercase for consistency
          const user = await User.findOne({ email: credentials.email.toLowerCase() })
            .select("+password");

          console.log("User from DB:", user ? user.email : "NOT FOUND");

          if (!user) {
            console.log("No user found");
            throw new Error("No user found");
          }
          if (!user.isVerified) {
            console.log("User not verified");
            throw new Error("Please verify your email first");
          }
          if (!user.password) {
            console.log("No password found in user doc!");
            throw new Error("Invalid user data");
          }

          // Print hashed password and input password for troubleshooting
          console.log("Hashed password from DB:", user.password);
          console.log("Password (input)      :", credentials.password);

          const isValid = await bcrypt.compare(credentials.password, user.password);

          console.log("Password match result :", isValid);

          if (!isValid) {
            console.log("Invalid credentials");
            throw new Error("Invalid credentials");
          }

          console.log("Login successful for  :", user.email);
          console.log("=== [END LOGIN ATTEMPT] ===\n");

          return {
            id: user.id.toString(),
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
    signIn: "/auth/login",   // Use your actual login page route
    error: "/auth/login",    // Same for error page (or customize as needed)
  },
  debug: true, // Set to false in production
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
