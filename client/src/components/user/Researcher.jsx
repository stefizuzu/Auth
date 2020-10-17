import React, { Component } from "react";
import Physician from "./Physician";
import axios from "axios";

import XMLParser from "react-xml-parser";

class Researcher extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/",
      targetUrl =
        "https://www.news-medical.net/tag/feed/Parkinsons-Disease.aspx";
    const url = proxyUrl + targetUrl;
    axios.get(url).then((res) => {
      var jsonDataFromXml = new XMLParser().parseFromString(res.data);
      const array = [];
      jsonDataFromXml.getElementsByTagName("description").map((item) => {
        array.push(item.value);
      });
      this.setState({ data: array });
    });
  }
  render() {
    return (
      <div>
        <h2>Latest News</h2>

        {this.state.data.map(function (info) {
          return (
            <div>
              <br />
              {info}
            </div>
          );
        })}
        <br />
        <br />
        {<Physician />}
      </div>
    );
  }
}

export default Researcher;
