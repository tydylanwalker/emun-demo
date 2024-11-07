import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet for custom icons (optional)
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { getDivisions } from '../../../store/slices/dataSlice';
import { useAppSelector } from '../../../hooks/ReduxHooks';
import { IDivision } from '../../../data/interfaces/IDivision';
import { Divider, Stack, Typography } from '@mui/material';
import { DivisionsTable } from './DivisionsTable';

interface Point {
  id: number;
  lat: number;
  lng: number;
  label: string;
}

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; // Replace with your actual OpenCage API key

const MapComponent: React.FC = () => {
  // Define the center of the map and zoom level
  const divisions = useAppSelector(getDivisions);
  let divs = divisions;

  const [points, setPoints] = useState<Point[]>([]);
  const [selectedZip, setSelectedZip] = useState<string | null>(null);

  const uniqueZipCodes = divisions.filter(
    (value, index, self) => index === self.findIndex((division) => division.zip === value.zip)
  );
  console.log(uniqueZipCodes);
  var defaultIcon = new L.Icon({
    iconUrl: '/logo.svg', // Path to the PNG file in the public directory
    iconSize: [100, 100], // Icon size
    iconAnchor: [16, 32], // Icon anchor point (adjust as needed)
    popupAnchor: [16, 32], // Position of the popup relative to the icon
  });

  function getPoints(divisions: IDivision[]) {
    divisions.forEach((division) => {
      console.log(division);
      fetchCoordinates(division.zip);
    });
  }

  const center = { lat: 34.7304, lng: -86.5861 }; // Center of the map (US)
  const zoom = 6;

  const handleMarkerClick = (point: Point) => {
    // Update the state with the selected point
    setSelectedZip(point.label);
  };

  const fetchCoordinates = async (zipCode: string) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${apiKey}&no_annotations=1`
      );

      if (response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        const newPoint: Point = {
          id: parseInt(zipCode),
          lat: lat,
          lng: lng,
          label: zipCode,
        };
        setPoints((prevPoints) => [...prevPoints, newPoint]); // Add the new number immutably
      }
    } catch (err) {
      console.log('Error fetching data');
    }
  };

  useEffect(() => {
    getPoints(uniqueZipCodes); // Call the async function
  }, []);

  return (
    <Stack spacing={{ xs: 1, sm: 2 }} overflow={'auto'}>
      <Typography fontSize={30} fontWeight={200} color='text.secondary'>
        Divisions
      </Typography>
      <Divider></Divider>
      {points ? (
        <div style={{ height: '400px', width: '70%', borderRadius: '4px' }}>
          {/* MapContainer is the container for the Leaflet map */}
          <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            {/* TileLayer is the background layer of the map (OpenStreetMap tiles in this case) */}
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Add markers to the map for each point */}
            {points.map((point) => (
              <Marker
                key={point.id}
                position={{ lat: point.lat, lng: point.lng }}
                icon={defaultIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(point), // Handle click on marker
                }}
              >
                {/* Popup is the label for each marker */}
                <Popup>
                  {' '}
                  <div style={{ width: '200px', textAlign: 'center', backgroundColor: 'secondary.main' }}>
                    <h3>{point.label}</h3>
                  </div>
                </Popup>
                <Typography>AAAA</Typography>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : null}
      <DivisionsTable divisions={divisions.filter((division) => division.zip == selectedZip)}></DivisionsTable>
    </Stack>
  );
};

export default MapComponent;
