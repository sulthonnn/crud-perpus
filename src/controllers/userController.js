import argon2 from "argon2";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginatedUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const offset = page * limit;

  const totalRows = await User.count({
    $or: [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  })
    .sort({ username: 1 })
    .exec();

  const totalPages = Math.ceil(totalRows / limit);

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(offset)
      .sort({ username: 1 })
      .select(["-password"])
      .exec();
    res.status(200).json({ page, totalRows, totalPages, users });
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
    res.status(400).json({
      status: 400,
      message:
        "Validation error: User validation failed. Required username, email, password, and confirm password",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      status: 400,
      message:
        "Validation error: User validation failed. Passwords do not match",
    });
    return;
  }

  const hashPassword = await argon2.hash(password);

  try {
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      status: 201,
      message: "User saved successfully",
    });
  } catch (error) {
    console.log(error);
  }
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
    res.status(400).json({
      status: 400,
      message:
        "Validation error: User validation failed. Passwords do not match",
    });
    return;
  }

  try {
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
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(400).json({
      status: 400,
      message: "Validation error: Params _id is not defined",
    });
    return;
  }

  try {
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
  } catch (error) {
    console.log(error);
  }
};
