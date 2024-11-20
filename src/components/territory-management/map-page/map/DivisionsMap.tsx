import React, { useState, useCallback, useEffect } from 'react';
import { LoadScript, GoogleMap, InfoWindow, Marker, PolygonF } from '@react-google-maps/api';
import { Backdrop, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { darkModeStyle } from './constants';
import { findColorAndTitleForMarker } from '../../../../functions/findColorAndTitleForMarker';
import { IDivision } from '../../../../data/interfaces/IDivision';
import { createCustomMarker } from '../../../../functions/createCustomMarker';
import { isNullUndefinedOrEmpty } from '../../../../functions/isNullUndefinedOrEmpty';
import { getCoordinates, Coordinate } from '../../../../data/json/AL';

export interface MarkerData {
  zipCode: string;
  existsIn: IDivision[];
  position: google.maps.LatLngLiteral;
  color: string;
  polygon: Coordinate[] | undefined;
}

const apiGoogleKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string;

export function DivisionMap(props: IDivisionMapProps) {
  // const allZipCodes = useAppSelector(getZipCodes);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [coordinates, setCoordinates] = useState<MarkerData[]>([]);
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [coordinatesLoading, setCoordinatesLoading] = useState(false);

  const fetchCoordinates = useCallback(async () => {
    if (
      isNullUndefinedOrEmpty(window.google) ||
      isNullUndefinedOrEmpty(window.google.maps) ||
      isNullUndefinedOrEmpty(window.google.maps.Geocoder)
    ) {
      console.error('Google Maps or Geocoder is not available.');
      return;
    }
    const geocoder = new window.google.maps.Geocoder();
    if (isNullUndefinedOrEmpty(geocoder)) {
      console.error('Geocoder is still undefined.');
      return;
    }

    // Once everything is defined we end up here

    setCoordinatesLoading(true);
    const allCoordinates: MarkerData[] = [];

    const uniqueZipCodes = props.data.filter(
      (value, index, self) => index === self.findIndex((division) => division.zip === value.zip)
    );

    for (const division of uniqueZipCodes) {
      try {
        const results = await geocoder.geocode?.({ address: division.zip });
        if (results?.results?.[0]?.geometry?.location) {
          const { lat, lng } = results.results[0].geometry.location;
          const { color, title } = findColorAndTitleForMarker(props.data, division.zip);
          allCoordinates.push({
            zipCode: division.zip,
            existsIn: title || [],
            position: { lat: lat(), lng: lng() },
            color: color,
            polygon: getCoordinates(division.zip),
          });
        } else {
          console.warn(`No results for ZIP code ${division.zip}`);
        }
      } catch (err) {
        if ((err as any).message.includes('ZERO_RESULTS')) {
          console.warn(`ZERO_RESULTS for ZIP code ${division.zip}: No result was found.`);
        } else {
          console.warn(`Error geocoding ${division.zip}:`, err);
        }
      }
    }

    setCoordinates(allCoordinates);
    setCoordinatesLoading(false);
  }, [props.data]);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      fetchCoordinates();
    }
  }, [fetchCoordinates, isGoogleMapsLoaded]);

  const handleGoogleMapsLoaded = () => {
    setGoogleMapsLoaded(true);
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
          zoom={5}
          center={coordinates.length > 0 ? coordinates[0].position : { lat: 32.806671, lng: -86.79113 }}
          options={{ styles: darkModeStyle }}
        >
          {coordinates.map((marker) => (
            // <Marker
            //   key={marker.zipCode}
            //   position={marker.position}
            //   onClick={() => handleMarkerClick(marker)}
            //   icon={{
            //     url: createCustomMarker(marker.color),
            //     scaledSize: new window.google.maps.Size(50, 50),
            //   }}
            // />

            <PolygonF
              paths={marker.polygon}
              options={{
                strokeColor: marker.color, // Red border color of the polygon
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: marker.color, // Red fill color of the polygon
                fillOpacity: 0.35,
              }}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)} zIndex={10000}>
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
