import React, { Component } from "react";
import userData from "../components/login/userData_Client";

// pages
import PatientPage from "../components/user/Patient";
import PhysicanPage from "../components/user/Researcher";
import ResearcherPage from "../components/user/Physician";

class HomePage extends Component {
  renderUserPage = () => {
    if (userData.typeOfUser == "patient") {
      return <PatientPage />;
    } else if (userData.typeOfUser == "physician") return <PhysicanPage />;
    else if (userData.typeOfUser == "researcher") return <ResearcherPage />;
    return "Something went wrong...";
  };
  render() {
    return <div>{this.renderUserPage()}</div>;
  }
}

export default HomePage;
