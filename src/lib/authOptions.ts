import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { compare } from "bcryptjs";
import { User } from "@/models/auth/User.model";
import  dbConnect  from "@/lib/db";
import type { Role } from "@/types/common";

interface DBUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  profilePicture?: string;
  isVerified?: boolean;
  password?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ email: credentials.email }).select("+password").lean<DBUser>();
        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // NextAuth requires an `id` field on the returned user
        return {
          id: user._id.toString(),
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture,
          isVerified: user.isVerified,
        };
      },
    }),
    // Add other providers here
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token._id = user._id;
        token.role = user.role;
        token.isVerified = user.isVerified;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.isVerified = token.isVerified;
        session.user.profilePicture = token.profilePicture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
