import React, { Component } from "react";
import LogoutButton from "./LogoutButton";
import LoginButtons from "./LoginButtons";
import userData from "./userData_Client";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: "",
    };
  }
  state = {};

  render() {
    return (
      <div>
        <br /> <br />
        {userData.isLoggedin ? <LogoutButton /> : <LoginButtons />}
      </div>
    );
  }
}

export default Login;
