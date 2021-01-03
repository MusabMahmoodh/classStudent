import React, { useEffect, useState, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Question from "../components/exams/Exam/Question";
import Submission from "../components/exams/Exam/Submission";
import * as api from "../API/api";
import UserContext from "../context/StudentContext";
const ExamPaper = ({ essays }) => {
  const { id } = useParams();
  const [exam, setExam] = useState([]);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExam(id, userData.token);
        setExam(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Question">
        <Question exam={exam} />{" "}
      </Tab>
      <Tab eventKey="profile" title="Submission">
        <Submission ex_id={exam._id} />{" "}
      </Tab>
      <Tab eventKey="contact" title="Solution" disabled></Tab>
    </Tabs>
  );
};

export default ExamPaper;
