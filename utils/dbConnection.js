import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    });
    console.log("connected to DB -->");
  } catch (error) {
    console.log(error);
  }
};
