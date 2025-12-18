import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Gateway from './gateway';
import GatewayDetail from './gateway-detail';
import GatewayUpdate from './gateway-update';
import GatewayDeleteDialog from './gateway-delete-dialog';

const GatewayRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Gateway />} />
    <Route path="new" element={<GatewayUpdate />} />
    <Route path=":id">
      <Route index element={<GatewayDetail />} />
      <Route path="edit" element={<GatewayUpdate />} />
      <Route path="delete" element={<GatewayDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GatewayRoutes;
