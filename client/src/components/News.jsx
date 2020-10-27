import React, { Component } from "react";
import axios from "axios";
import {Card, CardText, CardBody, CardTitle, CardSubtitle, CardImg} from 'reactstrap';
import XMLParser from "react-xml-parser";


class News extends Component {
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
      <div style={{margin:"40px"}}>
        <br />
        <h2 className="display-4">Latest News</h2>
        <br />
      <div>
        {this.state.data.map(function (info) {
          return (
            <div style={{marginTop: "4px", width: '100%', display:"flex", margin: "auto"}}>
              <br />

              <Card body outline color="warning">
                <CardBody>
                    <CardText>{info}</CardText>
                </CardBody>
            </Card>
              
            </div>
          );
        })}
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default News;
