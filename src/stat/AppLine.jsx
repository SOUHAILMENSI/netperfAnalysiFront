import React, { Component } from "react";
import BarChart from "./components/BarChart.jsx";
import PieChart from "./components/PieChart.jsx";
import LineChart from "./components/LineChart.jsx";

class AppPie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      loading: false,
    };
    this.getChartData = this.getChartData.bind(this);
  }

  componentWillMount() {
    this.getChartData();
  }
  getChartData() {
    this.setState({
      loading: true,
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
          <div className="container-sm">
            <div className="row">
              <div className="Col">
                <h4>{this.props.label}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="container-sm">
          <div className="row">
            <div className="col">
              {this.state.loading && (
                 <LineChart chartData={this.state.chartData} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppPie;
