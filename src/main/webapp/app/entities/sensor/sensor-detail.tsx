import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sensor.reducer';

export const SensorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sensorEntity = useAppSelector(state => state.sensor.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sensorDetailsHeading">
          <Translate contentKey="smartassetcoreApp.sensor.detail.title">Sensor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.id}</dd>
          <dt>
            <span id="sensorType">
              <Translate contentKey="smartassetcoreApp.sensor.sensorType">Sensor Type</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.sensorType}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="smartassetcoreApp.sensor.name">Name</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.name}</dd>
          <dt>
            <span id="unit">
              <Translate contentKey="smartassetcoreApp.sensor.unit">Unit</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.unit}</dd>
          <dt>
            <span id="minThreshold">
              <Translate contentKey="smartassetcoreApp.sensor.minThreshold">Min Threshold</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.minThreshold}</dd>
          <dt>
            <span id="maxThreshold">
              <Translate contentKey="smartassetcoreApp.sensor.maxThreshold">Max Threshold</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.maxThreshold}</dd>
          <dt>
            <span id="installedAt">
              <Translate contentKey="smartassetcoreApp.sensor.installedAt">Installed At</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.installedAt ? <TextFormat value={sensorEntity.installedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="smartassetcoreApp.sensor.active">Active</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="externalId">
              <Translate contentKey="smartassetcoreApp.sensor.externalId">External Id</Translate>
            </span>
          </dt>
          <dd>{sensorEntity.externalId}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.sensor.asset">Asset</Translate>
          </dt>
          <dd>{sensorEntity.asset ? sensorEntity.asset.assetCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/sensor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sensor/${sensorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SensorDetail;
