import React, { Component } from 'react';
import * as d3 from 'd3';

class Chart extends Component {

  componentDidMount() {
    const margin = { bottom: 20, left: 30}
    const w = 300 - margin.left
    const h = 200 - margin.bottom;
    const pad = 1;

    const data = this.props.data.hourly.data

    const svg = d3.select(`#chart-${this.props.name.split(' ').join('-')}`).append('svg')
      .attr('width', w + margin.left)
      .attr('height', h + margin.bottom);

    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d => { return d.temperature })])
                     .range([h, 0]);

    const xScale = d3.scaleLinear()
                     .domain([0, data.length])
                     .range([0, w]);

    const yAxis = d3.axisLeft(yScale);
    const xAxis = d3.axisBottom(xScale);

    svg.append("g")
      .attr("transform", "translate(20," + h + ")")
      .call(xAxis)

    svg.append("g")
        .attr("transform", "translate(20, 0)")
        .call(yAxis)

    svg.selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return i * (w / data.length) + 20 + pad
      })
      .attr('y', d => { return yScale(d.temperature) })
      .attr('width', w / data.length - pad)
      .attr('height', d => { return yScale(0) - yScale(d.temperature) })
      .attr('fill', 'orange')

  }

  render() {
    return (
      <div id={`chart-${this.props.name.split(' ').join('-')}`}>
      </div>
    )
  }

}

export default Chart;
