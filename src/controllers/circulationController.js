import Circ from "../models/circulationModel.js";

export const getCirculations = async (req, res) => {
  try {
    const circulations = await Circ.find().sort({ loanDate: -1 }).exec();

    res.status(200).json(circulations);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getCirculation = async (req, res) => {
  try {
    const circulation = await Circ.findById(req.params.id);

    res.status(200).json(circulation);
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: "Circulation not found",
    });
  }
};

export const createCirculation = async (req, res) => {
  const circulation = new Circ(req.body);

  if (!circulation.book || !circulation.member || !circulation.loanDate) {
    res.status(401).json({
      status: 401,
      message: "Validation error. Required bookId, memberId, and loanDate",
    });
    return;
  }

  try {
    const newCirculation = await circulation.save();
    res.status(201).json({
      status: 201,
      message: "Circulation added successfully",
      data: newCirculation,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCirculation = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!body || !id) {
    res.status(404).json({
      status: 404,
      message: "Circulation not found",
    });
    return;
  }

  const updatedCirculation = await Circ.findByIdAndUpdate({ _id: id }, body);

  res.status(200).json({
    status: 200,
    message: "Circulation updated successfully",
    data: updatedCirculation,
  });
};

export const deleteCirculation = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  if (!id) {
    res.status(401).json({
      status: 401,
      message: "Validation error: Params _id is not defined",
    });
    return;
  }

  const deletedCirculation = await Circ.findByIdAndRemove(id);

  if (!deletedCirculation) {
    res.status(501).json({
      status: 501,
      message: "Remove circulation failed. Not implemented",
    });

    return;
  }

  res.status(200).json({
    message: "Success deleted circulation",
    data: deletedCirculation,
  });
};
