import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './asset-movement-request.reducer';

export const AssetMovementRequest = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const assetMovementRequestList = useAppSelector(state => state.assetMovementRequest.entities);
  const loading = useAppSelector(state => state.assetMovementRequest.loading);
  const totalItems = useAppSelector(state => state.assetMovementRequest.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="asset-movement-request-heading" data-cy="AssetMovementRequestHeading">
        <Translate contentKey="smartassetcoreApp.assetMovementRequest.home.title">Asset Movement Requests</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="smartassetcoreApp.assetMovementRequest.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/asset-movement-request/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartassetcoreApp.assetMovementRequest.home.createLabel">Create new Asset Movement Request</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assetMovementRequestList && assetMovementRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('requestedAt')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.requestedAt">Requested At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('requestedAt')} />
                </th>
                <th className="hand" onClick={sort('reason')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.reason">Reason</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('reason')} />
                </th>
                <th className="hand" onClick={sort('fromLocationLabel')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.fromLocationLabel">From Location Label</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fromLocationLabel')} />
                </th>
                <th className="hand" onClick={sort('toLocationLabel')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.toLocationLabel">To Location Label</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('toLocationLabel')} />
                </th>
                <th className="hand" onClick={sort('esignWorkflowId')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.esignWorkflowId">Esign Workflow Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('esignWorkflowId')} />
                </th>
                <th className="hand" onClick={sort('esignStatus')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.esignStatus">Esign Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('esignStatus')} />
                </th>
                <th className="hand" onClick={sort('esignLastUpdate')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.esignLastUpdate">Esign Last Update</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('esignLastUpdate')} />
                </th>
                <th className="hand" onClick={sort('signedAt')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.signedAt">Signed At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('signedAt')} />
                </th>
                <th className="hand" onClick={sort('executedAt')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.executedAt">Executed At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('executedAt')} />
                </th>
                <th className="hand" onClick={sort('requestedBy')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.requestedBy">Requested By</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('requestedBy')} />
                </th>
                <th className="hand" onClick={sort('approvedBy')}>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.approvedBy">Approved By</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('approvedBy')} />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.assetMovementRequest.asset">Asset</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assetMovementRequestList.map((assetMovementRequest, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/asset-movement-request/${assetMovementRequest.id}`} color="link" size="sm">
                      {assetMovementRequest.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.MovementRequestStatus.${assetMovementRequest.status}`} />
                  </td>
                  <td>
                    {assetMovementRequest.requestedAt ? (
                      <TextFormat type="date" value={assetMovementRequest.requestedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{assetMovementRequest.reason}</td>
                  <td>{assetMovementRequest.fromLocationLabel}</td>
                  <td>{assetMovementRequest.toLocationLabel}</td>
                  <td>{assetMovementRequest.esignWorkflowId}</td>
                  <td>{assetMovementRequest.esignStatus}</td>
                  <td>
                    {assetMovementRequest.esignLastUpdate ? (
                      <TextFormat type="date" value={assetMovementRequest.esignLastUpdate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {assetMovementRequest.signedAt ? (
                      <TextFormat type="date" value={assetMovementRequest.signedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {assetMovementRequest.executedAt ? (
                      <TextFormat type="date" value={assetMovementRequest.executedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{assetMovementRequest.requestedBy}</td>
                  <td>{assetMovementRequest.approvedBy}</td>
                  <td>
                    {assetMovementRequest.asset ? (
                      <Link to={`/asset/${assetMovementRequest.asset.id}`}>{assetMovementRequest.asset.assetCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/asset-movement-request/${assetMovementRequest.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/asset-movement-request/${assetMovementRequest.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/asset-movement-request/${assetMovementRequest.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
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
              <Translate contentKey="smartassetcoreApp.assetMovementRequest.home.notFound">No Asset Movement Requests found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={assetMovementRequestList && assetMovementRequestList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default AssetMovementRequest;
