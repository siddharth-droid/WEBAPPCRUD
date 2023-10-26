const Task = require("../models/taskModel");

const getAllItems = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createItem = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const getItem = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await Task.findOne({ _id: itemID });

  if (!task) {
    return res.status(400).json({ msg: `No Item with id : ${itemID}` });
  }
  res.status(200).json({ task });
};

const updateItem = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: itemID }, req.body);
  if (!task) {
    return res.status(400).json({ msg: `No Item with id : ${itemID}` });
  }
  res.status(200).json({ task });
};

const deleteItem = async (req, res) => {
  const { id: itemID } = req.params;
  const task = await Task.findOneAndDelete({ _id: itemID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
};

module.exports = {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
