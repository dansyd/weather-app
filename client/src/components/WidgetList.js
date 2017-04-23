import React from 'react';
import Chart from './Chart';

const calculateAvg = (data) => {
  return data.reduce( (acc, val) => {
    return ({
      temperature: acc.temperature + val.temperature,
      humidity: acc.humidity + val.humidity,
      pressure: acc.pressure + val.pressure
    }
    )
  }, {temperature: 0, pressure: 0, humidity: 0})
}

const renderWidgets = ({widgets, removeWidget}) => {
  return widgets.map( widget => {
    const hourlyData = widget.data.hourly.data;
    const avgDayData = calculateAvg(hourlyData);
    return (
      <li key={widget.name}>
        <button className="remove-widget" onClick={() => removeWidget(widget.name)}>
          <strong>X</strong>
        </button>
        <h2>{widget.name}</h2>
        <div className="currently">
          <h3>Currently {parseInt(widget.data.currently.temperature, 10)} {'\u2103'}</h3>
          <p>{widget.data.hourly.summary}</p>
        </div>
        <h4>Day average</h4>
        <ul className="avg-data-list">
          <li>Temperature <br/>{parseInt(avgDayData.temperature / hourlyData.length, 10)} {'\u2103'}</li>
          <li>Humidity <br/>{parseInt((avgDayData.humidity / hourlyData.length) * 100, 10)}%</li>
          <li>Pressure <br/>{parseInt(avgDayData.pressure / hourlyData.length, 10)}</li>
        </ul>
        <Chart {...widget}/>
      </li>
    )
  })
}

const WidgetList = (props) => {
  return (
    <ul className="widget-list">
      {renderWidgets(props)}
    </ul>
  )
}

export default WidgetList;
