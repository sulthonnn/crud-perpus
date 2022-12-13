import LogBook from "../models/logModel.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await LogBook.find().sort({ returnDate: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const addLog = async (req, res) => {
  const logBook = new LogBook(req.body);

  if (!logBook) {
    res.status(401).json({
      status: 401,
      message: "Validation error. Required bookId and memberId",
    });
    return;
  }

  const newLog = await logBook.save();
  res.status(201).json({
    status: 201,
    message: "Log added successfully",
    data: newLog,
  });
};
