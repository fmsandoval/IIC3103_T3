import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Map from './Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: {},
      flights: {}
    };
    this.onAirportsUpdate = this._onAirportsUpdate.bind(this);
    this.onFlightsUpdate = this._onFlightsUpdate.bind(this);
    this.onPositionUpdate = this._onPositionUpdate.bind(this);
  }

  componentDidMount() {
    this.socket = io('wss://integracion-tarea-3.herokuapp.com', {
      path: '/flights',
      transports: ['websocket']
    });
    this.socket.on('POSITION', this.onPositionUpdate);
    this.socket.on('AIRPORTS', this.onAirportsUpdate);
    this.socket.on('FLIGHTS', this.onFlightsUpdate);
    this.requestAirports();
    this.requestFlights();
  }

  requestAirports() {
    this.socket.emit("AIRPORTS");
  }

  requestFlights() {
    this.socket.emit("FLIGHTS");
  }

  _onPositionUpdate(positionData) {
    const updatedFlights = Object.assign({}, this.state.flights);
    const flight = updatedFlights[positionData.code];
    const newPositions = [];
    flight.positions.forEach(function (position){
      newPositions.push(position);
    });
    newPositions.push({ lat: positionData.position[0], lng: positionData.position[1] });
    flight.positions = newPositions;
    updatedFlights[positionData.code] = flight;
    this.setState({ flights: updatedFlights });
  }

  _onAirportsUpdate(airportsData) {
    this.setState({ airports: airportsData });
  }

  _onFlightsUpdate(flightsData) {
    const updatedFlights = {};
    const { flights } = this.state;
    flightsData.forEach(function(flightData) {
      flightData.positions = (flights && flights[flightData.code] && flights[flightData.code].positions) || [];
      updatedFlights[flightData.code] = flightData;
    });
    this.setState({ flights: updatedFlights });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tarea 3 - Fernando Sandoval</h1>
        </header>
        <br/><br/>
        <button onClick={this.requestAirports.bind(this)}>
          Update Airports
        </button>
        <br/><br/>
        <button onClick={this.requestFlights.bind(this)}>
          Update Flights
        </button>
        <br/><br/>
        <Map airports={this.state.airports} flights={this.state.flights}/>
      </div>
    );
  }
}

export default App;
