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

import { getEntities } from './sensor-measurement.reducer';

export const SensorMeasurement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const sensorMeasurementList = useAppSelector(state => state.sensorMeasurement.entities);
  const loading = useAppSelector(state => state.sensorMeasurement.loading);
  const totalItems = useAppSelector(state => state.sensorMeasurement.totalItems);

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
      <h2 id="sensor-measurement-heading" data-cy="SensorMeasurementHeading">
        <Translate contentKey="smartassetcoreApp.sensorMeasurement.home.title">Sensor Measurements</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="smartassetcoreApp.sensorMeasurement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/sensor-measurement/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartassetcoreApp.sensorMeasurement.home.createLabel">Create new Sensor Measurement</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {sensorMeasurementList && sensorMeasurementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('measuredAt')}>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.measuredAt">Measured At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('measuredAt')} />
                </th>
                <th className="hand" onClick={sort('value')}>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.value">Value</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('value')} />
                </th>
                <th className="hand" onClick={sort('quality')}>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.quality">Quality</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('quality')} />
                </th>
                <th className="hand" onClick={sort('source')}>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.source">Source</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('source')} />
                </th>
                <th>
                  <Translate contentKey="smartassetcoreApp.sensorMeasurement.sensor">Sensor</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sensorMeasurementList.map((sensorMeasurement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/sensor-measurement/${sensorMeasurement.id}`} color="link" size="sm">
                      {sensorMeasurement.id}
                    </Button>
                  </td>
                  <td>
                    {sensorMeasurement.measuredAt ? (
                      <TextFormat type="date" value={sensorMeasurement.measuredAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{sensorMeasurement.value}</td>
                  <td>{sensorMeasurement.quality}</td>
                  <td>{sensorMeasurement.source}</td>
                  <td>
                    {sensorMeasurement.sensor ? (
                      <Link to={`/sensor/${sensorMeasurement.sensor.id}`}>{sensorMeasurement.sensor.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/sensor-measurement/${sensorMeasurement.id}`}
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
                        to={`/sensor-measurement/${sensorMeasurement.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/sensor-measurement/${sensorMeasurement.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="smartassetcoreApp.sensorMeasurement.home.notFound">No Sensor Measurements found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={sensorMeasurementList && sensorMeasurementList.length > 0 ? '' : 'd-none'}>
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

export default SensorMeasurement;
