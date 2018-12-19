import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Spinner from '../layout/Spinner'
const { withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBxOdxMzUrHxdK9ooxbs4VuJGyFb7P3dag&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      const OriginLat = this.props.OriginLocation.latitude
      const OriginLongi = this.props.OriginLocation.longitude
      const DestLat = this.props.DestLocation.latitude
      const DestLongi = this.props.DestLocation.longitude
      DirectionsService.route({
        origin: new window.google.maps.LatLng(OriginLat,OriginLongi),
        destination: new window.google.maps.LatLng(DestLat,DestLongi),
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={new window.google.maps.LatLng(20.5937,78.9629)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

class Status extends Component {
  render() {
    const {deal}=this.props
    const Piclup_location = deal.pickup_location
    const Drop_location  = deal.drop_location
    if(deal){
        return (
            <div className='row'>
              <div className='col-md-12'>
              <MapWithADirectionsRenderer  OriginLocation={Piclup_location} DestLocation={Drop_location}/>
              </div>              
            </div>
          )
    }else{
        return <Spinner/>
    }
  
  }
}
export default compose(
    firestoreConnect(props => [
        {
            collection: 'deals',
            storeAs: 'deal',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        deal: ordered.deal && ordered.deal[0]
    }))
)(Status)