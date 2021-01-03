import express from "express";
import mongoose from "mongoose";

import Subscription from "../models/subscription.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

const router = express.Router();

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ teacher: req.user.id })
      .select("name")
      .populate({
        path: "batch",
        select: "name",
      })
      .exec();

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAllSubscriptionsForStudent = async (req, res) => {
  try {
    const subscriptions = await Student.find({ _id: req.user.id })
      .select("name -_id")
      .populate({
        path: "subscriptions",
        select: "name",
      })
      .exec();

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id)
      .select("name")
      .populate({
        path: "students",
        select: "name indexNo",
      })
      .exec();

    res.status(200).json(subscription);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSubscription = async (req, res) => {
  const { name, batch } = req.body;
  // console.log(req.user, req.body);

  const newSubscription = new Subscription({
    name,
    batch,
    teacher: req.user.id,
  });

  try {
    // console.log(newSubscription);
    const newSub = await newSubscription.save();

    const upTea = await Teacher.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          subscriptions: newSub._id,
        },
      },
      {
        new: true,
      }
    ).exec();
    console.log(upTea);
    res.status(201).json(newSubscription);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { name, batch, essayExams, students } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No subscription with id: ${id}`);

  const updatedSubscription = { name, batch, essayExams, students };

  await Subscription.findByIdAndUpdate(id, updatedSubscription, {
    new: true,
  });

  res.json(updatedSubscription);
};
export const updateSubscribers = async (req, res) => {
  const { id } = req.params;
  const { stu_id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student with id: ${id}`);
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      {
        $push: {
          students: stu_id,
        },
      },
      {
        new: true,
      }
    ).exec();
    const updatedStudent = await Student.findByIdAndUpdate(
      stu_id,
      {
        $push: {
          subscriptions: id,
        },
      },
      {
        new: true,
      }
    ).exec();
    // console.log(updatedSubscription);
    res.status(204).json(updatedSubscription);
  } catch (error) {
    console.log(error);
  }
};
export const removeSubscribers = async (req, res) => {
  const { id } = req.params;
  const { stu_id } = req.body.stu_id;
  // console.log(stu_id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No student with id: ${id}`);
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      {
        $pull: {
          students: stu_id,
        },
      },
      {
        new: true,
      }
    ).exec();
    console.log(updatedSubscription);
    res.status(204).json(updatedSubscription);
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Subscription.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const getSubscriptionSubscribers = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No subscription with id: ${id}`);

  const students = await PostMessage.findById(id, "students").exec();

  res.json(students);
};

export default router;
