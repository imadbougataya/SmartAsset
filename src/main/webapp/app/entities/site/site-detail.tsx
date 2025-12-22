import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './site.reducer';

export const SiteDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const siteEntity = useAppSelector(state => state.site.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="siteDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.site.detail.title">Site</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{siteEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="SmartAssetCoreApp.site.code">Code</Translate>
            </span>
          </dt>
          <dd>{siteEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="SmartAssetCoreApp.site.name">Name</Translate>
            </span>
          </dt>
          <dd>{siteEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="SmartAssetCoreApp.site.description">Description</Translate>
            </span>
          </dt>
          <dd>{siteEntity.description}</dd>
          <dt>
            <span id="centerLat">
              <Translate contentKey="SmartAssetCoreApp.site.centerLat">Center Lat</Translate>
            </span>
          </dt>
          <dd>{siteEntity.centerLat}</dd>
          <dt>
            <span id="centerLon">
              <Translate contentKey="SmartAssetCoreApp.site.centerLon">Center Lon</Translate>
            </span>
          </dt>
          <dd>{siteEntity.centerLon}</dd>
          <dt>
            <span id="radiusMeters">
              <Translate contentKey="SmartAssetCoreApp.site.radiusMeters">Radius Meters</Translate>
            </span>
          </dt>
          <dd>{siteEntity.radiusMeters}</dd>
        </dl>
        <Button tag={Link} to="/site" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/site/${siteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default SiteDetail;
