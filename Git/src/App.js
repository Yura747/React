// import React from 'react';
import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import ReactPageScroller from "react-page-scroller";
import PropTypes from 'prop-types';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
    this._pageScroller = null;
  }

  render (){
    return (
      <div className="App">
        <ReactPageScroller ref={c => this.reactPageScroller = c}>
          <Home />
          <Search />
        </ReactPageScroller>
      </div>
    );
  };
}


export default App;
