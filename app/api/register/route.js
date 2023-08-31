import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnection } from "@/utils/dbConnection";
import userModel from "@/models/usersModel";

export const POST = async (req) => {
  try {
    const { fullname, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 20);
    await dbConnection();
    await userModel.create({ fullname, email, hashedPassword });
    return NextResponse.json(
      {
        message: "user registered successfully !",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};
