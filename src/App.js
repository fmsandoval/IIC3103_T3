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

  _onPositionUpdate(position_data) {
    const flights = this.state.flights;
    const flight = flights[position_data.code];
    flight.positions.push({ lat: position_data.position[0], lng: position_data.position[1] });
    flights[position_data.code] = flight;
    this.setState({ flights });
  }

  _onAirportsUpdate(airports_data) {
    this.setState({ airports: airports_data });
  }

  _onFlightsUpdate(flights_data) {
    const updated_flights = {};
    const { flights } = this.state;
    flights_data.forEach(function(flight_data) {
      flight_data.positions = (flights && flights[flight_data.code] && flights[flight_data.code].positions) || [];
      updated_flights[flight_data.code] = flight_data;
    });
    this.setState({ flights: updated_flights });
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
          Airports
        </button>
        <br/><br/>
        <button onClick={this.requestFlights.bind(this)}>
          Flights
        </button>
        <br/><br/>
        <Map airports={this.state.airports} flights={this.state.flights}/>
      </div>
    );
  }
}

export default App;
