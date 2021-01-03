import express from "express";
import auth from "../middlewear/auth.js";
import { getAllSubscriptionsForStudent } from "../controllers/subscriptions.js";
import {
  examAttemptReq,
  getExamById,
  submitExam,
  getSubscriptionExams,
} from "../controllers/exams.js";
import { studentLogin, tokenValidate } from "../controllers/users.js";
import { getStudentToken } from "../controllers/students.js";

const router = express.Router();

router.post("/", studentLogin);
router.post("/validateToken", tokenValidate);

router.get("/student", getStudentToken);

router.get("/subscriptions", auth, getAllSubscriptionsForStudent);
router.get("/:id/exams_essay", auth, getSubscriptionExams);

router.get("/exams_essay/:id", auth, getExamById);
router.get("/exams_essay/:id/submission", examAttemptReq);
router.put("/exams_essay/:id", auth, submitExam);

export default router;
