import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './maintenance-event.reducer';

export const MaintenanceEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const maintenanceEventEntity = useAppSelector(state => state.maintenanceEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="maintenanceEventDetailsHeading">
          <Translate contentKey="smartassetcoreApp.maintenanceEvent.detail.title">MaintenanceEvent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.id}</dd>
          <dt>
            <span id="maintenanceType">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.maintenanceType">Maintenance Type</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.maintenanceType}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.status">Status</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.status}</dd>
          <dt>
            <span id="requestedAt">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.requestedAt">Requested At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.requestedAt ? (
              <TextFormat value={maintenanceEventEntity.requestedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="plannedAt">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.plannedAt">Planned At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.plannedAt ? (
              <TextFormat value={maintenanceEventEntity.plannedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="startedAt">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.startedAt">Started At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.startedAt ? (
              <TextFormat value={maintenanceEventEntity.startedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="finishedAt">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.finishedAt">Finished At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.finishedAt ? (
              <TextFormat value={maintenanceEventEntity.finishedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="title">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.title">Title</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.description">Description</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.description}</dd>
          <dt>
            <span id="technician">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.technician">Technician</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.technician}</dd>
          <dt>
            <span id="downtimeMinutes">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.downtimeMinutes">Downtime Minutes</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.downtimeMinutes}</dd>
          <dt>
            <span id="costAmount">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.costAmount">Cost Amount</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.costAmount}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="smartassetcoreApp.maintenanceEvent.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.notes}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.maintenanceEvent.asset">Asset</Translate>
          </dt>
          <dd>{maintenanceEventEntity.asset ? maintenanceEventEntity.asset.assetCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/maintenance-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/maintenance-event/${maintenanceEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default MaintenanceEventDetail;
