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

import { getEntities } from './system-event.reducer';

export const SystemEvent = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const systemEventList = useAppSelector(state => state.systemEvent.entities);
  const loading = useAppSelector(state => state.systemEvent.loading);
  const totalItems = useAppSelector(state => state.systemEvent.totalItems);

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
      <h2 id="system-event-heading" data-cy="SystemEventHeading">
        <Translate contentKey="smartassetcoreApp.systemEvent.home.title">System Events</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="smartassetcoreApp.systemEvent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/system-event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartassetcoreApp.systemEvent.home.createLabel">Create new System Event</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {systemEventList && systemEventList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('eventType')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.eventType">Event Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('eventType')} />
                </th>
                <th className="hand" onClick={sort('entityType')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.entityType">Entity Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('entityType')} />
                </th>
                <th className="hand" onClick={sort('entityId')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.entityId">Entity Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('entityId')} />
                </th>
                <th className="hand" onClick={sort('severity')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.severity">Severity</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('severity')} />
                </th>
                <th className="hand" onClick={sort('source')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.source">Source</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('source')} />
                </th>
                <th className="hand" onClick={sort('message')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.message">Message</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('message')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.createdBy">Created By</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdBy')} />
                </th>
                <th className="hand" onClick={sort('correlationId')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.correlationId">Correlation Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('correlationId')} />
                </th>
                <th className="hand" onClick={sort('payload')}>
                  <Translate contentKey="smartassetcoreApp.systemEvent.payload">Payload</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('payload')} />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.systemEvent.asset">Asset</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {systemEventList.map((systemEvent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/system-event/${systemEvent.id}`} color="link" size="sm">
                      {systemEvent.id}
                    </Button>
                  </td>
                  <td>{systemEvent.eventType}</td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.SystemEntityType.${systemEvent.entityType}`} />
                  </td>
                  <td>{systemEvent.entityId}</td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.SystemEventSeverity.${systemEvent.severity}`} />
                  </td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.SystemEventSource.${systemEvent.source}`} />
                  </td>
                  <td>{systemEvent.message}</td>
                  <td>
                    {systemEvent.createdAt ? <TextFormat type="date" value={systemEvent.createdAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{systemEvent.createdBy}</td>
                  <td>{systemEvent.correlationId}</td>
                  <td>{systemEvent.payload}</td>
                  <td>{systemEvent.asset ? <Link to={`/asset/${systemEvent.asset.id}`}>{systemEvent.asset.assetCode}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/system-event/${systemEvent.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/system-event/${systemEvent.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/system-event/${systemEvent.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="smartassetcoreApp.systemEvent.home.notFound">No System Events found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={systemEventList && systemEventList.length > 0 ? '' : 'd-none'}>
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

export default SystemEvent;
