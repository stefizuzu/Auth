import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";

// pages
import Homepage from "./pages/HomePage";
import Userpage from "./pages/UserPage";

function App() {
  const userData = require("./components/login/userData_Client");

  const isAuthenticated = () => {
    return userData.isLoggedin;
  };

  return (
    <div className="App">
      <header className="App-header"></header>

      <Router>
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-dark "
            style={{
              zindex: "10000",
              backgroundColor: "#0C090A",
            }}
          >
            <div style={{ width: "100%" }}>
              <a
                href="/#"
                className="navbar-brand"
                style={{ fontSize: "1.2em", fontFamily: "opensans-semibold" }}
              >
                Parkinson's disease PD Stuz
                <br />
              </a>

              {isAuthenticated() ? <a></a> : <a></a>}

              <button
                style={{ float: "right" }}
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarColor02"
            >
              <ul className="navbar-nav ">
                <li className="nav-item ">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <span className="sr-only">(current)</span>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Switch>
          <Route path="/account" render={() => <Userpage />} />
          <Route
            path="/"
            render={() =>
              isAuthenticated() ? (
                <Homepage />
              ) : (
                <Redirect to={{ pathname: "/account" }} />
              )
            }
          />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
//<Route exact path="/" component={Homepage} />
