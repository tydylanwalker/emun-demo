import React, { useEffect, useState } from 'react';
import { getDivisions } from '../../../store/slices/dataSlice';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { LoadScript, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { Button, IconButton, Stack, TableCell, Typography } from '@mui/material';
import { DeleteOutlineRounded } from '@mui/icons-material';
import { head } from 'lodash';
import { IDivision } from '../../../data/interfaces/IDivision';

const darkModeStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#BDBDBD',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#7F7F7F',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#9E9E9E',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9E9E9E',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

export interface MarkerData {
  id: string;
  title: string;
  position: google.maps.LatLngLiteral;
}

const apiGoogleKey = process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string;

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerClick }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [coordinates, setCoordinates] = useState<MarkerData[]>([]);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [territories, setTerritories] = useState<String[]>([]);

  const defaultCenter = { lat: 34.7749, lng: -86.601791 };

  const divisions = useAppSelector(getDivisions);

  const uniqueDivisions = divisions.filter(
    (value, index, self) => index === self.findIndex((division) => division.zip === value.zip)
  );

  useEffect(() => {
    // Ensure Google Maps API is loaded before calling Geocoder
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const filteredDivisions = divisions
      .filter((division) => division.zip === selectedMarker?.id)
      .map((division) => division.territory);
    const territories = filteredDivisions.filter(
      (value, index, self) => index === self.findIndex((territory) => territory === value)
    );
    setTerritories(territories);
  }, [selectedMarker]);

  useEffect(() => {
    // Fetch coordinates from the Google Geocoding API
    const allCoordinates: MarkerData[] = [];
    if (googleMapsLoaded) {
      const fetchCoordinates = async () => {
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API is not loaded yet.');
          return;
        }

        for (const division of uniqueDivisions) {
          try {
            const geocoder = new google.maps.Geocoder();
            const results = await geocoder.geocode({ address: division.zip });

            if (results && results.results[0]) {
              const { lat, lng } = results.results[0].geometry.location;
              allCoordinates.push({
                id: division.zip,
                title: division.division,
                position: { lat: lat(), lng: lng() },
              });
            }
          } catch (err) {
            console.log(err);
          }
        }

        setCoordinates(allCoordinates);
      };

      fetchCoordinates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMapsLoaded]);

  // Handle marker click to show InfoWindow
  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    onMarkerClick(marker);
    console.log(marker.title);
  };

  return (
    <LoadScript googleMapsApiKey={apiGoogleKey}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '50%', height: '100vh' }}>
        <GoogleMap
          mapContainerStyle={{ flexGrow: 1, height: '100%' }}
          zoom={12}
          center={defaultCenter}
          options={{
            styles: darkModeStyle,
          }}
        >
          {coordinates.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow zIndex={10000} position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
              <Stack padding={2} textAlign={'left'}>
                <Typography color='black' fontSize={'12px'}>
                  {selectedMarker.id} is contained in the following territories
                </Typography>

                {territories.map((territory, index) => (
                  <Stack direction={'row'}>
                    <Typography color='black' fontSize={'12px'}>
                      • {territory}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

interface MapComponentProps {
  onMarkerClick: (marker: MarkerData) => void;
}

export default MapComponent;
