import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/StudentContext.js";
export default function Header() {
  let history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Navbar.Brand onClick={() => history.push("/dashboard")}>
        ProgressBook
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {userData.user ? (
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/exams")}>Exams</Nav.Link>
            <Nav.Link onClick={() => history.push("/subscriptions")}>
              Subscriptions
            </Nav.Link>
          </Nav>
        ) : (
          <div></div>
        )}

        <Nav>
          <Nav.Link>
            <AuthOptions />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
