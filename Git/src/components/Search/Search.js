import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataObj: {},
      reposURL: '',
      reposInfo: [],
      loaderActive: false,
      displayInfo: true,
      searchDisable: false,
      messageActive: false,
      formDisable: false,
    };
  }
  loaderActivate() {
    this.setState({ loaderActive: true });
  }
  loaderDisable() {
    this.setState({ loaderActive: false });
  }
  openSearch = e => { 
    this.setState({
      displayInfo: !this.state.displayInfo,
      searchDisable: !this.state.searchDisable, 
      formDisable: !this.state.formDisable,
    });
  }
  async GET(url) {
    try {
      let data = await axios.get(url)
      return data;
    } catch (error) {
      console.log(error)
    }
  }
  async firstRequest(user) {
    this.loaderActivate();
    const value = user || 'Yura747';
    // const TOKEN = 'cd43ddf8f979374f0e002b3503acf8db1895d817';
    const URL = `https://api.github.com/users/${value}`;
    try {
      const result = await this.GET(URL);
      if(result) {
        this.loaderDisable();  
        this.setState({ dataObj: Object.assign({}, result.data) });
        this.setState({ reposURL: result.data.repos_url,
          displayInfo: true,
          formDisable: true,
        });
        this.getRepos();
      }
    } catch(error) {
      console.log(error)
    }
  }
  async getRepos() {
    const URL = this.state.reposURL;
    try {
      const result = await this.GET(URL);
      if(result) {
        this.setState({ reposInfo: result.data });
      }
    } catch (error) {
      console.log(error)
    }
  }
  submitHandler = e => {
    e.preventDefault();
    this.setState({ searchDisable: true });
    this.firstRequest(e.target.name.value);
  }
  render() {
    const data = this.state.dataObj;
    return (
      <section className="Search">
        { (this.state.reposInfo.length !== 0) ? (
          <div className={`content-wr ${this.state.displayInfo ? 'active' : '' }`}>
            <div className="content-inner">
              <div className="card-wr">
                <div className="avatar-wr">
                <img src={data.avatar_url} className="avatar" alt="avatar" />
                <div className="smile">
                  <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z"></path></svg>
                </div>
                </div>
                <div className="info-wr">
                  <p>{data.name}</p>
                  <a className="link" href={data.html_url} target="_blank" rel="noopener noreferrer">Visit profile</a>
                </div>
              </div>
              <div className="main-info">
                <div className="info__header">
                  <p className="info__title">Overview</p>
                </div>
                <div className="info__content">
                  <p>All repositories</p>
                  <div className="repo-wr">
                    {this.state.reposInfo.map(repo => 
                      <div className="repo" key={repo.name}>
                        <a className="repo-link" href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <span title={repo.name}>{repo.name}</span>
                        </a>
                        <div className="programming-language">
                          <span className="circle"></span>
                          <span className="language">{repo.language}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button className="search-btn back" onClick={ this.openSearch }>Back</button> 
          </div>): (
            <div className={`message ${this.state.messageActive ? 'active' : '' }`}>
              <p>Something wrong with your request. 
                  Please, reload this page and try again
                </p>
            </div>
          )}
            <div className={`form ${this.state.formDisable ? 'active' : '' }`}>
              <div className={`form-content ${this.state.searchDisable ? 'active' : '' }`}>
                <form onSubmit={ this.submitHandler }>
                  <div className="form__inner">
                    <input type="text" className="inputName" name="name" placeholder="repository name"></input>
                    <button className="search-btn">Search</button> 
                  </div>
                </form>
                <p className="example">example: Yura747</p>
              </div>
            <div className={`Loader-wr ${this.state.loaderActive ? 'active' : '' }`}>
              <svg className="Loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
                <g fill="#61DAFB">
                  <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
                  <circle cx="420.9" cy="296.5" r="45.7"/>
                  <path d="M520.5 78.1z"/>
                </g>
              </svg>
            </div>
          </div>
      </section>
    );
  }
}

export default Search;