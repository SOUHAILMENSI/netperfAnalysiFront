import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData,
      displayTitle: true,
      displayLegend: true,
      legendPosition: "bottom",
    };
  }

  render() {
    return (
      <div className="linechart">
        <Line
          data={this.state.chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            title: {
              display: this.state.displayTitle,
              fontSize: 25,
            },
            legend: {
              display: this.state.displayLegend,
              position: this.state.legendPosition,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default LineChart;
