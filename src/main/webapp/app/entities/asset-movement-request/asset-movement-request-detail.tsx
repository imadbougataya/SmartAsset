import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-movement-request.reducer';

export const AssetMovementRequestDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetMovementRequestEntity = useAppSelector(state => state.assetMovementRequest.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetMovementRequestDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.detail.title">AssetMovementRequest</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.status">Status</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.status}</dd>
          <dt>
            <span id="requestedAt">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.requestedAt">Requested At</Translate>
            </span>
          </dt>
          <dd>
            {assetMovementRequestEntity.requestedAt ? (
              <TextFormat value={assetMovementRequestEntity.requestedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="reason">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.reason">Reason</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.reason}</dd>
          <dt>
            <span id="fromLocationLabel">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.fromLocationLabel">From Location Label</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.fromLocationLabel}</dd>
          <dt>
            <span id="toLocationLabel">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.toLocationLabel">To Location Label</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.toLocationLabel}</dd>
          <dt>
            <span id="esignWorkflowId">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.esignWorkflowId">Esign Workflow Id</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.esignWorkflowId}</dd>
          <dt>
            <span id="esignStatus">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.esignStatus">Esign Status</Translate>
            </span>
          </dt>
          <dd>{assetMovementRequestEntity.esignStatus}</dd>
          <dt>
            <span id="esignLastUpdate">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.esignLastUpdate">Esign Last Update</Translate>
            </span>
          </dt>
          <dd>
            {assetMovementRequestEntity.esignLastUpdate ? (
              <TextFormat value={assetMovementRequestEntity.esignLastUpdate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="signedAt">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.signedAt">Signed At</Translate>
            </span>
          </dt>
          <dd>
            {assetMovementRequestEntity.signedAt ? (
              <TextFormat value={assetMovementRequestEntity.signedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="executedAt">
              <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.executedAt">Executed At</Translate>
            </span>
          </dt>
          <dd>
            {assetMovementRequestEntity.executedAt ? (
              <TextFormat value={assetMovementRequestEntity.executedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.asset">Asset</Translate>
          </dt>
          <dd>{assetMovementRequestEntity.asset ? assetMovementRequestEntity.asset.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.requestedBy">Requested By</Translate>
          </dt>
          <dd>{assetMovementRequestEntity.requestedBy ? assetMovementRequestEntity.requestedBy.id : ''}</dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.approvedBy">Approved By</Translate>
          </dt>
          <dd>{assetMovementRequestEntity.approvedBy ? assetMovementRequestEntity.approvedBy.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/asset-movement-request" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-movement-request/${assetMovementRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetMovementRequestDetail;
