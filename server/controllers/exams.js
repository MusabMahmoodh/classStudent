import express from "express";
import mongoose from "mongoose";

import EssayExam from "../models/essayExam.js";
import Score from "../models/scores.js";
import FileUpload from "../models/fileUpload.js";
import Subscription from "../models/subscription.js";

const router = express.Router();

export const getAllexams_essay = async (req, res) => {
  try {
    const essayExams = await EssayExam.find()
      .select("name")
      .populate("batch subscription")
      .exec();
    res.status(200).json(essayExams);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getExamById = async (req, res) => {
  const { id } = req.params;

  try {
    const essayExam = await EssayExam.findById(id)
      .populate("question answer batch subscription")
      .exec();

    res.status(200).json(essayExam);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSubscriptionExams = async (req, res) => {
  const { id } = req.params;

  try {
    const essayExam = await EssayExam.find({ subscription: id })
      .select("name start_time end_time description interval type")
      .exec();

    res.status(200).json(essayExam);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createExam = async (req, res) => {
  const {
    batch,
    subscription,
    end_time,
    start_time,
    interval,
    question,
    answer,
    description,
    name,
    type,
  } = req.body;
  // console.log(interval);
  const newQn = new FileUpload({
    filename: question.name,
    contentType: question.type,
    imageBase64: question.base64,
  });
  var newAnswer;
  if (answer.filename !== "" || answer.filename !== undefined) {
    newAnswer = new FileUpload({
      filename: answer.name,
      contentType: answer.type,
      imageBase64: answer.base64,
    });
  } else {
    newAnswer = new FileUpload({
      filename: "not found",
      contentType: "not found",
      imageBase64: "not found",
    });
  }

  const newEssayExam = new EssayExam({
    batch,
    subscription,
    end_time,
    start_time,
    interval: [interval],
    question: newQn._id,
    answer: newAnswer._id,
    description,
    name,
    type,
  });

  try {
    await newQn.save();
    await newAnswer.save();
    await newEssayExam.save();
    res.status(201).json({ message: "successfully created" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const examAttemptReq = async (req, res) => {
  const { id } = rq.params;
  try {
    const attempt = await Score.find({ _id: req.user.id, exam: id })
      .select("name start_time")
      .exec();
    if (attempt) {
      res.status(200).json(attempt);
    } else {
      const newAttempt = new Score({
        start_time: new Date(d.getTime() + 40000),
      });
      res.status(404).json(newAttempt);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const submitExam = async (req, res) => {
  const { id } = req.params;
  const { submission } = req.body;

  const newEssaySubmission = new Score({
    submission,
    exam: id,
    student: req.user.id,
  });
  const newSubFile = new FileUpload({
    imageBase64: submission.base64,
  });
  try {
    await newSubFile.save();
    await newEssaySubmission.save();

    res.status(201).json(newEssaySubmission);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateExam = async (req, res) => {
  const { id } = req.params;
  const {
    batch,
    subscription,
    end_time,
    start_time,
    interval,
    question,
    answer,
    description,
    name,
    type,
    // scores,
  } = req.body;
  // console.log(req.body);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    batch,
    subscription,
    end_time,
    start_time,
    interval,
    description,
    name,
    type,
    // scores,
  };

  try {
    const essay = await EssayExam.findById(id)
      .populate("answer question")
      .exec();
    let ipqn = await FileUpload.findByIdAndUpdate(
      essay.answer._id,
      {
        filename: answer.name,
        contentType: answer.type,
        imageBase64: answer.base64,
      },
      {
        new: true,
      }
    );
    // console.log(ipqn);
    await FileUpload.findByIdAndUpdate(
      essay.question._id,
      {
        filename: question.name,
        contentType: question.type,
        imageBase64: question.base64,
      },
      {
        new: true,
      }
    );

    await EssayExam.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(204).json({ message: "successfullyupdated" });
  } catch (err) {
    console.log(err);
    res.status(409).json({ message: "Failed" });
  }
};

export const deleteExam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No exam with id: ${id}`);

  await EssayExam.findByIdAndRemove(id);

  res.json({ message: "Exam deleted successfully." });
};

export default router;
