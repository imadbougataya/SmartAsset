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

import { getEntities } from './sensor.reducer';

export const Sensor = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const sensorList = useAppSelector(state => state.sensor.entities);
  const loading = useAppSelector(state => state.sensor.loading);
  const totalItems = useAppSelector(state => state.sensor.totalItems);

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
      <h2 id="sensor-heading" data-cy="SensorHeading">
        <Translate contentKey="SmartAssetCoreApp.sensor.home.title">Sensors</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="SmartAssetCoreApp.sensor.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/sensor/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="SmartAssetCoreApp.sensor.home.createLabel">Create new Sensor</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sensorList && sensorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('sensorType')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.sensorType">Sensor Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('sensorType')} />
                </th>
                <th className="hand" onClick={sort('externalId')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.externalId">External Id</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('externalId')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('unit')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.unit">Unit</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('unit')} />
                </th>
                <th className="hand" onClick={sort('minThreshold')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.minThreshold">Min Threshold</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('minThreshold')} />
                </th>
                <th className="hand" onClick={sort('maxThreshold')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.maxThreshold">Max Threshold</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('maxThreshold')} />
                </th>
                <th className="hand" onClick={sort('installedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.installedAt">Installed At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('installedAt')} />
                </th>
                <th className="hand" onClick={sort('active')}>
                  <Translate contentKey="SmartAssetCoreApp.sensor.active">Active</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('active')} />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.sensor.asset">Asset</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sensorList.map((sensor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/sensor/${sensor.id}`} color="link" size="sm">
                      {sensor.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.SensorType.${sensor.sensorType}`} />
                  </td>
                  <td>{sensor.externalId}</td>
                  <td>{sensor.name}</td>
                  <td>{sensor.unit}</td>
                  <td>{sensor.minThreshold}</td>
                  <td>{sensor.maxThreshold}</td>
                  <td>{sensor.installedAt ? <TextFormat type="date" value={sensor.installedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{sensor.active ? 'true' : 'false'}</td>
                  <td>{sensor.asset ? <Link to={`/asset/${sensor.asset.id}`}>{sensor.asset.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/sensor/${sensor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/sensor/${sensor.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/sensor/${sensor.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="SmartAssetCoreApp.sensor.home.notFound">No Sensors found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={sensorList && sensorList.length > 0 ? '' : 'd-none'}>
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

export default Sensor;
