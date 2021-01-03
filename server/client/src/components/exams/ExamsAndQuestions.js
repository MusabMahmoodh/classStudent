import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Nav, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as api from "../../API/api";
import Exam from "./Exam";
import TryQuestion from "./TryQuestion";
import UserContext from "../../context/StudentContext";
const ExamsAndQuestions = () => {
  const { userData } = useContext(UserContext);
  const [exams, setExams] = useState([]);
  const [essays, setEssays] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchExams(id, userData.token);
        // console.log(response);
        setExams(response.data);
        // setSubscriptions(response.data[0].subscriptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setEssays(exams.filter((exam) => exam.type === true));
    setQuestions(exams.filter((exam) => exam.type === false));
  }, [exams]);
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      {/* {console.log(exams)} */}
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Essay exams</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Essay questions</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Exam essays={essays} />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <TryQuestion questions={questions} />{" "}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ExamsAndQuestions;
