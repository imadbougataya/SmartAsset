import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../../../content/css/global.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
});

const JORF_LASFAR_POSITION: [number, number] = [33.1147, -8.6396];

const SiteMap = () => {
  return (
    <MapContainer className="ocp-map-container" center={JORF_LASFAR_POSITION} zoom={12} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={JORF_LASFAR_POSITION}>
        <Popup>Site industriel Jorf Lasfar</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SiteMap;
