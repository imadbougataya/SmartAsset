import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/site">
        <Translate contentKey="global.menu.entities.site" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/production-line">
        <Translate contentKey="global.menu.entities.productionLine" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/zone">
        <Translate contentKey="global.menu.entities.zone" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/gateway">
        <Translate contentKey="global.menu.entities.gateway" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset">
        <Translate contentKey="global.menu.entities.asset" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/sensor">
        <Translate contentKey="global.menu.entities.sensor" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/sensor-measurement">
        <Translate contentKey="global.menu.entities.sensorMeasurement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/maintenance-event">
        <Translate contentKey="global.menu.entities.maintenanceEvent" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/document">
        <Translate contentKey="global.menu.entities.document" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/document-link">
        <Translate contentKey="global.menu.entities.documentLink" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/asset-movement-request">
        <Translate contentKey="global.menu.entities.assetMovementRequest" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/location-event">
        <Translate contentKey="global.menu.entities.locationEvent" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/system-event">
        <Translate contentKey="global.menu.entities.systemEvent" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
