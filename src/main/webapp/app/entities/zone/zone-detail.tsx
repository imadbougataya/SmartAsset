import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './zone.reducer';

export const ZoneDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const zoneEntity = useAppSelector(state => state.zone.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="zoneDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.zone.detail.title">Zone</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="SmartAssetCoreApp.zone.code">Code</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="SmartAssetCoreApp.zone.name">Name</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="SmartAssetCoreApp.zone.description">Description</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.description}</dd>
          <dt>
            <span id="centerLat">
              <Translate contentKey="SmartAssetCoreApp.zone.centerLat">Center Lat</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.centerLat}</dd>
          <dt>
            <span id="centerLon">
              <Translate contentKey="SmartAssetCoreApp.zone.centerLon">Center Lon</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.centerLon}</dd>
          <dt>
            <span id="radiusMeters">
              <Translate contentKey="SmartAssetCoreApp.zone.radiusMeters">Radius Meters</Translate>
            </span>
          </dt>
          <dd>{zoneEntity.radiusMeters}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.zone.site">Site</Translate>
          </dt>
          <dd>{zoneEntity.site ? zoneEntity.site.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/zone" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/zone/${zoneEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ZoneDetail;
