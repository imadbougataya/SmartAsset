import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './asset.reducer';

export const Asset = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const assetList = useAppSelector(state => state.asset.entities);
  const loading = useAppSelector(state => state.asset.loading);
  const totalItems = useAppSelector(state => state.asset.totalItems);

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
      <h2 id="asset-heading" data-cy="AssetHeading">
        <Translate contentKey="SmartAssetCoreApp.asset.home.title">Assets</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="SmartAssetCoreApp.asset.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/asset/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="SmartAssetCoreApp.asset.home.createLabel">Create new Asset</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assetList && assetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('assetType')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.assetType">Asset Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('assetType')} />
                </th>
                <th className="hand" onClick={sort('assetCode')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.assetCode">Asset Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('assetCode')} />
                </th>
                <th className="hand" onClick={sort('reference')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.reference">Reference</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('reference')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.status">Status</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('status')} />
                </th>
                <th className="hand" onClick={sort('criticality')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.criticality">Criticality</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('criticality')} />
                </th>
                <th className="hand" onClick={sort('geofencePolicy')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.geofencePolicy">Geofence Policy</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('geofencePolicy')} />
                </th>
                <th className="hand" onClick={sort('responsibleName')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.responsibleName">Responsible Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('responsibleName')} />
                </th>
                <th className="hand" onClick={sort('costCenter')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.costCenter">Cost Center</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('costCenter')} />
                </th>
                <th className="hand" onClick={sort('brand')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.brand">Brand</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('brand')} />
                </th>
                <th className="hand" onClick={sort('model')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.model">Model</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('model')} />
                </th>
                <th className="hand" onClick={sort('serialNumber')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.serialNumber">Serial Number</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('serialNumber')} />
                </th>
                <th className="hand" onClick={sort('powerKw')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.powerKw">Power Kw</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('powerKw')} />
                </th>
                <th className="hand" onClick={sort('voltageV')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.voltageV">Voltage V</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('voltageV')} />
                </th>
                <th className="hand" onClick={sort('currentA')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.currentA">Current A</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('currentA')} />
                </th>
                <th className="hand" onClick={sort('cosPhi')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.cosPhi">Cos Phi</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('cosPhi')} />
                </th>
                <th className="hand" onClick={sort('speedRpm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.speedRpm">Speed Rpm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('speedRpm')} />
                </th>
                <th className="hand" onClick={sort('ipRating')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.ipRating">Ip Rating</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ipRating')} />
                </th>
                <th className="hand" onClick={sort('insulationClass')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.insulationClass">Insulation Class</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('insulationClass')} />
                </th>
                <th className="hand" onClick={sort('mountingType')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.mountingType">Mounting Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('mountingType')} />
                </th>
                <th className="hand" onClick={sort('shaftDiameterMm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.shaftDiameterMm">Shaft Diameter Mm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('shaftDiameterMm')} />
                </th>
                <th className="hand" onClick={sort('footDistanceAmm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.footDistanceAmm">Foot Distance Amm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('footDistanceAmm')} />
                </th>
                <th className="hand" onClick={sort('footDistanceBmm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.footDistanceBmm">Foot Distance Bmm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('footDistanceBmm')} />
                </th>
                <th className="hand" onClick={sort('frontFlangeMm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.frontFlangeMm">Front Flange Mm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('frontFlangeMm')} />
                </th>
                <th className="hand" onClick={sort('rearFlangeMm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.rearFlangeMm">Rear Flange Mm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('rearFlangeMm')} />
                </th>
                <th className="hand" onClick={sort('iecAxisHeightMm')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.iecAxisHeightMm">Iec Axis Height Mm</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('iecAxisHeightMm')} />
                </th>
                <th className="hand" onClick={sort('dimensionsSource')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.dimensionsSource">Dimensions Source</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('dimensionsSource')} />
                </th>
                <th className="hand" onClick={sort('hasHeating')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.hasHeating">Has Heating</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('hasHeating')} />
                </th>
                <th className="hand" onClick={sort('temperatureProbeType')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.temperatureProbeType">Temperature Probe Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('temperatureProbeType')} />
                </th>
                <th className="hand" onClick={sort('lastCommissioningDate')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.lastCommissioningDate">Last Commissioning Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastCommissioningDate')} />
                </th>
                <th className="hand" onClick={sort('lastMaintenanceDate')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.lastMaintenanceDate">Last Maintenance Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastMaintenanceDate')} />
                </th>
                <th className="hand" onClick={sort('maintenanceCount')}>
                  <Translate contentKey="SmartAssetCoreApp.asset.maintenanceCount">Maintenance Count</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('maintenanceCount')} />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.asset.productionLine">Production Line</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.asset.allowedSite">Allowed Site</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.asset.allowedZone">Allowed Zone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assetList.map((asset, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/asset/${asset.id}`} color="link" size="sm">
                      {asset.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.AssetType.${asset.assetType}`} />
                  </td>
                  <td>{asset.assetCode}</td>
                  <td>{asset.reference}</td>
                  <td>{asset.description}</td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.AssetStatus.${asset.status}`} />
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.Criticality.${asset.criticality}`} />
                  </td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.AssetGeofencePolicy.${asset.geofencePolicy}`} />
                  </td>
                  <td>{asset.responsibleName}</td>
                  <td>{asset.costCenter}</td>
                  <td>{asset.brand}</td>
                  <td>{asset.model}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.powerKw}</td>
                  <td>{asset.voltageV}</td>
                  <td>{asset.currentA}</td>
                  <td>{asset.cosPhi}</td>
                  <td>{asset.speedRpm}</td>
                  <td>{asset.ipRating}</td>
                  <td>{asset.insulationClass}</td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.MountingType.${asset.mountingType}`} />
                  </td>
                  <td>{asset.shaftDiameterMm}</td>
                  <td>{asset.footDistanceAmm}</td>
                  <td>{asset.footDistanceBmm}</td>
                  <td>{asset.frontFlangeMm}</td>
                  <td>{asset.rearFlangeMm}</td>
                  <td>{asset.iecAxisHeightMm}</td>
                  <td>{asset.dimensionsSource}</td>
                  <td>{asset.hasHeating ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`SmartAssetCoreApp.TemperatureProbeType.${asset.temperatureProbeType}`} />
                  </td>
                  <td>
                    {asset.lastCommissioningDate ? (
                      <TextFormat type="date" value={asset.lastCommissioningDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {asset.lastMaintenanceDate ? (
                      <TextFormat type="date" value={asset.lastMaintenanceDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{asset.maintenanceCount}</td>
                  <td>
                    {asset.productionLine ? <Link to={`/production-line/${asset.productionLine.id}`}>{asset.productionLine.id}</Link> : ''}
                  </td>
                  <td>{asset.allowedSite ? <Link to={`/site/${asset.allowedSite.id}`}>{asset.allowedSite.id}</Link> : ''}</td>
                  <td>{asset.allowedZone ? <Link to={`/zone/${asset.allowedZone.id}`}>{asset.allowedZone.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/asset/${asset.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/asset/${asset.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/asset/${asset.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="SmartAssetCoreApp.asset.home.notFound">No Assets found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={assetList && assetList.length > 0 ? '' : 'd-none'}>
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

export default Asset;
