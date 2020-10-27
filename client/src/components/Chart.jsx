import React, {Component} from 'react';
import Papa from "papaparse";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css"; 
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



class Chart extends Component {
  state = {
    data: [[{}]], // the data inside the graph
    patient : 0, // what patient?
    open: false, // for the modal
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
    for (var i = 1; i < 7; i++) {
      const data = Papa.parse(
        await this.FetchCSV("data"+""+i.toString())
      );
      const resultData = [{}];
      for (var j = 1; j < data.data.length; j++) {
        resultData.push({
          name: data.data[j][0],
          uv: data.data[j][1],
        });
      }
      allData.push(resultData);
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
      <div>
        <h2>Patient graphs</h2>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(1)}>Open graph 1</button>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(2)}>Open graph 2</button>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(3)}>Open graph 3</button>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(4)}>Open graph 4</button>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(5)}>Open graph 5</button>
        <button className="btn btn-secondary" onClick={(e) => this.onOpenModal(6)}>Open graph 6</button>

        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <h3>Tapping Chart</h3>
          <LineChart width={600} height={300} data={this.state.data[this.state.patient]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Modal> 
      </div>
    );
  }
}
 
export default Chart;