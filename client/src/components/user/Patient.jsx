import React, { Component } from "react";
import YouTube from "react-youtube";
import "../../css/PatientPage.css";
import  GeneratedData from "../GeneratedData"


class Patient extends Component {
  render() {
    // video
    const opts = {
      height: "245",
      width: "360",
      playerVars: {
        autoplay: 0,
      },
    };
    return (
      <div style={{ margin : "auto", width: "60%", marginTop:"50px", marginBottom:"50px"}}>
        <br />
        <h2 className="patient_videos">Patient Videos</h2>
        <br />
        <div className="videos">
          <YouTube videoId="wkDiOCIX_xA" opts={opts} onReady={this._onReady} />
          <YouTube videoId="MsXlZ_phGNY" opts={opts} onReady={this._onReady} />
          <YouTube videoId="Ez2GeaMa4c8" opts={opts} onReady={this._onReady} />
        </div>
        <h3>My Data</h3>
        <GeneratedData />
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
export default Patient;
