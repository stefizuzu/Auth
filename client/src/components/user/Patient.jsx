import React, { Component } from "react";
import YouTube from "react-youtube";
import "../../css/PatientPage.css";
class Patient extends Component {
  state = {};
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
      <div>
        <br />
        <h2 className="patient_videos">Patient Videos</h2>
        <br />
        <div className="videos">
          <YouTube videoId="wkDiOCIX_xA" opts={opts} onReady={this._onReady} />
          <YouTube videoId="MsXlZ_phGNY" opts={opts} onReady={this._onReady} />
          <YouTube videoId="Ez2GeaMa4c8" opts={opts} onReady={this._onReady} />
        </div>
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Patient;
