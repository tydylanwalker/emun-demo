import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { getDivisions } from '../../../store/slices/dataSlice';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { LoadScript, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

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

const apiAxiosKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Replace with your actual OpenCage API key
const apiGoogleKey = 'AIzaSyCiress-B17tqnGC-U-qMIXCQNqJUUCSoo'; // Replace with your actual OpenCage API key

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerClick }) => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [coordinates, setCoordinates] = useState<MarkerData[]>([]); // Coordinates for the markers
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false); // Track if Google Maps is loaded

  const defaultCenter = { lat: 34.7749, lng: -86.601791 }; // Default center (San Francisco)

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
    // Fetch coordinates from the Google Geocoding API
    const allCoordinates: MarkerData[] = [];
    if (googleMapsLoaded) {
      const fetchCoordinates = async () => {
        if (!window.google || !window.google.maps) {
          console.error('Google Maps API is not loaded yet.');
          return;
        }

        for (let division of uniqueDivisions) {
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
  }, [googleMapsLoaded]);

  // Handle marker click to show InfoWindow
  const handleMarkerClick = (marker: MarkerData) => {
    onMarkerClick(marker);
    setSelectedMarker(marker);
    console.log(marker.title);
  };

  return (
    <LoadScript googleMapsApiKey={apiGoogleKey}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '50%', height: '1000px' }}>
        <GoogleMap
          mapContainerStyle={{ flex: 1, height: '100%' }}
          zoom={12}
          center={defaultCenter}
          options={{
            styles: darkModeStyle, // Apply dark theme styles
          }}
        >
          {/* Example of a Marker */}
          {coordinates.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              onClick={() => handleMarkerClick(marker)}
            />
          ))}
          {/* {points.map((point) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            onClick={() => handleMarkerClick(point)}
            title={point.label}
            icon='/logo.svg'
          />
        ))} */}

          {/* InfoWindow to show when a marker is clicked */}
          {selectedMarker && (
            <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
              <div>
                <h2>{selectedMarker.title}</h2>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

interface MapComponentProps {
  onMarkerClick: (marker: MarkerData) => void; // Define the prop type for the click handler
}

export default MapComponent;
