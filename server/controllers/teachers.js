import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Teacher from "../models/teacher.js";

const router = express.Router();

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("batch").exec();

    res.status(200).json(teachers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTeacherToken = async (req, res) => {
  // console.log("here");
  const token = req.header("x-auth-token");
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(verified);
  try {
    const teacher = await Teacher.findById(verified.id).exec();

    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTeacherById = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await Teacher.findById(id);

    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  const { name, indexNo, password } = req.body;

  const newTeacher = new Teacher({
    name,
    password,
  });

  try {
    await newTeacher.save();

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, indexNo, password, scores, subscriptions } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Teacher with id: ${id}`);

  const updatedTeacher = { name, password, students, subscriptions };

  await Teacher.findByIdAndUpdate(id, updatedTeacher, { new: true });

  res.json(updatedTeacher);
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Teacher with id: ${id}`);

  await Teacher.findByIdAndRemove(id);

  res.json({ message: "Teacher deleted successfully." });
};
export default router;
