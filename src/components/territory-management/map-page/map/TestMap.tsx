import React, { useState, useCallback, useEffect } from 'react';
import { LoadScript, GoogleMap, PolygonF } from '@react-google-maps/api';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { getCoordinates } from '../../../../data/json/AL';
import { darkModeStyle } from './constants';

const apiGoogleKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string;

export function TestMap() {
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  const handleGoogleMapsLoaded = () => {
    setGoogleMapsLoaded(true);
  };

  // Define a type for the coordinates of the polygon
  const polygonCoords = getCoordinates('35806');
  const containerStyle = {
    width: '100%',
    height: '100vh', // Full height of the viewport
  };

  const center = {
    lat: 37.7749, // Center of the map (San Francisco)
    lng: -122.4194,
  };
  return (
    <LoadScript
      googleMapsApiKey={apiGoogleKey}
      onLoad={handleGoogleMapsLoaded}
      key={isGoogleMapsLoaded ? 'loaded' : 'loading'}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} options={{ styles: darkModeStyle }}>
        {/* Define the Polygon with red color */}
        <PolygonF
          paths={polygonCoords}
          options={{
            strokeColor: '#FF0000', // Red border color of the polygon
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000', // Red fill color of the polygon
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}
