import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './location-event.reducer';

export const LocationEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const locationEventEntity = useAppSelector(state => state.locationEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="locationEventDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.locationEvent.detail.title">LocationEvent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.id}</dd>
          <dt>
            <span id="source">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.source">Source</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.source}</dd>
          <dt>
            <span id="observedAt">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.observedAt">Observed At</Translate>
            </span>
          </dt>
          <dd>
            {locationEventEntity.observedAt ? (
              <TextFormat value={locationEventEntity.observedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="zoneConfidence">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.zoneConfidence">Zone Confidence</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.zoneConfidence}</dd>
          <dt>
            <span id="rssi">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.rssi">Rssi</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.rssi}</dd>
          <dt>
            <span id="txPower">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.txPower">Tx Power</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.txPower}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.longitude}</dd>
          <dt>
            <span id="accuracyMeters">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.accuracyMeters">Accuracy Meters</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.accuracyMeters}</dd>
          <dt>
            <span id="speedKmh">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.speedKmh">Speed Kmh</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.speedKmh}</dd>
          <dt>
            <span id="gnssConstellation">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.gnssConstellation">Gnss Constellation</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.gnssConstellation}</dd>
          <dt>
            <span id="rawPayload">
              <Translate contentKey="SmartAssetCoreApp.locationEvent.rawPayload">Raw Payload</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.rawPayload}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.locationEvent.asset">Asset</Translate>
          </dt>
          <dd>{locationEventEntity.asset ? locationEventEntity.asset.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.locationEvent.sensor">Sensor</Translate>
          </dt>
          <dd>{locationEventEntity.sensor ? locationEventEntity.sensor.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.locationEvent.matchedSite">Matched Site</Translate>
          </dt>
          <dd>{locationEventEntity.matchedSite ? locationEventEntity.matchedSite.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.locationEvent.matchedZone">Matched Zone</Translate>
          </dt>
          <dd>{locationEventEntity.matchedZone ? locationEventEntity.matchedZone.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/location-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location-event/${locationEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LocationEventDetail;
