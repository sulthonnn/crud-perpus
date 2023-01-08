import Member from "../models/memberModel.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.status(200).json(members);
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

  try {
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

  if (!body || !id) {
    res.status(404).json({
      status: 404,
      message: "Member not found",
    });
    return;
  }

  const updatedMember = await Member.findByIdAndUpdate({ _id: id }, body);

  if (!updatedMember) {
    res.status(501).json({
      status: 501,
      message: "Edit member failed. Not implemented",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Member updated successfully",
    data: updatedMember,
  });
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
};
