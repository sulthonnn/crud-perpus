import argon2 from "argon2";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || "";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await User.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  try {
    results.users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ username: -1 })
      .select(["-password"])
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select(["-password"])
      .exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
};

export const addUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    res.status(401).json({
      status: 401,
      message:
        "Validation error: User validation failed. Required username, email, password, and confirm password",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(401).json({
      status: 401,
      message:
        "Validation error: User validation failed. Passwords do not match",
    });
    return;
  }
  const hashPassword = await argon2.hash(password);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    status: 201,
    message: "User saved successfully",
    data: newUser,
  });
};

export const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { username, email, password, confirmPassword },
  } = req;

  if (!id) {
    res.status(404).json({
      status: 404,
      message: "User not found",
    });
    return;
  }

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = req.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confirmPassword) {
    res.status(401).json({
      status: 401,
      message:
        "Validation error: User validation failed. Passwords do not match",
    });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      username,
      email,
      password: hashPassword,
    }
  );

  if (!updatedUser) {
    res.status(501).json({
      status: 501,
      message: "Update User failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    status: 200,
    message: "User updated successfully",
    data: updatedUser,
  });
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(401).json({
      status: 401,
      message: "Validation error: Params _id is not defined",
    });
    return;
  }

  const deletedUser = await User.findByIdAndRemove(id);

  if (!deletedUser) {
    res.status(501).json({
      status: 501,
      message: "Remove User failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "Success deleted User",
    data: deletedUser,
  });
};
