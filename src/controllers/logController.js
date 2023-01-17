import Log from "../models/logModel.js";

export const getLogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const search = req.query.search || "";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await Log.countDocuments().exec())) {
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
    results.logs = await Log.find({
      $or: [
        { book: { $regex: search, $options: "i" } },
        { member: { $regex: search, $options: "i" } },
        { loanDate: { $regex: search, $options: "i" } },
        { returnDate: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ returnDate: -1 })
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const addLog = async (req, res) => {
  const logBook = new Log(req.body);

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

export const deleteLog = async (req, res) => {
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

  const deletedLog = await Log.findByIdAndRemove(id);

  if (!deletedLog) {
    res.status(501).json({
      status: 501,
      message: "Remove log failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "Success deleted log",
    data: deletedLog,
  });
};
