import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <section className="Home">
        <div className="title">
          <h2>Search</h2>
          <p>on</p>
        </div>
        <div className="scroll-down-wr">
          <svg className="scroll-down-svg" width="9" height="25" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="evenodd">
              <path className="path_1" d="M4.614 25L0 18h9z"/>
              <path className="path_2"  d="M4.614 16L0 9h9z"/>
              <path className="path_3"  d="M4.614 7L0 0h9z"/>
            </g>
          </svg>
        </div>
      </section>
    );
  }
}

export default Home;