import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Site from './site';
import ProductionLine from './production-line';
import Zone from './zone';
import Gateway from './gateway';
import Asset from './asset';
import Sensor from './sensor';
import SensorMeasurement from './sensor-measurement';
import MaintenanceEvent from './maintenance-event';
import Document from './document';
import DocumentLink from './document-link';
import AssetMovementRequest from './asset-movement-request';
import LocationEvent from './location-event';
import SystemEvent from './system-event';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="site/*" element={<Site />} />
        <Route path="production-line/*" element={<ProductionLine />} />
        <Route path="zone/*" element={<Zone />} />
        <Route path="gateway/*" element={<Gateway />} />
        <Route path="asset/*" element={<Asset />} />
        <Route path="sensor/*" element={<Sensor />} />
        <Route path="sensor-measurement/*" element={<SensorMeasurement />} />
        <Route path="maintenance-event/*" element={<MaintenanceEvent />} />
        <Route path="document/*" element={<Document />} />
        <Route path="document-link/*" element={<DocumentLink />} />
        <Route path="asset-movement-request/*" element={<AssetMovementRequest />} />
        <Route path="location-event/*" element={<LocationEvent />} />
        <Route path="system-event/*" element={<SystemEvent />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
