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
          <Translate contentKey="smartassetcoreApp.asset.detail.title">Asset</Translate>
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
              <Translate contentKey="smartassetcoreApp.asset.assetType">Asset Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.assetType}</dd>
          <dt>
            <span id="assetCode">
              <Translate contentKey="smartassetcoreApp.asset.assetCode">Asset Code</Translate>
            </span>
          </dt>
          <dd>{assetEntity.assetCode}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="smartassetcoreApp.asset.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{assetEntity.reference}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="smartassetcoreApp.asset.description">Description</Translate>
            </span>
          </dt>
          <dd>{assetEntity.description}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="smartassetcoreApp.asset.status">Status</Translate>
            </span>
          </dt>
          <dd>{assetEntity.status}</dd>
          <dt>
            <span id="criticality">
              <Translate contentKey="smartassetcoreApp.asset.criticality">Criticality</Translate>
            </span>
          </dt>
          <dd>{assetEntity.criticality}</dd>
          <dt>
            <span id="responsibleName">
              <Translate contentKey="smartassetcoreApp.asset.responsibleName">Responsible Name</Translate>
            </span>
          </dt>
          <dd>{assetEntity.responsibleName}</dd>
          <dt>
            <span id="costCenter">
              <Translate contentKey="smartassetcoreApp.asset.costCenter">Cost Center</Translate>
            </span>
          </dt>
          <dd>{assetEntity.costCenter}</dd>
          <dt>
            <span id="brand">
              <Translate contentKey="smartassetcoreApp.asset.brand">Brand</Translate>
            </span>
          </dt>
          <dd>{assetEntity.brand}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="smartassetcoreApp.asset.model">Model</Translate>
            </span>
          </dt>
          <dd>{assetEntity.model}</dd>
          <dt>
            <span id="serialNumber">
              <Translate contentKey="smartassetcoreApp.asset.serialNumber">Serial Number</Translate>
            </span>
          </dt>
          <dd>{assetEntity.serialNumber}</dd>
          <dt>
            <span id="powerKw">
              <Translate contentKey="smartassetcoreApp.asset.powerKw">Power Kw</Translate>
            </span>
          </dt>
          <dd>{assetEntity.powerKw}</dd>
          <dt>
            <span id="voltageV">
              <Translate contentKey="smartassetcoreApp.asset.voltageV">Voltage V</Translate>
            </span>
          </dt>
          <dd>{assetEntity.voltageV}</dd>
          <dt>
            <span id="currentA">
              <Translate contentKey="smartassetcoreApp.asset.currentA">Current A</Translate>
            </span>
          </dt>
          <dd>{assetEntity.currentA}</dd>
          <dt>
            <span id="cosPhi">
              <Translate contentKey="smartassetcoreApp.asset.cosPhi">Cos Phi</Translate>
            </span>
          </dt>
          <dd>{assetEntity.cosPhi}</dd>
          <dt>
            <span id="speedRpm">
              <Translate contentKey="smartassetcoreApp.asset.speedRpm">Speed Rpm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.speedRpm}</dd>
          <dt>
            <span id="ipRating">
              <Translate contentKey="smartassetcoreApp.asset.ipRating">Ip Rating</Translate>
            </span>
          </dt>
          <dd>{assetEntity.ipRating}</dd>
          <dt>
            <span id="insulationClass">
              <Translate contentKey="smartassetcoreApp.asset.insulationClass">Insulation Class</Translate>
            </span>
          </dt>
          <dd>{assetEntity.insulationClass}</dd>
          <dt>
            <span id="mountingType">
              <Translate contentKey="smartassetcoreApp.asset.mountingType">Mounting Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.mountingType}</dd>
          <dt>
            <span id="shaftDiameterMm">
              <Translate contentKey="smartassetcoreApp.asset.shaftDiameterMm">Shaft Diameter Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.shaftDiameterMm}</dd>
          <dt>
            <span id="footDistanceAmm">
              <Translate contentKey="smartassetcoreApp.asset.footDistanceAmm">Foot Distance Amm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.footDistanceAmm}</dd>
          <dt>
            <span id="footDistanceBmm">
              <Translate contentKey="smartassetcoreApp.asset.footDistanceBmm">Foot Distance Bmm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.footDistanceBmm}</dd>
          <dt>
            <span id="frontFlangeMm">
              <Translate contentKey="smartassetcoreApp.asset.frontFlangeMm">Front Flange Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.frontFlangeMm}</dd>
          <dt>
            <span id="rearFlangeMm">
              <Translate contentKey="smartassetcoreApp.asset.rearFlangeMm">Rear Flange Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.rearFlangeMm}</dd>
          <dt>
            <span id="iecAxisHeightMm">
              <Translate contentKey="smartassetcoreApp.asset.iecAxisHeightMm">Iec Axis Height Mm</Translate>
            </span>
          </dt>
          <dd>{assetEntity.iecAxisHeightMm}</dd>
          <dt>
            <span id="dimensionsSource">
              <Translate contentKey="smartassetcoreApp.asset.dimensionsSource">Dimensions Source</Translate>
            </span>
          </dt>
          <dd>{assetEntity.dimensionsSource}</dd>
          <dt>
            <span id="hasHeating">
              <Translate contentKey="smartassetcoreApp.asset.hasHeating">Has Heating</Translate>
            </span>
          </dt>
          <dd>{assetEntity.hasHeating ? 'true' : 'false'}</dd>
          <dt>
            <span id="temperatureProbeType">
              <Translate contentKey="smartassetcoreApp.asset.temperatureProbeType">Temperature Probe Type</Translate>
            </span>
          </dt>
          <dd>{assetEntity.temperatureProbeType}</dd>
          <dt>
            <span id="lastCommissioningDate">
              <Translate contentKey="smartassetcoreApp.asset.lastCommissioningDate">Last Commissioning Date</Translate>
            </span>
          </dt>
          <dd>
            {assetEntity.lastCommissioningDate ? (
              <TextFormat value={assetEntity.lastCommissioningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastMaintenanceDate">
              <Translate contentKey="smartassetcoreApp.asset.lastMaintenanceDate">Last Maintenance Date</Translate>
            </span>
          </dt>
          <dd>
            {assetEntity.lastMaintenanceDate ? (
              <TextFormat value={assetEntity.lastMaintenanceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="maintenanceCount">
              <Translate contentKey="smartassetcoreApp.asset.maintenanceCount">Maintenance Count</Translate>
            </span>
          </dt>
          <dd>{assetEntity.maintenanceCount}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.asset.site">Site</Translate>
          </dt>
          <dd>{assetEntity.site ? assetEntity.site.code : ''}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.asset.productionLine">Production Line</Translate>
          </dt>
          <dd>{assetEntity.productionLine ? assetEntity.productionLine.code : ''}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.asset.currentZone">Current Zone</Translate>
          </dt>
          <dd>{assetEntity.currentZone ? assetEntity.currentZone.code : ''}</dd>
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
