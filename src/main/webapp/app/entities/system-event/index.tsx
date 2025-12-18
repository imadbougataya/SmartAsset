import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SystemEvent from './system-event';
import SystemEventDetail from './system-event-detail';
import SystemEventUpdate from './system-event-update';
import SystemEventDeleteDialog from './system-event-delete-dialog';

const SystemEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SystemEvent />} />
    <Route path="new" element={<SystemEventUpdate />} />
    <Route path=":id">
      <Route index element={<SystemEventDetail />} />
      <Route path="edit" element={<SystemEventUpdate />} />
      <Route path="delete" element={<SystemEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SystemEventRoutes;
