import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import * as api from "./API/api.js";
import Header from "./components/layout/Header";

import Subscription from "./routes/Subscription";
import ExamPaper from "./routes/ExamPaper";
import Dashboard from "./routes/Dashboard";
import TryQuestion from "./routes/TryQuestion";
import Login from "./components/auth/Login";

import UserContext from "./context/StudentContext.js";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await api.validate(token);
      // console.log(tokenRes);
      if (tokenRes.data) {
        const userRes = await api.fetchStudent(token);
        // console.log(userRes);
        setUserData({
          token,
          user: userRes.data._id,
        });
        login();
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        {isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
        <UserContext.Provider
          value={{
            userData,
            setUserData,
            logout,
            isAuthenticated,
            subscriptions,
            setSubscriptions,
          }}
        >
          <Header />
          <div className="container">
            <Switch>
              {/* First route */}
              <Route path="/" exact>
                {isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <div>
                    <Redirect to="/login" />
                  </div>
                )}
              </Route>
              {/* Protected routes */}
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/dashboard"
                logout={logout}
                component={Dashboard}
              />
              <ProtectedRoute
                exact
                isAuthenticated={isAuthenticated}
                path="/subscription/:id/paper"
                logout={logout}
                component={ExamPaper}
              />
              <ProtectedRoute
                exact
                isAuthenticated={isAuthenticated}
                path="/subscription/:id/question"
                logout={logout}
                component={TryQuestion}
              />
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                path="/subscription/:id"
                logout={logout}
                component={Subscription}
              />

              {/* Non exist */}
              {/* <Route path="/dashboard" component={Home} /> */}
              <Route path="/login" component={Login} />
              <Route path="*">
                <div>404 Not found </div>
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
}
