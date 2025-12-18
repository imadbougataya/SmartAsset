import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { TextFormat, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './document-link.reducer';

export const DocumentLink = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const documentLinkList = useAppSelector(state => state.documentLink.entities);
  const loading = useAppSelector(state => state.documentLink.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="document-link-heading" data-cy="DocumentLinkHeading">
        <Translate contentKey="smartassetcoreApp.documentLink.home.title">Document Links</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="smartassetcoreApp.documentLink.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/document-link/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartassetcoreApp.documentLink.home.createLabel">Create new Document Link</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {documentLinkList && documentLinkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="smartassetcoreApp.documentLink.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('entityType')}>
                  <Translate contentKey="smartassetcoreApp.documentLink.entityType">Entity Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('entityType')} />
                </th>
                <th className="hand" onClick={sort('entityId')}>
                  <Translate contentKey="smartassetcoreApp.documentLink.entityId">Entity Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('entityId')} />
                </th>
                <th className="hand" onClick={sort('label')}>
                  <Translate contentKey="smartassetcoreApp.documentLink.label">Label</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('label')} />
                </th>
                <th className="hand" onClick={sort('linkedAt')}>
                  <Translate contentKey="smartassetcoreApp.documentLink.linkedAt">Linked At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('linkedAt')} />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.documentLink.document">Document</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {documentLinkList.map((documentLink, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/document-link/${documentLink.id}`} color="link" size="sm">
                      {documentLink.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.DocumentEntityType.${documentLink.entityType}`} />
                  </td>
                  <td>{documentLink.entityId}</td>
                  <td>{documentLink.label}</td>
                  <td>
                    {documentLink.linkedAt ? <TextFormat type="date" value={documentLink.linkedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {documentLink.document ? (
                      <Link to={`/document/${documentLink.document.id}`}>{documentLink.document.fileName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/document-link/${documentLink.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/document-link/${documentLink.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/document-link/${documentLink.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="smartassetcoreApp.documentLink.home.notFound">No Document Links found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DocumentLink;
