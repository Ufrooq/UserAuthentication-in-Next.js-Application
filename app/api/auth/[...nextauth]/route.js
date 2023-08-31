import userModel from "@/models/usersModel";
import { dbConnection } from "@/utils/dbConnection";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcrypt";

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(email);
        try {
          await dbConnection();
          const user = await userModel.findOne({ email });
          // if password does'nt matches or user is'nt find returning null!!
          if (!user) {
            return null;
          }
          const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            return null;
          }
          // if password matches returning user!!
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: process.env.NEXTAUTH_URL,
  },
});

export { authHandler as POST, authHandler as GET };
