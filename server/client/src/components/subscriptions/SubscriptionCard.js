import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const SubscriptionCard = ({ subscription }) => {
  let history = useHistory();
  return (
    <Card style={{ margin: "auto", marginBottom: "10px" }}>
      <Card.Img
        variant="top"
        src="https://source.unsplash.com/random/400x100"
      />
      <Card.Body>
        <Card.Title>{subscription.name}</Card.Title>

        <Button
          variant="primary"
          onClick={() => history.push(`/subscription/${subscription._id}`)}
        >
          {" "}
          Go{" "}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SubscriptionCard;
