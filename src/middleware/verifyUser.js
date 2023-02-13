import User from "../models/userModel.js";

export const VerifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({
      message: "Unauthorized, please login first",
    });
    return;
  }

  const user = await User.findById(req.session.userId);

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  req.userId = user.id;
  next();
};
