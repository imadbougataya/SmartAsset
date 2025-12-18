import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MaintenanceEvent from './maintenance-event';
import MaintenanceEventDetail from './maintenance-event-detail';
import MaintenanceEventUpdate from './maintenance-event-update';
import MaintenanceEventDeleteDialog from './maintenance-event-delete-dialog';

const MaintenanceEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MaintenanceEvent />} />
    <Route path="new" element={<MaintenanceEventUpdate />} />
    <Route path=":id">
      <Route index element={<MaintenanceEventDetail />} />
      <Route path="edit" element={<MaintenanceEventUpdate />} />
      <Route path="delete" element={<MaintenanceEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MaintenanceEventRoutes;
