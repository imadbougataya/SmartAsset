import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix icône Leaflet (obligatoire avec webpack)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 📍 Coordonnées Jorf Lasfar
const JORF_LASFAR_POSITION: [number, number] = [33.1147, -8.6396];

// ⚙️ Équipements simulés (POC)
const assets = [
  { id: 1, name: 'Pompe P-458', position: [33.1152, -8.6401] },
  { id: 2, name: 'Compresseur C-12', position: [33.1142, -8.6389] },
  { id: 3, name: 'Moteur M-102', position: [33.1158, -8.6392] },
];

export const SiteMap = () => {
  return (
    <MapContainer center={JORF_LASFAR_POSITION} zoom={16} scrollWheelZoom={false}>
      <TileLayer attribution="© OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Site */}
      <Marker position={JORF_LASFAR_POSITION}>
        <Popup>
          <strong>Site industriel Jorf Lasfar</strong>
        </Popup>
      </Marker>

      {/* Équipements */}
      {assets.map(asset => (
        <Marker key={asset.id} position={asset.position as [number, number]}>
          <Popup>
            <strong>{asset.name}</strong>
            <br />
            Localisation connue
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default SiteMap;
