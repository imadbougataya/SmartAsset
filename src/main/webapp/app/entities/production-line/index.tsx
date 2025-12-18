import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProductionLine from './production-line';
import ProductionLineDetail from './production-line-detail';
import ProductionLineUpdate from './production-line-update';
import ProductionLineDeleteDialog from './production-line-delete-dialog';

const ProductionLineRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProductionLine />} />
    <Route path="new" element={<ProductionLineUpdate />} />
    <Route path=":id">
      <Route index element={<ProductionLineDetail />} />
      <Route path="edit" element={<ProductionLineUpdate />} />
      <Route path="delete" element={<ProductionLineDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProductionLineRoutes;
