import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Question from "./Exam/Question";
import Submission from "./Exam/Submission";

const Exam = ({ essays }) => {
  const timeChange = (time) => {
    return time.toLocaleString().replace("Z", "").replace("T", " ");
  };
  let history = useHistory();
  return (
    <>
      {essays &&
        essays.map((ess) => (
          <Card>
            <Card.Header>{ess.name}</Card.Header>
            <Card.Body>
              <Card.Text>
                Start time :{timeChange(ess.start_time)}
                <br /> End time: {timeChange(ess.end_time)} <br />
                Duration: {ess.interval[0].hour}hours {ess.interval[0].minutes}
                minutes
              </Card.Text>
              <Card.Title>{ess.description}</Card.Title>
              <Button
                variant="warning"
                onClick={() => history.push(`/subscription/${ess._id}/paper`)}
              >
                Attempt
              </Button>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default Exam;
