import React, { useState, useCallback } from 'react';
import { LoadScript, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { Backdrop, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { darkModeStyle } from './constants';
import { findColorAndTitleForMarker } from '../../../functions/findColorAndTitleForMarker';
import { IDivision } from '../../../data/interfaces/IDivision';
import { createCustomMarker } from '../../../functions/createCustomMarker';

export interface MarkerData {
  zipCode: string;
  existsIn: IDivision[];
  position: google.maps.LatLngLiteral;
  color: string;
}

const apiGoogleKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string;

export function DivisionMap(props: IDivisionMapProps) {
  // const allZipCodes = useAppSelector(getZipCodes);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [coordinates, setCoordinates] = useState<MarkerData[]>([]);
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [coordinatesLoading, setCoordinatesLoading] = useState(false);

  // const fetchCoordinates = useCallback(async () => {
  //   if (!window.google || !window.google.maps) return;

  //   const allCoordinates: MarkerData[] = [];

  //   for (const zipCode of allZipCodes) {
  //     try {
  //       const { color, title } = findColorAndTitleForMarker(props.data, zipCode.Id);
  //       const coordinate = {
  //         zipCode: zipCode.Id,
  //         existsIn: title || [],
  //         position: { lat: zipCode.Latitude, lng: zipCode.Longitude },
  //         color: color,
  //       };
  //       allCoordinates.push(coordinate);
  //     } catch (err) {
  //       console.error(`Error plotting ${zipCode.Id}:`, err);
  //     }
  //   }

  //   setCoordinates(allCoordinates);
  //   // console.log(allCoordinates);
  // }, [allZipCodes, props.data]);
  const fetchCoordinates = useCallback(async () => {
    if (!window.google || !window.google.maps) return;
    setCoordinatesLoading(true);

    const geocoder = new window.google.maps.Geocoder();
    if (!geocoder) {
      console.error('Failed to initialize Geocoder.');
      return;
    }
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
          const coordinate = {
            zipCode: division.zip,
            existsIn: title || [],
            position: { lat: lat(), lng: lng() },
            color: color,
          };
          allCoordinates.push(coordinate);
        } else {
          console.warn(`No results for ZIP code ${division.zip}`);
        }
      } catch (err) {
        console.error(`Error geocoding ${division.zip}:`, err);
      }
    }

    setCoordinates(allCoordinates);
    setCoordinatesLoading(false);
  }, [props.data]);

  const handleGoogleMapsLoaded = () => {
    setGoogleMapsLoaded(true);
    fetchCoordinates(); // Ensure geocoding occurs after maps load
  };

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  return (
    <LoadScript
      googleMapsApiKey={apiGoogleKey}
      onLoad={handleGoogleMapsLoaded}
      key={isGoogleMapsLoaded ? 'loaded' : 'loading'}
    >
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', position: 'relative' }}>
        <Backdrop open={coordinatesLoading} sx={{ zIndex: 1000000000, position: 'absolute' }}>
          <CircularProgress />
        </Backdrop>
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
                url: createCustomMarker(marker.color),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}
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
                  <Stack gap={3} pb={2}>
                    <Typography color='error'>This Zip Code does not exist in any of your territories.</Typography>
                    <Stack direction='row' gap={2}>
                      <Button variant='outlined'>Add To Existing Territory</Button>
                      <Button variant='contained'>Add To NEW Territory</Button>
                    </Stack>
                  </Stack>
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
