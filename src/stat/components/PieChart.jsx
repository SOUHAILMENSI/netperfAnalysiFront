

import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData,
      displayTitle: true,
      displayLegend: true,
      legendPosition: "right",
    };
  }

  render() {
    return (
      <div className="piechart">
       <Pie
          data={this.state.chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            title: {
              display: this.state.displayTitle,
              //text: "statistic of " + this.state.products,
              fontSize: 25
            },
            legend: {
              display: this.state.displayLegend,
              position: this.state.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default PieChart;
