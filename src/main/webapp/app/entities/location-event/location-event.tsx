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

import { getEntities } from './location-event.reducer';

export const LocationEvent = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const locationEventList = useAppSelector(state => state.locationEvent.entities);
  const loading = useAppSelector(state => state.locationEvent.loading);
  const totalItems = useAppSelector(state => state.locationEvent.totalItems);

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
      <h2 id="location-event-heading" data-cy="LocationEventHeading">
        <Translate contentKey="smartassetcoreApp.locationEvent.home.title">Location Events</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="smartassetcoreApp.locationEvent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/location-event/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartassetcoreApp.locationEvent.home.createLabel">Create new Location Event</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {locationEventList && locationEventList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('source')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.source">Source</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('source')} />
                </th>
                <th className="hand" onClick={sort('observedAt')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.observedAt">Observed At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('observedAt')} />
                </th>
                <th className="hand" onClick={sort('zoneConfidence')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.zoneConfidence">Zone Confidence</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('zoneConfidence')} />
                </th>
                <th className="hand" onClick={sort('rssi')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.rssi">Rssi</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('rssi')} />
                </th>
                <th className="hand" onClick={sort('txPower')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.txPower">Tx Power</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('txPower')} />
                </th>
                <th className="hand" onClick={sort('latitude')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.latitude">Latitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('latitude')} />
                </th>
                <th className="hand" onClick={sort('longitude')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.longitude">Longitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('longitude')} />
                </th>
                <th className="hand" onClick={sort('accuracyMeters')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.accuracyMeters">Accuracy Meters</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('accuracyMeters')} />
                </th>
                <th className="hand" onClick={sort('speedKmh')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.speedKmh">Speed Kmh</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('speedKmh')} />
                </th>
                <th className="hand" onClick={sort('rawPayload')}>
                  <Translate contentKey="smartassetcoreApp.locationEvent.rawPayload">Raw Payload</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('rawPayload')} />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.locationEvent.asset">Asset</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.locationEvent.zone">Zone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.locationEvent.gateway">Gateway</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {locationEventList.map((locationEvent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/location-event/${locationEvent.id}`} color="link" size="sm">
                      {locationEvent.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`smartassetcoreApp.LocationSource.${locationEvent.source}`} />
                  </td>
                  <td>
                    {locationEvent.observedAt ? <TextFormat type="date" value={locationEvent.observedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{locationEvent.zoneConfidence}</td>
                  <td>{locationEvent.rssi}</td>
                  <td>{locationEvent.txPower}</td>
                  <td>{locationEvent.latitude}</td>
                  <td>{locationEvent.longitude}</td>
                  <td>{locationEvent.accuracyMeters}</td>
                  <td>{locationEvent.speedKmh}</td>
                  <td>{locationEvent.rawPayload}</td>
                  <td>{locationEvent.asset ? <Link to={`/asset/${locationEvent.asset.id}`}>{locationEvent.asset.assetCode}</Link> : ''}</td>
                  <td>{locationEvent.zone ? <Link to={`/zone/${locationEvent.zone.id}`}>{locationEvent.zone.code}</Link> : ''}</td>
                  <td>
                    {locationEvent.gateway ? <Link to={`/gateway/${locationEvent.gateway.id}`}>{locationEvent.gateway.code}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/location-event/${locationEvent.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/location-event/${locationEvent.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/location-event/${locationEvent.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="smartassetcoreApp.locationEvent.home.notFound">No Location Events found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={locationEventList && locationEventList.length > 0 ? '' : 'd-none'}>
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

export default LocationEvent;
