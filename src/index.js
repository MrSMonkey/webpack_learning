import React, { Component, Fragment } from 'react';
import  ReactDom from 'react-dom';
import  { BrowserRouter, Route } from 'react-router-dom';
import Home from './home';
import List from './list';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Fragment>
          <Route path='/' exact component={Home}/>
          <Route path='/list' component={List}/>
        </Fragment>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
