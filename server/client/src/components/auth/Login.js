import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import UserContext from "../../context/StudentContext.js";
import * as api from "../../API/api.js";

export default function Login() {
  const [indexNo, setIndexNo] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const loginUser = { indexNo, password };
      const loginRes = await api.login(loginUser);
      console.log(loginRes);
      setUserData({
        ...userData,
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      console.log("here");
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <Card>
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Index number </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter index"
                value={indexNo}
                onChange={(e) => setIndexNo(e.target.value)}
              />
              <Form.Text className="text-muted">hmmm</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
