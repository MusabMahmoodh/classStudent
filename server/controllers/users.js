import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/student.js";
import Teacher from "../models/teacher.js";

const router = express.Router();
export const studentLogin = async (req, res) => {
  const { indexNo, password } = req.body;
  console.log(indexNo, password);
  // Simple validation
  if (!indexNo || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const student = await Student.findOne({ indexNo });
    if (!student) throw Error("Student does not exist");

    if (await bcrypt.compare(req.body.password, student.password)) {
      const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
        expiresIn: "2 days",
      });
      if (!token) throw Error("Couldnt sign the token");
      res.status(200).json({
        token,
        user: {
          id: student._id,
        },
      });
    } else {
      throw Error("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};
export const teacherLogin = async (req, res) => {
  const { name, password } = req.body;

  // Simple validation
  if (!name || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check for existing user
    const teacher = await Teacher.findOne({ name });
    if (!teacher) throw Error("teacher does not exist");

    // if (await bcrypt.compare(req.body.password, teacher.password)) {
    if ((req.body.password, teacher.password)) {
      // res.send("Success");
      const token = jwt.sign({ id: teacher._id }, process.env.JWT_SECRET, {
        expiresIn: "2 days",
      });
      if (!token) throw Error("Couldnt sign the token");
      res.status(200).json({
        token,
        teacher: {
          id: teacher._id,
        },
      });
    } else {
      throw Error("Invalid credentials");
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
};
export const tokenValidate = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await Student.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const tokenValidateTemp = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await Teacher.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export default router;
