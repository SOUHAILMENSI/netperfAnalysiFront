

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
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
      <div className="barchart">
        <Bar
          data={this.state.chartData}
          //width={"30%"}
          //height={"30%"}
          options={{
            responsive: true,
            maintainAspectRatio: true,
              title: {
                display: this.state.displayTitle,
                //text: "Average Rxlevel- Cell ID ",
                fontSize: 23,

              },

              legend: {
                display: this.state.displayLegend,
                position: this.state.legendPosition
              },
             
              scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        
                    }
                }]
            }
          }}
        />
      </div>
    );
  }
}

export default BarChart;
