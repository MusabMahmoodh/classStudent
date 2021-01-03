import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/StudentContext.js";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? <button onClick={logout}>Log out</button> : <></>}
    </nav>
  );
}
