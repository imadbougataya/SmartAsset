import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { MovementRequestStatus } from 'app/shared/model/enumerations/movement-request-status.model';
import { EsignStatus } from 'app/shared/model/enumerations/esign-status.model';
import { createEntity, getEntity, reset, updateEntity } from './asset-movement-request.reducer';

export const AssetMovementRequestUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const assetMovementRequestEntity = useAppSelector(state => state.assetMovementRequest.entity);
  const loading = useAppSelector(state => state.assetMovementRequest.loading);
  const updating = useAppSelector(state => state.assetMovementRequest.updating);
  const updateSuccess = useAppSelector(state => state.assetMovementRequest.updateSuccess);
  const movementRequestStatusValues = Object.keys(MovementRequestStatus);
  const esignStatusValues = Object.keys(EsignStatus);

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
    dispatch(getUsers({}));
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
      requestedBy: users.find(it => it.id.toString() === values.requestedBy?.toString()),
      approvedBy: users.find(it => it.id.toString() === values.approvedBy?.toString()),
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
          esignStatus: 'NOT_STARTED',
          ...assetMovementRequestEntity,
          requestedAt: convertDateTimeFromServer(assetMovementRequestEntity.requestedAt),
          esignLastUpdate: convertDateTimeFromServer(assetMovementRequestEntity.esignLastUpdate),
          signedAt: convertDateTimeFromServer(assetMovementRequestEntity.signedAt),
          executedAt: convertDateTimeFromServer(assetMovementRequestEntity.executedAt),
          asset: assetMovementRequestEntity?.asset?.id,
          requestedBy: assetMovementRequestEntity?.requestedBy?.id,
          approvedBy: assetMovementRequestEntity?.approvedBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.assetMovementRequest.home.createOrEditLabel" data-cy="AssetMovementRequestCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.assetMovementRequest.home.createOrEditLabel">
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
                label={translate('SmartAssetCoreApp.assetMovementRequest.status')}
                id="asset-movement-request-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {movementRequestStatusValues.map(movementRequestStatus => (
                  <option value={movementRequestStatus} key={movementRequestStatus}>
                    {translate(`SmartAssetCoreApp.MovementRequestStatus.${movementRequestStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.requestedAt')}
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
                label={translate('SmartAssetCoreApp.assetMovementRequest.reason')}
                id="asset-movement-request-reason"
                name="reason"
                data-cy="reason"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.fromLocationLabel')}
                id="asset-movement-request-fromLocationLabel"
                name="fromLocationLabel"
                data-cy="fromLocationLabel"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.toLocationLabel')}
                id="asset-movement-request-toLocationLabel"
                name="toLocationLabel"
                data-cy="toLocationLabel"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.esignWorkflowId')}
                id="asset-movement-request-esignWorkflowId"
                name="esignWorkflowId"
                data-cy="esignWorkflowId"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.esignStatus')}
                id="asset-movement-request-esignStatus"
                name="esignStatus"
                data-cy="esignStatus"
                type="select"
              >
                {esignStatusValues.map(esignStatus => (
                  <option value={esignStatus} key={esignStatus}>
                    {translate(`SmartAssetCoreApp.EsignStatus.${esignStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.esignLastUpdate')}
                id="asset-movement-request-esignLastUpdate"
                name="esignLastUpdate"
                data-cy="esignLastUpdate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.signedAt')}
                id="asset-movement-request-signedAt"
                name="signedAt"
                data-cy="signedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.assetMovementRequest.executedAt')}
                id="asset-movement-request-executedAt"
                name="executedAt"
                data-cy="executedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="asset-movement-request-asset"
                name="asset"
                data-cy="asset"
                label={translate('SmartAssetCoreApp.assetMovementRequest.asset')}
                type="select"
                required
              >
                <option value="" key="0" />
                {assets
                  ? assets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="asset-movement-request-requestedBy"
                name="requestedBy"
                data-cy="requestedBy"
                label={translate('SmartAssetCoreApp.assetMovementRequest.requestedBy')}
                type="select"
                required
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="asset-movement-request-approvedBy"
                name="approvedBy"
                data-cy="approvedBy"
                label={translate('SmartAssetCoreApp.assetMovementRequest.approvedBy')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
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
