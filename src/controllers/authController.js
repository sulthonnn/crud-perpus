import User from "../models/userModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.status(401).json({
      message: "Email not found",
    });
    return;
  }

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) {
    res.status(401).json({
      message: "Invalid password",
    });
    return;
  }

  req.session.userId = user.id;
  const id = user.id;
  const username = user.username;
  const email = user.email;
  res.status(200).json({
    id,
    username,
    email,
    message: "Login successfully",
  });
};

export const Me = async (req, res) => {
  const user = await User.findOne({ username }).select(["-password"]).exec();

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  await req.session.destroy((err) => {
    if (err) {
      res.status(400).json({
        message: "Logout failed",
      });
      return;
    }
  });

  res.status(200).json({
    message: "Logout successfully",
  });
};
