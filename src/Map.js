import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google}
                style={{width: '100%', height: '65%'}}
                className={'map'}
                initialCenter={{
                    lat: -33.447487,
                    lng: -70.673676
                    }}
                zoom={5}>
                {Object.values(this.props.airports).map(function(airport) {
                    return <Marker key={airport.airport_code}
                        name={airport.name}
                        position={{lat: airport.airport_position[0], lng: airport.airport_position[1]}}
                        icon={{
                            url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/White_circle_in_blue_background.png",
                            anchor: new window.google.maps.Point(32,32),
                            scaledSize: new window.google.maps.Size(35,35)
                        }} />
                })}
                {Object.values(this.props.flights).map(function(flight) {
                    const { positions, code, plane } = flight;
                    if (!positions.length) return null;
                    return <Marker key={code}
                        name={plane}
                        position={positions[positions.length - 1]}
                        icon={{
                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Legenda_lotnisko.svg/128px-Legenda_lotnisko.svg.png",
                            anchor: new window.google.maps.Point(32,32),
                            scaledSize: new window.google.maps.Size(35,35)
                        }} />
                })}
            </Map>
        );
    }
}
  
export default GoogleApiWrapper({
    apiKey: ('AIzaSyBzFqxu4HsUYVe_LQtFbPLZvoU_9IWamQk')
})(MapContainer);