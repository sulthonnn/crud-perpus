import Member from "../models/memberModel.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({name: 1})
    return res.status(200).json({members})
  } catch (error) {
  console.log(error);    
  }
}

export const getPaginatedMembers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  const offset = page * limit;

  const totalRows = await Member.count({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ],
  })
    .sort({ name: 1 })
    .exec();

  const totalPages = Math.ceil(totalRows / limit);

  try {
    const members = await Member.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    })
      .limit(limit)
      .skip(offset)
      .sort({ name: 1 })
      .exec();
    res.status(200).json({ page, totalRows, totalPages, members });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    res.status(200).json(member);
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Member not found",
    });
  }
};

export const addMember = async (req, res) => {
  const member = new Member(req.body);
  const members = await Member.find();

  const id = members.map((id) => {
    return id._id;
  });

  try {
    if (
      !member._id ||
      !member.name ||
      !member.gender ||
      !member.address ||
      !member.email ||
      !member.phone
    ) {
      res.status(401).json({
        status: 401,
        message:
          "Validation error: Member validation failed. Required id, name, gender, address, email, and phone",
      });
      return;
    }

    if (id.includes(member._id)) {
      res.status(400).json({
        status: 400,
        message: "Member already exists",
      });

      return;
    }

    const newMember = await member.save();
    res.status(201).json({
      status: 201,
      message: "Member added successfully",
      data: newMember,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMember = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  try {
    const updatedMember = await Member.findByIdAndUpdate({ _id: id }, body);

    if (!body || !id) {
      res.status(404).json({
        status: 404,
        message: "Member not found",
      });
      return;
    }

    if (!updatedMember) {
      res.status(501).json({
        status: 501,
        message: "Edit member failed. Not implemented",
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMember = async (req, res) => {
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

  try {
    const deletedMember = await Member.findByIdAndRemove(id);

    if (!deletedMember) {
      res.status(501).json({
        status: 501,
        message: "Remove member failed. Not implemented",
      });

      return;
    }

    res.status(200).json({
      message: "Success deleted member",
      data: deletedMember,
    });
  } catch (error) {
    console.log(error);
  }
};
