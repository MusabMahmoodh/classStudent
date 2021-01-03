import express from "express";

import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/students.js";
import {
  getAllBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
} from "../controllers/batch.js";
import {
  getAllSubscriptions,
  getSubscriptionById,
  getSubscriptionSubscribers,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  updateSubscribers,
  removeSubscribers,
} from "../controllers/subscriptions.js";
import {
  getAllexams_essay,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from "../controllers/exams.js";
import { teacherLogin, tokenValidateTemp } from "../controllers/users.js";
import { getTeacherToken } from "../controllers/teachers.js";
import auth from "../middlewear/auth.js";
const router = express.Router();

// router.get("/", getDashboard);

router.post("/", teacherLogin);
router.post("/validateToken", tokenValidateTemp);

router.get("/teacher", getTeacherToken);
router.get("/students", auth, getAllStudents);
router.get("/students/:id", auth, getStudentById);
router.post("/students", auth, createStudent);
router.put("/students/:id", auth, updateStudent);
router.delete("/students/:id", auth, deleteStudent);

router.get("/batches", auth, getAllBatches);
router.get("/batches/:id", getBatchById);
router.post("/batches", auth, createBatch);
router.put("/batches/:id", updateBatch);
router.delete("/batches/:id", deleteBatch);

router.get("/subscriptions", auth, getAllSubscriptions);
router.get("/subscriptions/:id", auth, getSubscriptionById);
router.get("/subscriptions/:id/subscribers", auth, getSubscriptionSubscribers);
router.post("/subscriptions", auth, createSubscription);
router.post("/subscriptions/:id", updateSubscription);
router.put("/subscriptions/:id/subscribers", auth, updateSubscribers); //add new student
router.delete("/subscriptions/:id/subscribers", auth, removeSubscribers); //add new student
router.delete("/subscriptions/:id", auth, deleteSubscription);

router.get("/exams_essay", getAllexams_essay);
router.get("/exams_essay/:id", auth, getExamById);
router.post("/exams_essay", auth, createExam);
router.put("/exams_essay/:id", updateExam);
router.delete("/exams_essay/:id", deleteExam);

export default router;
