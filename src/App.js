import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
  componentDidMount() {
    this.socket = io('wss://integracion-tarea-3.herokuapp.com', {
      path: '/flights',
      transports: ['websocket']
    });
    this.socket.on('POSITION', function (data) {
      console.log(data);
    });
    this.socket.on('AIRPORTS', function (data) {
      console.log(data);
    });
    this.socket.on('FLIGHTS', function (data) {
      console.log(data);
    });
  }

  requestAirports() {
    this.socket.emit("AIRPORTS");
  }

  requestFlights() {
    this.socket.emit("FLIGHTS");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.requestAirports.bind(this)}>
          Airports
        </button>
        <br/><br/>
        <button onClick={this.requestFlights.bind(this)}>
          Flights
        </button>
      </div>
    );
  }
}

export default App;
