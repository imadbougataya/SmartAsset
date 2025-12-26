import React from 'react';
import { Translate } from 'react-jhipster';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { MenuSection } from './menu-section';

const EntitiesMenu = () => {
  return (
    <>
      {/* =========================
          RÉFÉRENTIEL INDUSTRIEL
         ========================= */}
      <MenuSection title="Référentiel industriel" />

      <MenuItem icon="industry" to="/site">
        <Translate contentKey="global.menu.entities.site" />
      </MenuItem>
      <MenuItem icon="project-diagram" to="/production-line">
        <Translate contentKey="global.menu.entities.productionLine" />
      </MenuItem>
      <MenuItem icon="map-marked-alt" to="/zone">
        <Translate contentKey="global.menu.entities.zone" />
      </MenuItem>

      {/* =========================
          ACTIFS & ÉQUIPEMENTS
         ========================= */}
      <MenuSection title="Actifs & équipements" />

      <MenuItem icon="cogs" to="/asset">
        <Translate contentKey="global.menu.entities.asset" />
      </MenuItem>

      {/* =========================
          INVENTAIRE
         ========================= */}
      <MenuSection title="Inventaire" />

      <MenuItem icon="boxes" to="/inventory/by-zone">
        Inventaire des actifs par zone
      </MenuItem>

      <MenuItem icon="warehouse" to="/inventory/by-site">
        Inventaire des actifs par site
      </MenuItem>

      {/* =========================
          INFRASTRUCTURE IOT
         ========================= */}
      <MenuSection title="Infrastructure IoT" />

      <MenuItem icon="wifi" to="/gateway">
        <Translate contentKey="global.menu.entities.gateway" />
      </MenuItem>
      <MenuItem icon="microchip" to="/sensor">
        <Translate contentKey="global.menu.entities.sensor" />
      </MenuItem>
      <MenuItem icon="chart-line" to="/sensor-measurement">
        <Translate contentKey="global.menu.entities.sensorMeasurement" />
      </MenuItem>

      {/* =========================
          LOCALISATION & ÉVÉNEMENTS
         ========================= */}
      <MenuSection title="Localisation & événements" />

      <MenuItem icon="map-marker-alt" to="/location-event">
        <Translate contentKey="global.menu.entities.locationEvent" />
      </MenuItem>
      <MenuItem icon="exclamation-triangle" to="/system-event">
        <Translate contentKey="global.menu.entities.systemEvent" />
      </MenuItem>

      {/* =========================
          MAINTENANCE
         ========================= */}
      <MenuSection title="Maintenance" />

      <MenuItem icon="tools" to="/maintenance-event">
        <Translate contentKey="global.menu.entities.maintenanceEvent" />
      </MenuItem>

      {/* =========================
          DOCUMENTATION
         ========================= */}
      <MenuSection title="Documentation" />

      <MenuItem icon="file-alt" to="/document">
        <Translate contentKey="global.menu.entities.document" />
      </MenuItem>
      <MenuItem icon="link" to="/document-link">
        <Translate contentKey="global.menu.entities.documentLink" />
      </MenuItem>

      {/* =========================
          WORKFLOWS
         ========================= */}
      <MenuSection title="Workflows & demandes" />

      <MenuItem icon="exchange-alt" to="/asset-movement-request">
        <Translate contentKey="global.menu.entities.assetMovementRequest" />
      </MenuItem>

      {/* jhipster-needle-add-entity-to-menu */}
    </>
  );
};

export default EntitiesMenu;
