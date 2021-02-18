import React, { Component } from 'react';
import  ReactDom from 'react-dom';
import  axios from 'axios';

class App extends Component {
  componentDidMount() {
    // Charles Fiddler
    axios.get('/react/api/header.json').then((data) => {
      console.log(data);
    })
  }
  render () {
    return (
      <div>Hello world!</div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
