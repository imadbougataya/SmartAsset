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

import { getEntities } from './maintenance-event.reducer';

export const MaintenanceEvent = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const maintenanceEventList = useAppSelector(state => state.maintenanceEvent.entities);
  const loading = useAppSelector(state => state.maintenanceEvent.loading);
  const totalItems = useAppSelector(state => state.maintenanceEvent.totalItems);

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
      <h2 id="maintenance-event-heading" data-cy="MaintenanceEventHeading">
        <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.home.title">Maintenance Events</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/maintenance-event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.home.createLabel">Create new Maintenance Event</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {maintenanceEventList && maintenanceEventList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('maintenanceType')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.maintenanceType">Maintenance Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('maintenanceType')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('requestedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.requestedAt">Requested At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('requestedAt')} />
                </th>
                <th className="hand" onClick={sort('plannedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.plannedAt">Planned At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('plannedAt')} />
                </th>
                <th className="hand" onClick={sort('startedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.startedAt">Started At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('startedAt')} />
                </th>
                <th className="hand" onClick={sort('finishedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.finishedAt">Finished At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('finishedAt')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.title">Title</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('technician')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.technician">Technician</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('technician')} />
                </th>
                <th className="hand" onClick={sort('downtimeMinutes')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.downtimeMinutes">Downtime Minutes</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('downtimeMinutes')} />
                </th>
                <th className="hand" onClick={sort('costAmount')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.costAmount">Cost Amount</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('costAmount')} />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.notes">Notes</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('notes')} />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.asset">Asset</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {maintenanceEventList.map((maintenanceEvent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/maintenance-event/${maintenanceEvent.id}`} color="link" size="sm">
                      {maintenanceEvent.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.MaintenanceType.${maintenanceEvent.maintenanceType}`} />
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.MaintenanceStatus.${maintenanceEvent.status}`} />
                  </td>
                  <td>
                    {maintenanceEvent.requestedAt ? (
                      <TextFormat type="date" value={maintenanceEvent.requestedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {maintenanceEvent.plannedAt ? (
                      <TextFormat type="date" value={maintenanceEvent.plannedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {maintenanceEvent.startedAt ? (
                      <TextFormat type="date" value={maintenanceEvent.startedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {maintenanceEvent.finishedAt ? (
                      <TextFormat type="date" value={maintenanceEvent.finishedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{maintenanceEvent.title}</td>
                  <td>{maintenanceEvent.description}</td>
                  <td>{maintenanceEvent.technician}</td>
                  <td>{maintenanceEvent.downtimeMinutes}</td>
                  <td>{maintenanceEvent.costAmount}</td>
                  <td>{maintenanceEvent.notes}</td>
                  <td>
                    {maintenanceEvent.asset ? <Link to={`/asset/${maintenanceEvent.asset.id}`}>{maintenanceEvent.asset.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/maintenance-event/${maintenanceEvent.id}`}
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
                        to={`/maintenance-event/${maintenanceEvent.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/maintenance-event/${maintenanceEvent.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.home.notFound">No Maintenance Events found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={maintenanceEventList && maintenanceEventList.length > 0 ? '' : 'd-none'}>
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

export default MaintenanceEvent;
