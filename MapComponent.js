import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ alerts }) => {
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 28.6139, lng: 77.2090
  }

  return (
    <LoadScript
      googleMapsApiKey='YOUR_GOOGLE_MAPS_API_KEY'>
       <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}>
        { 
          alerts.map(alert => (
            <Marker key={alert.id} position={{ lat: alert.latitude, lng: alert.longitude}} />
          ))
        }
       </GoogleMap>
    </LoadScript>
 )
}

export default MapComponent;
