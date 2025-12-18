import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { MovementRequestStatus } from 'app/shared/model/enumerations/movement-request-status.model';
import { createEntity, getEntity, reset, updateEntity } from './asset-movement-request.reducer';

export const AssetMovementRequestUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const assetMovementRequestEntity = useAppSelector(state => state.assetMovementRequest.entity);
  const loading = useAppSelector(state => state.assetMovementRequest.loading);
  const updating = useAppSelector(state => state.assetMovementRequest.updating);
  const updateSuccess = useAppSelector(state => state.assetMovementRequest.updateSuccess);
  const movementRequestStatusValues = Object.keys(MovementRequestStatus);

  const handleClose = () => {
    navigate(`/asset-movement-request${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssets({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.requestedAt = convertDateTimeToServer(values.requestedAt);
    values.esignLastUpdate = convertDateTimeToServer(values.esignLastUpdate);
    values.signedAt = convertDateTimeToServer(values.signedAt);
    values.executedAt = convertDateTimeToServer(values.executedAt);

    const entity = {
      ...assetMovementRequestEntity,
      ...values,
      asset: assets.find(it => it.id.toString() === values.asset?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          requestedAt: displayDefaultDateTime(),
          esignLastUpdate: displayDefaultDateTime(),
          signedAt: displayDefaultDateTime(),
          executedAt: displayDefaultDateTime(),
        }
      : {
          status: 'DRAFT',
          ...assetMovementRequestEntity,
          requestedAt: convertDateTimeFromServer(assetMovementRequestEntity.requestedAt),
          esignLastUpdate: convertDateTimeFromServer(assetMovementRequestEntity.esignLastUpdate),
          signedAt: convertDateTimeFromServer(assetMovementRequestEntity.signedAt),
          executedAt: convertDateTimeFromServer(assetMovementRequestEntity.executedAt),
          asset: assetMovementRequestEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartassetcoreApp.assetMovementRequest.home.createOrEditLabel" data-cy="AssetMovementRequestCreateUpdateHeading">
            <Translate contentKey="smartassetcoreApp.assetMovementRequest.home.createOrEditLabel">
              Create or edit a AssetMovementRequest
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="asset-movement-request-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.status')}
                id="asset-movement-request-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {movementRequestStatusValues.map(movementRequestStatus => (
                  <option value={movementRequestStatus} key={movementRequestStatus}>
                    {translate(`smartassetcoreApp.MovementRequestStatus.${movementRequestStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.requestedAt')}
                id="asset-movement-request-requestedAt"
                name="requestedAt"
                data-cy="requestedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.reason')}
                id="asset-movement-request-reason"
                name="reason"
                data-cy="reason"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.fromLocationLabel')}
                id="asset-movement-request-fromLocationLabel"
                name="fromLocationLabel"
                data-cy="fromLocationLabel"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.toLocationLabel')}
                id="asset-movement-request-toLocationLabel"
                name="toLocationLabel"
                data-cy="toLocationLabel"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.esignWorkflowId')}
                id="asset-movement-request-esignWorkflowId"
                name="esignWorkflowId"
                data-cy="esignWorkflowId"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.esignStatus')}
                id="asset-movement-request-esignStatus"
                name="esignStatus"
                data-cy="esignStatus"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.esignLastUpdate')}
                id="asset-movement-request-esignLastUpdate"
                name="esignLastUpdate"
                data-cy="esignLastUpdate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.signedAt')}
                id="asset-movement-request-signedAt"
                name="signedAt"
                data-cy="signedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.executedAt')}
                id="asset-movement-request-executedAt"
                name="executedAt"
                data-cy="executedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.requestedBy')}
                id="asset-movement-request-requestedBy"
                name="requestedBy"
                data-cy="requestedBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.assetMovementRequest.approvedBy')}
                id="asset-movement-request-approvedBy"
                name="approvedBy"
                data-cy="approvedBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                id="asset-movement-request-asset"
                name="asset"
                data-cy="asset"
                label={translate('smartassetcoreApp.assetMovementRequest.asset')}
                type="select"
              >
                <option value="" key="0" />
                {assets
                  ? assets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.assetCode}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset-movement-request" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AssetMovementRequestUpdate;
