import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
const Question = ({ exam }) => {
  return (
    <Card>
      <Card.Img variant="bottom" src={exam.question.imageBase64} />
      <Card.Body>
        <Card.Title>{exam.name}</Card.Title>
        <Card.Text>{exam.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Question;
