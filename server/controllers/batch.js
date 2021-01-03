import express from "express";
import mongoose from "mongoose";

import Batch from "../models/batch.js";

const router = express.Router();

export const getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find().exec();

    res.status(200).json(batches);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBatchById = async (req, res) => {
  const { id } = req.params;

  try {
    const batch = await Batch.findById(id);

    res.status(200).json(batch);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBatch = async (req, res) => {
  const { name } = req.body;

  const newBatch = new Batch({
    name,
  });

  try {
    await newBatch.save();

    res.status(201).json(newBatch);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Not implemented
export const updateBatch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Batch with id: ${id}`);

  const updatedBatch = { name };

  await Batch.findByIdAndUpdate(id, updatedBatch, { new: true });

  res.json(updatedBatch);
};
//not implemented
export const deleteBatch = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Batch with id: ${id}`);

  await Batch.findByIdAndRemove(id);

  res.json({ message: "Batch deleted successfully." });
};
export default router;
