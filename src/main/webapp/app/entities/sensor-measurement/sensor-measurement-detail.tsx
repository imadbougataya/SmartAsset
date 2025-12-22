import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './sensor-measurement.reducer';

export const SensorMeasurementDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const sensorMeasurementEntity = useAppSelector(state => state.sensorMeasurement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="sensorMeasurementDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.detail.title">SensorMeasurement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{sensorMeasurementEntity.id}</dd>
          <dt>
            <span id="measuredAt">
              <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.measuredAt">Measured At</Translate>
            </span>
          </dt>
          <dd>
            {sensorMeasurementEntity.measuredAt ? (
              <TextFormat value={sensorMeasurementEntity.measuredAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="value">
              <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.value">Value</Translate>
            </span>
          </dt>
          <dd>{sensorMeasurementEntity.value}</dd>
          <dt>
            <span id="quality">
              <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.quality">Quality</Translate>
            </span>
          </dt>
          <dd>{sensorMeasurementEntity.quality}</dd>
          <dt>
            <span id="source">
              <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.source">Source</Translate>
            </span>
          </dt>
          <dd>{sensorMeasurementEntity.source}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.sensorMeasurement.sensor">Sensor</Translate>
          </dt>
          <dd>{sensorMeasurementEntity.sensor ? sensorMeasurementEntity.sensor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/sensor-measurement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/sensor-measurement/${sensorMeasurementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SensorMeasurementDetail;
