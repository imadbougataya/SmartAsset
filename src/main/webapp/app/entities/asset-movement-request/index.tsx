import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetMovementRequest from './asset-movement-request';
import AssetMovementRequestDetail from './asset-movement-request-detail';
import AssetMovementRequestUpdate from './asset-movement-request-update';
import AssetMovementRequestDeleteDialog from './asset-movement-request-delete-dialog';

const AssetMovementRequestRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetMovementRequest />} />
    <Route path="new" element={<AssetMovementRequestUpdate />} />

    {/* ✅ ROUTE MÉTIER CONTEXTUALISÉE */}
    <Route path="from-asset/:assetId" element={<AssetMovementRequestUpdate />} />

    <Route path=":id">
      <Route index element={<AssetMovementRequestDetail />} />
      <Route path="edit" element={<AssetMovementRequestUpdate />} />
      <Route path="delete" element={<AssetMovementRequestDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetMovementRequestRoutes;
