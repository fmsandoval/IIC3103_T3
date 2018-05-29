import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"



class FlightsMap extends React.Component {
  render() {
    return (
        <GoogleMap
            className={'map'}
            defaultZoom={5}
            defaultCenter={{ lat: -33.447487, lng: -70.673676 }}
            >
            {Object.values(this.props.airports).map(function(airport) {
                return <Marker key={airport.airport_code}
                    position={{lat: airport.airport_position[0], lng: airport.airport_position[1]}}
                    />
            })}
            {Object.values(this.props.flights).map(function(flight) {
                const { positions, code } = flight;
                if (!positions.length) return null;
                return <Marker key={code}
                    position={positions[positions.length - 1]}
                    />
            })}
            {Object.values(this.props.flights).map(function(flight) {
                const { positions, code } = flight;
                if (!positions.length) return null;
                return <Polyline key={code + ' Real Path'}
                    path={positions}
                    strokeColor="#00FFFF"
                    strokeOpacity={1}
                    strokeWeight={10} />
            })}
        </GoogleMap>
    );
  }
}

export default compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBzFqxu4HsUYVe_LQtFbPLZvoU_9IWamQk",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `600px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )(FlightsMap);