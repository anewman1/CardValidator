import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CrediCardContainer from './components/CreditCardContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Andrew Newman - Tech Test</h1>
        </header>
        <p className="App-intro">
          Started with create-react-app
        </p>


        <CrediCardContainer/>


      </div>
    );
  }
}

export default App;
