// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';

// // Types for the points on the map
// interface MapPoint {
//   id: number;
//   lat: number;
//   lng: number;
//   label: string;
// }

// // Sample data for points to be displayed on the map
// const points: MapPoint[] = [
//   { id: 1, lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
//   { id: 2, lat: 40.7128, lng: -74.006, label: 'New York City' },
//   { id: 3, lat: 51.5074, lng: -0.1278, label: 'London' },
// ];

// const MapComponent: React.FC = () => {
//   // Default center of the map
//   const center = { lat: 39.8283, lng: -98.5795 }; // Center of the US
//   const zoom = 4; // Default zoom level

//   return (
//     <div style={{ height: '500px', width: '100%' }}>
//       <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
//         {/* Tile Layer (the base map) */}
//         <TileLayer
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Markers for each point */}
//         {points.map((point) => (
//           <Marker key={point.id} position={{ lat: point.lat, lng: point.lng }}>
//             <Popup>{point.label}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;
