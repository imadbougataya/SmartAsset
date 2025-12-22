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
          <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.detail.title">MaintenanceEvent</Translate>
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
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.maintenanceType">Maintenance Type</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.maintenanceType}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.status">Status</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.status}</dd>
          <dt>
            <span id="requestedAt">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.requestedAt">Requested At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.requestedAt ? (
              <TextFormat value={maintenanceEventEntity.requestedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="plannedAt">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.plannedAt">Planned At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.plannedAt ? (
              <TextFormat value={maintenanceEventEntity.plannedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="startedAt">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.startedAt">Started At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.startedAt ? (
              <TextFormat value={maintenanceEventEntity.startedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="finishedAt">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.finishedAt">Finished At</Translate>
            </span>
          </dt>
          <dd>
            {maintenanceEventEntity.finishedAt ? (
              <TextFormat value={maintenanceEventEntity.finishedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="title">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.title">Title</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.description">Description</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.description}</dd>
          <dt>
            <span id="technician">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.technician">Technician</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.technician}</dd>
          <dt>
            <span id="downtimeMinutes">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.downtimeMinutes">Downtime Minutes</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.downtimeMinutes}</dd>
          <dt>
            <span id="costAmount">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.costAmount">Cost Amount</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.costAmount}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{maintenanceEventEntity.notes}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.asset">Asset</Translate>
          </dt>
          <dd>{maintenanceEventEntity.asset ? maintenanceEventEntity.asset.id : ''}</dd>
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
