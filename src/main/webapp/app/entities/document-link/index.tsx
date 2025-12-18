import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DocumentLink from './document-link';
import DocumentLinkDetail from './document-link-detail';
import DocumentLinkUpdate from './document-link-update';
import DocumentLinkDeleteDialog from './document-link-delete-dialog';

const DocumentLinkRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DocumentLink />} />
    <Route path="new" element={<DocumentLinkUpdate />} />
    <Route path=":id">
      <Route index element={<DocumentLinkDetail />} />
      <Route path="edit" element={<DocumentLinkUpdate />} />
      <Route path="delete" element={<DocumentLinkDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DocumentLinkRoutes;
