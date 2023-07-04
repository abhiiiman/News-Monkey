import './App.css';
import React, { Component } from "react";
import NavBar from './Components/NavBar';
import News from './Components/News';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    console.log('Progress:', progress);
    this.setState({ progress: progress })
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    return (
      <HashRouter>
        <NavBar />
        <LoadingBar color='#EEB26D' progress={this.state.progress} height={3} />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={6} key="general" category="general" country="in" />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} pageSize={6} key="business" category="business" country="in" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} pageSize={6} key="entertainment" category="entertainment" country="in" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} pageSize={6} key="sports" category="sports" country="in" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} pageSize={6} key="health" category="health" country="in" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} pageSize={6} key="science" category="science" country="in" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} pageSize={6} key="technology" category="technology" country="in" />} />
        </Routes>
      </HashRouter>
    )
  }
}