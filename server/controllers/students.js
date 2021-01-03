import express from "express";
import mongoose from "mongoose";

import Student from "../models/student.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select("name indexNo")
      .populate({
        path: "batch",
        select: "name -_id",
      })
      .exec();
    // console.log(students[0]);
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getStudentToken = async (req, res) => {
  // console.log("here");
  const token = req.header("x-auth-token");
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(verified);
  try {
    const student = await Student.findById(verified.id).exec();

    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id)
      .select("name indexNo")
      .populate({
        path: "batch",
        select: "name -_id",
      })
      .populate({
        path: "scores",
        populate: {
          path: "exam",
          model: "essayExam",
        },

        match: { teacher: req.user.id },
        select: "score timeTaken  -_id",
      })
      .exec();

    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  // console.log(req.user, req.body);
  const { name, indexNo, password, batch } = req.body;
  const student = await Student.findOne({ indexNo });
  if (student) throw Error("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newStudent = new Student({
    name,
    indexNo,
    password: hashedPassword,
    batch,
  });

  console.log(newStudent);
  try {
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, indexNo, password, scores, subscriptions } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student with id: ${id}`);
  var updatedStudent;
  if (password === "" || password === null) {
    updatedStudent = { name, indexNo };
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedStudent = { name, indexNo, password: hashedPassword };
  }
  // console.log(updatedStudent);
  await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

  res.json(updatedStudent);
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student with id: ${id}`);

  await Student.findByIdAndRemove(id);

  res.json({ message: "Student deleted successfully." });
};
export default router;
