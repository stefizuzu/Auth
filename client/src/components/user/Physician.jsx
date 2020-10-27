import React, { Component } from "react";
import  UserData from "../UserData"
import  Chart from "../Chart"
import  GeneratedData from "../GeneratedData"

class Physician extends Component {
  render() {
    return (
      <div>
        <div>
          <Chart />
          <UserData />
          <GeneratedData />
        </div>
      </div>
    );
  }
}

export default Physician;
