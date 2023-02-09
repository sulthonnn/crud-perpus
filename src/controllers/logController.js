import Log from "../models/logModel.js";

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ returnDate: -1 });
    return res.status(200).json({ logs });
  } catch (error) {
    console.log(error);
  }
};

export const getPaginatedLogs = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const offset = page * limit;

  const totalRows = await Log.count({
    $in: [
      {
        book: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        member: {
          $or: [
            { id: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
          ],
        },
      },
      { loanDate: { $regex: search, $options: "i" } },
      { returnDate: { $regex: search, $options: "i" } },
    ],
  })
    .sort({ returnDate: -1 })
    .exec();

  const totalPages = Math.ceil(totalRows / limit);

  try {
    const logs = await Log.find({
      $in: [
        {
          book: {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { author: { $regex: search, $options: "i" } },
            ],
          },
        },
        {
          member: {
            $or: [
              { id: { $regex: search, $options: "i" } },
              { name: { $regex: search, $options: "i" } },
            ],
          },
        },
        { loanDate: { $regex: search, $options: "i" } },
        { returnDate: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(offset)
      .sort({ returnDate: -1 })
      .exec();
    res.status(200).json({ page, totalRows, totalPages, logs });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const addLog = async (req, res) => {
  const logBook = new Log(req.body);

  if (!logBook) {
    res.status(400).json({
      status: 400,
      message: "Validation error. Required bookId and memberId",
    });
    return;
  }

  try {
    const newLog = await logBook.save();
    res.status(201).json({
      status: 201,
      message: "Log added successfully",
      data: newLog,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLog = async (req, res) => {
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
  } catch (error) {
    console.log(error);
  }
};
