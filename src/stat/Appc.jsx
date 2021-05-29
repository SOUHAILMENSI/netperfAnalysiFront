import React, { Component } from "react";
import BarChart from "./components/BarChart.jsx";
import PieChart from "./components/PieChart.jsx";
import LineChart from "./components/LineChart.jsx";

class Appc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      line: false,
      pie: false,
      bar: false,
    };
    this.getChartData = this.getChartData.bind(this);
  }
  componentWillMount() {
    this.getChartData();
  }
  getChartData() {
    this.setState({
      line: this.props.line ? true : false,
      bar: this.props.bar ? true : false,
      pie: this.props.pie ? true : false,
      chartData: {
        labels: this.props.head,
        datasets: [
          {
            label: this.props.label,
            data: this.props.value,
            backgroundColor: [
              "rgba(255,0,0, 0.7)",
              "rgba(0, 255, 64, 0.8)",
              "rgba(0,0,128, 0.7)",
              "rgba(153, 102, 255, 0.8)",
              "rgba(255, 159, 64, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 153, 51, 0.8)",
              "rgba(255, 102, 204, 0.8)",
              "rgba(204, 0, 0, 0.8)",
              "rgba(51, 51, 204, 0.8)",
              "rgba(255, 255, 0, 0.8)",
              "rgba(204, 255, 255,0.8)",
              "rgba(102, 0, 51, 0.8)",
              "rgba(255, 99, 132, 0.8)",
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="Appc">
        <h5>{this.props.label}</h5>
        {this.state.bar && <BarChart chartData={this.state.chartData} />}
        {this.state.pie && <PieChart chartData={this.state.chartData} />}
        {this.state.line && <LineChart chartData={this.state.chartData} />}
      </div>
    );
  }
}

export default Appc;
