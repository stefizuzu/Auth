import React from "react";
import Axios from "axios";
import userData from "./userData_Client";
import "../../css/Login.css";


var child;
var timer;

const submitLogin = (loginType) => {
  var currentChild = false;
  child = window.open(
    "http://localhost:3001/connect-" + loginType,
    "",
    "location=0,toolbar=0,status=0,width=600,height=700"
  );
  timer = setInterval(checkChild, 500);
  currentChild = true;
};

const checkChild = () => {
  if (child.closed) {
    getUserData();
    clearInterval(timer);
  }
};

const getPatients = () => {
  Axios.get("http://localhost:3001/getPatientData").then((res) => {
    userData.patientData = res.data;
  });
};

const getUserData = () => {
  Axios.get("http://localhost:3001/getUserData").then((res) => {
    userData.name = res.data.name;
    userData.email = res.data.email;
    userData.typeOfUser = res.data.typeOfUser;
    if (userData.email) userData.isLoggedin = true;
    else alert("You are not a registered user!");
    getPatients();
    if (res.data.typeOfUser == "researcher") {
      getNotes();  
    }
    console.log(userData);
  });
};

const getNotes = () => {
  Axios.get("http://localhost:3001/getNotes").then((res) => {
      userData.notes = res.data;
  });
  console.log(userData.notes);
};

const LoginButtons = () => {
  return (
    <div className="center">
      <h3>
        Login <br />
        <small className="text-muted">with one of the following accounts</small>
      </h3>
      <button
        className="btn btn-danger"
        style={{ fontsize: "24px", width: "100px" }}
        onClick={() => submitLogin("google")}
      >
        Login <i className="fa fa-google"></i>
      </button>
      <br />
      <br />
      <button
        className="btn btn-primary"
        style={{ fontsize: "24px", width: "100px" }}
        onClick={() => submitLogin("facebook")}
      >
        Login <i className="fa fa-facebook"></i>
      </button>
      <br />
      <br />
      <button
        className="btn btn-secondary"
        style={{ fontsize: "24px", width: "100px" }}
        onClick={() => submitLogin("github")}
      >
        Login <i className="fa fa-github"></i>
      </button>
      <br />
      <br />
    </div>
  );
};

export default LoginButtons;
