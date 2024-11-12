import React, { useEffect, useState, useCallback } from 'react';
import { LoadScript, GoogleMap, InfoWindow, Marker, Polygon } from '@react-google-maps/api';
import { Stack, Typography } from '@mui/material';
import { darkModeStyle } from './constants';
import { findColorAndTitleForMarker } from '../../../functions/findColorAndTitleForMarker';
import { IDivision } from '../../../data/interfaces/IDivision';

export interface MarkerData {
  zipCode: string;
  existsIn: IDivision[];
  position: google.maps.LatLngLiteral;
  color: string;
}

const apiGoogleKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string;

export function DivisionMap(props: IDivisionMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [coordinates, setCoordinates] = useState<MarkerData[]>([]);
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [polygonData, setPolygonData] = useState<google.maps.LatLng[]>([]);

  const fetchCoordinates = useCallback(async () => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    if (!geocoder) return;

    const allCoordinates: MarkerData[] = [];

    const uniqueZipCodes = props.data.filter(
      (value, index, self) => index === self.findIndex((division) => division.zip === value.zip)
    );

    for (const division of uniqueZipCodes) {
      try {
        const results = await geocoder.geocode({ address: division.zip });
        if (results && results.results[0]) {
          const { lat, lng } = results.results[0].geometry.location;
          const { color, title } = findColorAndTitleForMarker(props.data, division.zip);
          allCoordinates.push({
            zipCode: division.zip,
            existsIn: title || [],
            position: { lat: lat(), lng: lng() },
            color: color,
          });
        } else {
          console.warn(`No results for ZIP code ${division.zip}`);
        }
      } catch (err) {
        console.error(`Error geocoding ${division.zip}:`, err);
      }
    }

    setCoordinates(allCoordinates);
  }, [props.data]);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      fetchCoordinates();
    }
  }, [isGoogleMapsLoaded, fetchCoordinates]);

  // useEffect(() => {
  //   // Example ZIP code: San Francisco (94110)
  //   const fetchZipCodeBoundary = async () => {
  //     const url = `https://vanitysoft-boundaries-io-v1.p.rapidapi.com/rest/v1/public/boundary/zipcode?zipcode=35806`; //%2C%2035824

  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'x-rapidapi-key': '1a00a66ac9msha1b5417e8b50d15p161d9fjsn0a7ce16c3d44',
  //         'x-rapidapi-host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com',
  //       },
  //     });

  //     const data = await response.json();
  //     const coordinates: [number, number][] = data.features[0].geometry.coordinates[1];
  //     const latLngArray = coordinates.map(([lat, lng]) => new google.maps.LatLng(lat, lng));

  //     console.log(latLngArray);

  //     setZipCodeBoundary(latLngArray); // Assuming the boundary is an array of lat/lng pairs
  //   };

  //   fetchZipCodeBoundary();
  // }, []);
  const geo_coordinates = [
    [-86.728989, 34.801126],
    [-86.729398, 34.801127],
    [-86.729905, 34.801129],
    [-86.729988, 34.801129],
    [-86.730827, 34.801134],
    [-86.730926, 34.801132],
    [-86.731599, 34.801134],
    [-86.732906, 34.801131],
    [-86.732894, 34.801246],
    [-86.732914, 34.801361],
    [-86.732908, 34.801685],
    [-86.732935, 34.801883],
    [-86.732908, 34.802268],
    [-86.732922, 34.802378],
    [-86.733082, 34.802796],
    [-86.733089, 34.803741],
    [-86.733203, 34.804027],
    [-86.733203, 34.804373],
    [-86.733223, 34.804538],
    [-86.733276, 34.804643],
    [-86.73335, 34.804703],
    [-86.731689, 34.8051],
    [-86.731077, 34.805958],
    [-86.726551, 34.805933],
    [-86.724871, 34.804023],
    [-86.724069, 34.804216],
    [-86.724084, 34.804142],
    [-86.724069, 34.803701],
    [-86.724036, 34.803626],
    [-86.723965, 34.803578],
    [-86.723893, 34.803559],
    [-86.723678, 34.803543],
    [-86.723595, 34.80349],
    [-86.723579, 34.803422],
    [-86.723543, 34.802741],
    [-86.723528, 34.802158],
    [-86.723542, 34.801262],
    [-86.723537, 34.801116],
    [-86.723664, 34.801113],
    [-86.723994, 34.801095],
    [-86.724222, 34.801083],
    [-86.724348, 34.801073],
    [-86.7249, 34.801033],
    [-86.725303, 34.801011],
    [-86.725794, 34.801016],
    [-86.726401, 34.801072],
    [-86.726534, 34.801081],
    [-86.727036, 34.801105],
    [-86.727201, 34.80111],
    [-86.727819, 34.801116],
    [-86.728989, 34.801126],
  ];

  // Once the map is loaded, we can set the polygon data
  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const latLngArray = geo_coordinates.map(([lat, lng]) => new window.google.maps.LatLng(lat, lng));

    setPolygonData(latLngArray);
    console.log(latLngArray);
  }, []);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const handleGoogleMapsLoaded = () => {
    setGoogleMapsLoaded(true);
  };

  return (
    <LoadScript
      googleMapsApiKey={apiGoogleKey}
      onLoad={handleGoogleMapsLoaded}
      key={isGoogleMapsLoaded ? 'loaded' : 'loading'} // Forces re-mount on each change
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ flexGrow: 1, height: '100%' }}
          zoom={12}
          center={coordinates.length > 0 ? coordinates[0].position : { lat: 0, lng: 0 }}
          options={{ styles: darkModeStyle }}
        >
          {coordinates.map((marker) => (
            <Marker
              key={marker.zipCode}
              position={marker.position}
              onClick={() => handleMarkerClick(marker)}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}

          {polygonData && (
            <Polygon
              paths={polygonData} // An array of lat/lng points
              options={{
                fillColor: '#FF0000',
                fillOpacity: 0.6, // Increase opacity to ensure it's visible
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}

          {selectedMarker && (
            <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
              <Stack paddingX={1} paddingBottom={1} gap={3} whiteSpace='nowrap'>
                <Typography variant='h6' color='#252525' pb={0.5} borderBottom={1}>
                  {selectedMarker.zipCode}
                </Typography>
                {selectedMarker.existsIn.length > 0 ? (
                  <Stack minWidth='15rem'>
                    <Stack direction='row' justifyContent='space-between' flexGrow={1}>
                      <Typography fontSize='1rem' fontWeight='bold' color='#252525'>
                        Territories
                      </Typography>
                      <Typography fontSize='1rem' fontWeight='bold' color='#252525'>
                        Reps
                      </Typography>
                    </Stack>
                    {selectedMarker.existsIn.map((item) => (
                      <Stack key={item.guid} direction='row' justifyContent='space-between' flexGrow={1}>
                        <Typography variant='caption' color='#252525'>
                          {item.territory}
                        </Typography>
                        <Typography variant='caption' color='#252525'>
                          {item.rep}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography color='error'>DOES NOT EXIST IN ANY TERRITORIES</Typography>
                )}
              </Stack>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

interface IDivisionMapProps {
  onMarkerClick?: (marker: MarkerData) => void;
  data: IDivision[];
}
