import React from 'react';

const renderWidgets = (widgets) => {
  return widgets.map( widget => {
    return (
      <li key={widget.name}>
        <h1>{widget.name}</h1>
      </li>
    )
  })
}

const WidgetList = (props) => {
  return (
    <ul>
      {renderWidgets(props.widgets)}
    </ul>
  )
}

export default WidgetList;
