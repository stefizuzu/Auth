import React, { Component } from "react";
import Papa from "papaparse";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";


import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css"; 

class UserData extends Component {
  state = {
    data: [[{}]],
    patient : 0,
    open: false,
  };

  columns = [
    {dataField: "X",text: "X",},
    {dataField: "Y",text: "Y",},
    {dataField: "time",text: "time",},
    {dataField: "button",text: "button",},
    {dataField: "correct",text: "correct",},
  ];

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
    for (var i = 1; i < 7; i++) {
      const data = Papa.parse(
        await this.FetchCSV("data"+""+i.toString())
      );
      const result = [{}];
      for (var j = 1; j < data.data.length - 1; j++) {
        result.push({
          X: data.data[j][0],
          Y: data.data[j][1],
          time: data.data[j][2],
          button: data.data[j][3],
          correct: data.data[j][4],
        });
      }
      allData.push(result);
    }
    this.setState({ data: allData });
  }

  componentDidMount() {
    this.GetData();
  }

  onOpenModal = (patient) => {
    this.setState({patient : patient});
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

 render() {

    return (
      <div style={{ margin : "auto", width: "50%", marginTop:"50px", marginBottom:"50px"}}>
        <h2 className="display-4">Patient data</h2>

        <button className="btn btn-dark" style={{marginLeft:"5px"}}  onClick={(e) => this.onOpenModal(1)}>Open data 1</button>
        <button className="btn btn-dark" style={{marginLeft:"5px"}} onClick={(e) => this.onOpenModal(2)}>Open data 2</button>
        <button className="btn btn-dark" style={{marginLeft:"5px"}} onClick={(e) => this.onOpenModal(3)}>Open data 3</button>
        <button className="btn btn-dark" style={{marginLeft:"5px"}} onClick={(e) => this.onOpenModal(4)}>Open data 4</button>
        <button className="btn btn-dark" style={{marginLeft:"5px"}} onClick={(e) => this.onOpenModal(5)}>Open data 5</button>
        <button className="btn btn-dark" style={{marginLeft:"5px"}} onClick={(e) => this.onOpenModal(6)}>Open data 6</button>

        <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div>
        <h3>Patient Data - {this.state.patient}</h3>
        <BootstrapTable
          keyField={"i" + this.state.patient}
          data={this.state.data[this.state.patient]}
          columns={this.columns}
        />
    </div>
        </Modal> 
      </div>
    );
  }
}

export default UserData;
