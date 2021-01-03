import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import * as api from "../../API/api";
import SubscriptionCard from "./SubscriptionCard";
import Subscription from "./SubscriptionCard";
import UserContext from "../../context/StudentContext";
const Subscriptions = () => {
  const { subscriptions, setSubscriptions, userData } = useContext(UserContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.fetchSubscriptions(userData.token);
        setSubscriptions(response.data[0].subscriptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Row>
      {console.log(subscriptions)}
      {subscriptions &&
        subscriptions.map((sub) => (
          <Col xs={12} md={4}>
            <SubscriptionCard subscription={sub} />
          </Col>
        ))}
    </Row>
  );
};

export default Subscriptions;
