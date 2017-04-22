import React, { Component } from 'react';
import WidgetList from './WidgetList';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/init')
      .then( res => {
        this.setState({ widgets: res.data})
      }).catch( error => {
        throw error
      })
  }

  render() {
    if (!this.state.widgets) {
      return <h1>Loading...</h1>
    }
    return (
      <div className="App">
        <WidgetList {...this.state}/>
      </div>
    );
  }
}

export default App;
