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
          <Translate contentKey="smartassetcoreApp.locationEvent.detail.title">LocationEvent</Translate>
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
              <Translate contentKey="smartassetcoreApp.locationEvent.source">Source</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.source}</dd>
          <dt>
            <span id="observedAt">
              <Translate contentKey="smartassetcoreApp.locationEvent.observedAt">Observed At</Translate>
            </span>
          </dt>
          <dd>
            {locationEventEntity.observedAt ? (
              <TextFormat value={locationEventEntity.observedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="zoneConfidence">
              <Translate contentKey="smartassetcoreApp.locationEvent.zoneConfidence">Zone Confidence</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.zoneConfidence}</dd>
          <dt>
            <span id="rssi">
              <Translate contentKey="smartassetcoreApp.locationEvent.rssi">Rssi</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.rssi}</dd>
          <dt>
            <span id="txPower">
              <Translate contentKey="smartassetcoreApp.locationEvent.txPower">Tx Power</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.txPower}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="smartassetcoreApp.locationEvent.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="smartassetcoreApp.locationEvent.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.longitude}</dd>
          <dt>
            <span id="accuracyMeters">
              <Translate contentKey="smartassetcoreApp.locationEvent.accuracyMeters">Accuracy Meters</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.accuracyMeters}</dd>
          <dt>
            <span id="speedKmh">
              <Translate contentKey="smartassetcoreApp.locationEvent.speedKmh">Speed Kmh</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.speedKmh}</dd>
          <dt>
            <span id="rawPayload">
              <Translate contentKey="smartassetcoreApp.locationEvent.rawPayload">Raw Payload</Translate>
            </span>
          </dt>
          <dd>{locationEventEntity.rawPayload}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.locationEvent.asset">Asset</Translate>
          </dt>
          <dd>{locationEventEntity.asset ? locationEventEntity.asset.assetCode : ''}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.locationEvent.zone">Zone</Translate>
          </dt>
          <dd>{locationEventEntity.zone ? locationEventEntity.zone.code : ''}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.locationEvent.gateway">Gateway</Translate>
          </dt>
          <dd>{locationEventEntity.gateway ? locationEventEntity.gateway.code : ''}</dd>
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
