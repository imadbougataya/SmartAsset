import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset.reducer';

export const AssetDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetEntity = useAppSelector(state => state.asset.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.asset.detail.title">Asset</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetEntity.id}</dd>
          <dt>
            <span id="assetType">
              <Translate contentKey="SmartAssetCoreApp.asset.assetType">Asset Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.assetType}</dd>
          <dt>
            <span id="assetCode">
              <Translate contentKey="SmartAssetCoreApp.asset.assetCode">Asset Code</Translate>
            </span>
          </dt>
          <dd>{assetEntity.assetCode}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="SmartAssetCoreApp.asset.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{assetEntity.reference}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="SmartAssetCoreApp.asset.description">Description</Translate>
            </span>
          </dt>
          <dd>{assetEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="SmartAssetCoreApp.asset.status">Status</Translate>
            </span>
          </dt>
          <dd>{assetEntity.status}</dd>
          <dt>
            <span id="criticality">
              <Translate contentKey="SmartAssetCoreApp.asset.criticality">Criticality</Translate>
            </span>
          </dt>
          <dd>{assetEntity.criticality}</dd>
          <dt>
            <span id="geofencePolicy">
              <Translate contentKey="SmartAssetCoreApp.asset.geofencePolicy">Geofence Policy</Translate>
            </span>
          </dt>
          <dd>{assetEntity.geofencePolicy}</dd>
          <dt>
            <span id="responsibleName">
              <Translate contentKey="SmartAssetCoreApp.asset.responsibleName">Responsible Name</Translate>
            </span>
          </dt>
          <dd>{assetEntity.responsibleName}</dd>
          <dt>
            <span id="costCenter">
              <Translate contentKey="SmartAssetCoreApp.asset.costCenter">Cost Center</Translate>
            </span>
          </dt>
          <dd>{assetEntity.costCenter}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="SmartAssetCoreApp.asset.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{assetEntity.brand}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="SmartAssetCoreApp.asset.model">Model</Translate>
            </span>
          </dt>
          <dd>{assetEntity.model}</dd>
          <dt>
            <span id="serialNumber">
              <Translate contentKey="SmartAssetCoreApp.asset.serialNumber">Serial Number</Translate>
            </span>
          </dt>
          <dd>{assetEntity.serialNumber}</dd>
          <dt>
            <span id="powerKw">
              <Translate contentKey="SmartAssetCoreApp.asset.powerKw">Power Kw</Translate>
            </span>
          </dt>
          <dd>{assetEntity.powerKw}</dd>
          <dt>
            <span id="voltageV">
              <Translate contentKey="SmartAssetCoreApp.asset.voltageV">Voltage V</Translate>
            </span>
          </dt>
          <dd>{assetEntity.voltageV}</dd>
          <dt>
            <span id="currentA">
              <Translate contentKey="SmartAssetCoreApp.asset.currentA">Current A</Translate>
            </span>
          </dt>
          <dd>{assetEntity.currentA}</dd>
          <dt>
            <span id="cosPhi">
              <Translate contentKey="SmartAssetCoreApp.asset.cosPhi">Cos Phi</Translate>
            </span>
          </dt>
          <dd>{assetEntity.cosPhi}</dd>
          <dt>
            <span id="speedRpm">
              <Translate contentKey="SmartAssetCoreApp.asset.speedRpm">Speed Rpm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.speedRpm}</dd>
          <dt>
            <span id="ipRating">
              <Translate contentKey="SmartAssetCoreApp.asset.ipRating">Ip Rating</Translate>
            </span>
          </dt>
          <dd>{assetEntity.ipRating}</dd>
          <dt>
            <span id="insulationClass">
              <Translate contentKey="SmartAssetCoreApp.asset.insulationClass">Insulation Class</Translate>
            </span>
          </dt>
          <dd>{assetEntity.insulationClass}</dd>
          <dt>
            <span id="mountingType">
              <Translate contentKey="SmartAssetCoreApp.asset.mountingType">Mounting Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.mountingType}</dd>
          <dt>
            <span id="shaftDiameterMm">
              <Translate contentKey="SmartAssetCoreApp.asset.shaftDiameterMm">Shaft Diameter Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.shaftDiameterMm}</dd>
          <dt>
            <span id="footDistanceAmm">
              <Translate contentKey="SmartAssetCoreApp.asset.footDistanceAmm">Foot Distance Amm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.footDistanceAmm}</dd>
          <dt>
            <span id="footDistanceBmm">
              <Translate contentKey="SmartAssetCoreApp.asset.footDistanceBmm">Foot Distance Bmm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.footDistanceBmm}</dd>
          <dt>
            <span id="frontFlangeMm">
              <Translate contentKey="SmartAssetCoreApp.asset.frontFlangeMm">Front Flange Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.frontFlangeMm}</dd>
          <dt>
            <span id="rearFlangeMm">
              <Translate contentKey="SmartAssetCoreApp.asset.rearFlangeMm">Rear Flange Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.rearFlangeMm}</dd>
          <dt>
            <span id="iecAxisHeightMm">
              <Translate contentKey="SmartAssetCoreApp.asset.iecAxisHeightMm">Iec Axis Height Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.iecAxisHeightMm}</dd>
          <dt>
            <span id="dimensionsSource">
              <Translate contentKey="SmartAssetCoreApp.asset.dimensionsSource">Dimensions Source</Translate>
            </span>
          </dt>
          <dd>{assetEntity.dimensionsSource}</dd>
          <dt>
            <span id="hasHeating">
              <Translate contentKey="SmartAssetCoreApp.asset.hasHeating">Has Heating</Translate>
            </span>
          </dt>
          <dd>{assetEntity.hasHeating ? 'true' : 'false'}</dd>
          <dt>
            <span id="temperatureProbeType">
              <Translate contentKey="SmartAssetCoreApp.asset.temperatureProbeType">Temperature Probe Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.temperatureProbeType}</dd>
          <dt>
            <span id="lastCommissioningDate">
              <Translate contentKey="SmartAssetCoreApp.asset.lastCommissioningDate">Last Commissioning Date</Translate>
            </span>
          </dt>
          <dd>
            {assetEntity.lastCommissioningDate ? (
              <TextFormat value={assetEntity.lastCommissioningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastMaintenanceDate">
              <Translate contentKey="SmartAssetCoreApp.asset.lastMaintenanceDate">Last Maintenance Date</Translate>
            </span>
          </dt>
          <dd>
            {assetEntity.lastMaintenanceDate ? (
              <TextFormat value={assetEntity.lastMaintenanceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="maintenanceCount">
              <Translate contentKey="SmartAssetCoreApp.asset.maintenanceCount">Maintenance Count</Translate>
            </span>
          </dt>
          <dd>{assetEntity.maintenanceCount}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.asset.productionLine">Production Line</Translate>
          </dt>
          <dd>{assetEntity.productionLine ? assetEntity.productionLine.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.asset.allowedSite">Allowed Site</Translate>
          </dt>
          <dd>{assetEntity.allowedSite ? assetEntity.allowedSite.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.asset.allowedZone">Allowed Zone</Translate>
          </dt>
          <dd>{assetEntity.allowedZone ? assetEntity.allowedZone.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/asset" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset/${assetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetDetail;
