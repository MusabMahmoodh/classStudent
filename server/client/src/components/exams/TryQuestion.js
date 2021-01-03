import React from "react";
import { Card, Button } from "react-bootstrap";

import Question from "./Question/Question";
import AddMarks from "./Question/AddMarks";
const TryQuestion = ({ questions }) => {
  const timeChange = (time) => {
    return time.toLocaleString().replace("Z", "").replace("T", " ");
  };
  return (
    <>
      {questions &&
        questions.map((ess) => (
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
              <Button variant="warning">Attempt</Button>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default TryQuestion;
