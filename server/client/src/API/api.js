import axios from "axios";

const studentUrl = "http://localhost:4000/api/v1/students";

export const login = (data) => axios.post(`${studentUrl}`, data);
export const validate = (token) =>
  axios.post(`${studentUrl}/validateToken`, null, {
    headers: { "x-auth-token": token },
  });
export const fetchStudent = (token) =>
  axios.get(`${studentUrl}/student`, {
    headers: { "x-auth-token": token },
  });

export const fetchExams = (id, token) =>
  axios.get(`${studentUrl}/${id}/exams_essay`, {
    headers: { "x-auth-token": token },
  });
export const fetchExam = (id, token) =>
  axios.get(`${studentUrl}/exams_essay/${id}`, {
    headers: { "x-auth-token": token },
  });
export const submitAnswers = (id, updatedSubmission, token) =>
  axios.put(`${studentUrl}/exams_essay/${id}`, updatedSubmission, {
    headers: { "x-auth-token": token },
  });

export const fetchSubscriptions = (token) =>
  axios.get(`${studentUrl}/subscriptions`, {
    headers: { "x-auth-token": token },
  });
export const fetchSubscription = (id, token) =>
  axios.get(`${studentUrl}/subscriptions/${id}`, {
    headers: { "x-auth-token": token },
  });

export const fetchBatches = (token) =>
  axios.get(`${studentUrl}/batches`, {
    headers: { "x-auth-token": token },
  });
