import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../Utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = await req.body;

    //check if user exist
    const user = await User.findOne({ email });

    if (user) next(errorHandler(401, "User have already existed"));

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();

    const { password: pass, ...rest } = newUser._doc;

    return res.status(200).json({ success: true, rest });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = await req.body;
    //check if user exist
    const user = await User.findOne({ email });
    if (!user) next(errorHandler(401, "User do not exist"));

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword)
      next(errorHandler(401, "Password wrong. Please try again"));

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.Token_Secret,
      { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = user._doc;


    return res
      .cookie("access_token", token)
      .status(200)
      .json({ success: true, user:rest });
  } catch (error) {
    console.log(error);
  }
};



export const logout = async (req, res, next) => {
  try {
    


    return res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.log(error);
  }
};