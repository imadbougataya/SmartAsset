import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SensorMeasurement from './sensor-measurement';
import SensorMeasurementDetail from './sensor-measurement-detail';
import SensorMeasurementUpdate from './sensor-measurement-update';
import SensorMeasurementDeleteDialog from './sensor-measurement-delete-dialog';

const SensorMeasurementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SensorMeasurement />} />
    <Route path="new" element={<SensorMeasurementUpdate />} />
    <Route path=":id">
      <Route index element={<SensorMeasurementDetail />} />
      <Route path="edit" element={<SensorMeasurementUpdate />} />
      <Route path="delete" element={<SensorMeasurementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SensorMeasurementRoutes;
