import React from "react";
import userData from "./userData_Client";

const logout = () => {
  userData.isLoggedin = false;
  window.open("http://localhost:3001/logout");
  console.log(userData);
};

const LogoutButton = () => {
  return (
    <button
      className="btn btn-secondary"
      style={{ fontsize: "24px", width: "100px" }}
      onClick={logout}
    >
      LOGOUT
    </button>
  );
};

export default LogoutButton;
