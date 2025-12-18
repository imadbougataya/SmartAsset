import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './system-event.reducer';

export const SystemEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const systemEventEntity = useAppSelector(state => state.systemEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="systemEventDetailsHeading">
          <Translate contentKey="smartassetcoreApp.systemEvent.detail.title">SystemEvent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.id}</dd>
          <dt>
            <span id="eventType">
              <Translate contentKey="smartassetcoreApp.systemEvent.eventType">Event Type</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.eventType}</dd>
          <dt>
            <span id="entityType">
              <Translate contentKey="smartassetcoreApp.systemEvent.entityType">Entity Type</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.entityType}</dd>
          <dt>
            <span id="entityId">
              <Translate contentKey="smartassetcoreApp.systemEvent.entityId">Entity Id</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.entityId}</dd>
          <dt>
            <span id="severity">
              <Translate contentKey="smartassetcoreApp.systemEvent.severity">Severity</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.severity}</dd>
          <dt>
            <span id="source">
              <Translate contentKey="smartassetcoreApp.systemEvent.source">Source</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.source}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="smartassetcoreApp.systemEvent.message">Message</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.message}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="smartassetcoreApp.systemEvent.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {systemEventEntity.createdAt ? <TextFormat value={systemEventEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="smartassetcoreApp.systemEvent.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.createdBy}</dd>
          <dt>
            <span id="correlationId">
              <Translate contentKey="smartassetcoreApp.systemEvent.correlationId">Correlation Id</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.correlationId}</dd>
          <dt>
            <span id="payload">
              <Translate contentKey="smartassetcoreApp.systemEvent.payload">Payload</Translate>
            </span>
          </dt>
          <dd>{systemEventEntity.payload}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.systemEvent.asset">Asset</Translate>
          </dt>
          <dd>{systemEventEntity.asset ? systemEventEntity.asset.assetCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/system-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/system-event/${systemEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SystemEventDetail;
