import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnection } from "@/utils/dbConnection";
import userModel from "@/models/usersModel";

const handleErrors = (errMess) => {
  let errorsObj = { fullname: "", email: "", password: "" };
  // duplicate email validation
  if (errMess.code === 11000) {
    errorsObj.email = "This email already exists !!";
    return errorsObj;
  }
  // Error validation
  if (errMess.message.includes("user validation failed")) {
    Object.values(errMess.errors).forEach(({ properties }) => {
      errorsObj[properties.path] = properties.message;
    });
  }
  return errorsObj;
};
export const POST = async (req) => {
  try {
    const { fullname, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnection();
    await userModel.create({ fullname, email, password: hashedPassword });
    return NextResponse.json(
      {
        message: "user registered successfully !",
      },
      { status: 200 }
    );
  } catch (error) {
    const formattedErrorMessage = handleErrors(error);
    return NextResponse.json(
      {
        formattedErrorMessage,
      },
      { status: 500 }
    );
  }
};
