// mongopassword = D6OqOuaZX0Br2ENc
// user =jindalkashish873
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("mongo connected");
  } catch (error) {
    console.log("error is", error);
  }
};

export default connectDB;
