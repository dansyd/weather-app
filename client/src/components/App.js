import React, { Component } from 'react';
import WidgetList from './WidgetList';
import AddWidget from './AddWidget';
import axios from 'axios';
import { geocodeByAddress } from 'react-places-autocomplete';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {addTerm: ''};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRemoveWidget = this.handleRemoveWidget.bind(this);
  }

  componentDidMount() {
    if (localStorage.widgets && JSON.parse(localStorage.widgets).length > 0) {
      this.setState({...this.state, widgets: JSON.parse(localStorage.widgets)})
    } else {
      axios.get('/api/init')
        .then( res => {
          this.setState({...this.state, widgets: res.data})
        }).catch( error => {
          throw error
        })
    }

  }

  handleFormSubmit(event) {
    event.preventDefault()
    geocodeByAddress(this.state.addTerm,  (err, latLng) => {
      if (err) { throw err }
      const url = `/api?lat=${latLng.lat}&long=${latLng.lng}`
      axios.post(url)
        .then( res => {
          const newCity = this.state.addTerm.split(',')[0];
          this.setState({widgets: [...this.state.widgets, {data: res.data, name: newCity}]})
          this.setState({...this.state, addTerm: ''});
          localStorage.setItem( 'widgets', JSON.stringify(this.state.widgets));
        }).catch( error => {
          throw error;
        })
    })
  }

  handleRemoveWidget(name) {
    const oldWidgets = this.state.widgets;
    const newWidgets = oldWidgets.filter( (widget) => {
      return widget.name !== name;
    })
    this.setState({...this.state, widgets: newWidgets});
    localStorage.setItem( 'widgets', JSON.stringify(newWidgets));
  }

  render() {
    if (!this.state.widgets) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="App container">
      <AddWidget
        addTerm={this.state.addTerm}
        onAddTermChange={(addTerm) => this.setState({...this.state, addTerm})}
        onSubmit={this.handleFormSubmit}
      />
      <WidgetList widgets={this.state.widgets} removeWidget={this.handleRemoveWidget}/>
      </div>
    );
  }
}

export default App;
