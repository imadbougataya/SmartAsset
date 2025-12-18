import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LocationEvent from './location-event';
import LocationEventDetail from './location-event-detail';
import LocationEventUpdate from './location-event-update';
import LocationEventDeleteDialog from './location-event-delete-dialog';

const LocationEventRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LocationEvent />} />
    <Route path="new" element={<LocationEventUpdate />} />
    <Route path=":id">
      <Route index element={<LocationEventDetail />} />
      <Route path="edit" element={<LocationEventUpdate />} />
      <Route path="delete" element={<LocationEventDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LocationEventRoutes;
