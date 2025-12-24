import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, LayersControl, LayerGroup } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

/* ================= FIX ICONS ================= */

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/content/images/leaflet/marker-icon-2x.png',
  iconUrl: '/content/images/leaflet/marker-icon.png',
  shadowUrl: '/content/images/leaflet/marker-shadow.png',
});

const { Overlay } = LayersControl;

/* ================= GEO BASE ================= */

/**
 * Centre logique terrestre du site industriel Jorf Lasfar
 */
const JORF_LASFAR_POSITION: LatLngTuple = [33.1078, -8.6105];

/**
 * Polygone EXACT du site industriel (fourni par toi)
 */
const SITE_POLYGON: LatLngTuple[] = [
  [33.13856, -8.61259], // Nord
  [33.1081, -8.57861], // Est
  [33.0769, -8.60229], // Sud
  [33.10161, -8.64401], // Ouest
];

/* ================= ZONES (RECTANGLES DANS LE SITE) ================= */

const ZONES: {
  id: number;
  name: string;
  color: string;
  coordinates: LatLngTuple[];
}[] = [
  {
    id: 1,
    name: 'Zone Nord – Magasin',
    color: '#2563eb',
    coordinates: [
      [33.1158, -8.6045], // NW
      [33.1158, -8.6008], // NE
      [33.1126, -8.6008], // SE
      [33.1126, -8.6045], // SW
    ],
  },
  {
    id: 2,
    name: 'Zone Sud – Atelier Maintenance',
    color: '#16a34a',
    coordinates: [
      [33.1016, -8.6135], // NW
      [33.1016, -8.6098], // NE
      [33.0984, -8.6098], // SE
      [33.0984, -8.6135], // SW
    ],
  },
];

/* ================= GATEWAYS BLE (DANS LES ZONES) ================= */

const GATEWAYS: {
  id: number;
  name: string;
  position: LatLngTuple;
  radius: number;
}[] = [
  {
    id: 1,
    name: 'Gateway BLE – Magasin',
    position: [33.1142, -8.6026], // centre zone 1
    radius: 60,
  },
  {
    id: 2,
    name: 'Gateway BLE – Maintenance',
    position: [33.1, -8.6116], // centre zone 2
    radius: 60,
  },
];

/* ================= ASSETS ================= */

const ASSETS: {
  id: number;
  name: string;
  position: LatLngTuple;
}[] = [
  {
    id: 1,
    name: 'Pompe P-102',
    position: [33.1146, -8.6032], // zone 1
  },
  {
    id: 2,
    name: 'Moteur M-87',
    position: [33.0992, -8.6109], // zone 2
  },
  {
    id: 3,
    name: 'Compresseur C-55',
    position: [33.1062, -8.6205], // dans le site, hors zones
  },
];

/* ================= COMPONENT ================= */

const SiteMap = () => {
  const [legendOpen, setLegendOpen] = useState(false);

  return (
    <MapContainer className="ocp-map-container" center={JORF_LASFAR_POSITION} zoom={13} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ================= LAYERS ================= */}

      <LayersControl position="topright" collapsed>
        <Overlay checked name="🏭 Site">
          <LayerGroup>
            <Polygon positions={SITE_POLYGON} pathOptions={{ color: '#14532d', weight: 3, fillOpacity: 0.08 }} />
          </LayerGroup>
        </Overlay>

        <Overlay checked name="🗺️ Zones">
          <LayerGroup>
            {ZONES.map(zone => (
              <Polygon key={zone.id} positions={zone.coordinates} pathOptions={{ color: zone.color, fillOpacity: 0.35 }}>
                <Popup>{zone.name}</Popup>
              </Polygon>
            ))}
          </LayerGroup>
        </Overlay>

        <Overlay checked name="📡 Gateways BLE">
          <LayerGroup>
            {GATEWAYS.map(gateway => (
              <React.Fragment key={gateway.id}>
                <Marker position={gateway.position}>
                  <Popup>{gateway.name}</Popup>
                </Marker>
                <Circle center={gateway.position} radius={gateway.radius} pathOptions={{ color: '#2563eb', fillOpacity: 0.15 }} />
              </React.Fragment>
            ))}
          </LayerGroup>
        </Overlay>

        <Overlay checked name="📦 Actifs">
          <LayerGroup>
            {ASSETS.map(asset => (
              <Marker key={asset.id} position={asset.position}>
                <Popup>{asset.name}</Popup>
              </Marker>
            ))}
          </LayerGroup>
        </Overlay>
      </LayersControl>

      {/* ================= LÉGENDE UX ================= */}

      <div className="map-legend leaflet-bottom leaflet-right">
        <div className="leaflet-control leaflet-bar map-legend-box" onClick={() => setLegendOpen(!legendOpen)} role="button" tabIndex={0}>
          {!legendOpen && <span title="Afficher la légende">☰</span>}

          {legendOpen && (
            <>
              <strong>Légende</strong>
              <div>
                <span className="legend-site" /> Site industriel
              </div>
              <div>
                <span className="legend-zone" /> Zones
              </div>
              <div>
                <span className="legend-gateway" /> Gateways BLE
              </div>
              <div>
                <span className="legend-asset" /> Actifs
              </div>
            </>
          )}
        </div>
      </div>
    </MapContainer>
  );
};

export default SiteMap;
