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
      pie:false,
      bar:false
    };
    this.getChartData = this.getChartData.bind(this);
  }

  componentWillMount() {
    this.getChartData();
  }
  getChartData() {
    this.setState({
      line: this.props.line?true:false,
      bar: this.props.bar?true:false,
      pie: this.props.pie?true:false,
      chartData: {
        labels: this.props.head,
        datasets: [
          {
            label: this.props.label,
            // data: [617594, 181045, 153060, 106519, 105162, 95072]
            data: this.props.value,
            backgroundColor: [
              "rgba(244, 67, 54, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="Appc">
        <div className="Appc-header">
          <div class="container-sm">
            <div class="row">
              <div class="Col">
                <h4>{this.props.label}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="container-sm">
          <div class="row">
            <div class="col">
              {this.state.bar && (
                <BarChart chartData={this.state.chartData} />
              )}
              ,
            </div>
            <div class="col">
              {this.state.pie && (
                <PieChart chartData={this.state.chartData} />
              )}
              ,
            </div>
          </div>
          <div class="row">
            <div class="col">
              {this.state.line && (
                <LineChart chartData={this.state.chartData} />
              )}
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Appc;
