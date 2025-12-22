import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './gateway.reducer';

export const GatewayDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const gatewayEntity = useAppSelector(state => state.gateway.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="gatewayDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.gateway.detail.title">Gateway</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="SmartAssetCoreApp.gateway.code">Code</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="SmartAssetCoreApp.gateway.name">Name</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.name}</dd>
          <dt>
            <span id="vendor">
              <Translate contentKey="SmartAssetCoreApp.gateway.vendor">Vendor</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.vendor}</dd>
          <dt>
            <span id="model">
              <Translate contentKey="SmartAssetCoreApp.gateway.model">Model</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.model}</dd>
          <dt>
            <span id="macAddress">
              <Translate contentKey="SmartAssetCoreApp.gateway.macAddress">Mac Address</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.macAddress}</dd>
          <dt>
            <span id="ipAddress">
              <Translate contentKey="SmartAssetCoreApp.gateway.ipAddress">Ip Address</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.ipAddress}</dd>
          <dt>
            <span id="installedAt">
              <Translate contentKey="SmartAssetCoreApp.gateway.installedAt">Installed At</Translate>
            </span>
          </dt>
          <dd>
            {gatewayEntity.installedAt ? <TextFormat value={gatewayEntity.installedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="active">
              <Translate contentKey="SmartAssetCoreApp.gateway.active">Active</Translate>
            </span>
          </dt>
          <dd>{gatewayEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.gateway.site">Site</Translate>
          </dt>
          <dd>{gatewayEntity.site ? gatewayEntity.site.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.gateway.zone">Zone</Translate>
          </dt>
          <dd>{gatewayEntity.zone ? gatewayEntity.zone.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/gateway" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gateway/${gatewayEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default GatewayDetail;
