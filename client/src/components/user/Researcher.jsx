import React, { Component } from "react";
import Physician from "./Physician";
import  News from "../News"
import  UserData from "../UserData"
import  GeneratedData from "../GeneratedData"
import Notes from "../notes/Notes"


class Researcher extends Component {
 
  render() {
    return (
      <div>
        <Notes />
        <UserData />
        <GeneratedData />
        <News />
      </div>
    );
  }
}

export default Researcher;
