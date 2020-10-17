import React, { Component } from "react";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import userData from "../login/userData_Client";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

class Physician extends Component {
  state = {
    data: [[{}]],
    patients: [],
  };

  async FetchCSV(file) {
    const response = await fetch("data/" + file + ".csv");
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);
    return csv;
  }

  async GetData() {
    const allData = [[{}]];

    for (var i = 0; i < userData.patientData.length; i++) {
      const data = Papa.parse(
        await this.FetchCSV(userData.patientData[i].patientId)
      );
      const result = [{}];
      for (var j = 1; j < data.data.length - 1; j++) {
        result.push({
          week: data.data[j][0],
          kcal: data.data[j][1],
          exercise: data.data[j][2],
        });
      }
      allData.push(result);
    }
    this.setState({ data: allData });
  }

  componentDidMount() {
    this.GetData();
    this.setState({ increment: "0" });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.data.slice(1).map(function (items, i) {
              const columns = [
                {
                  dataField: "week",
                  text: "week",
                },
                {
                  dataField: "kcal",
                  text: "kcal",
                },
                {
                  dataField: "exercise",
                  text: "exercise",
                },
              ];
              return (
                <div>
                  <h3>
                    Patient-
                    {userData.patientData[i].patientName}
                  </h3>
                  <BootstrapTable
                    keyField={"i" + i}
                    data={items}
                    columns={columns}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Physician;
