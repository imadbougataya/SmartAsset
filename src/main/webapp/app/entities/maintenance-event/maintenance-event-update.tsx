import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { MaintenanceType } from 'app/shared/model/enumerations/maintenance-type.model';
import { MaintenanceStatus } from 'app/shared/model/enumerations/maintenance-status.model';
import { createEntity, getEntity, reset, updateEntity } from './maintenance-event.reducer';

export const MaintenanceEventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const maintenanceEventEntity = useAppSelector(state => state.maintenanceEvent.entity);
  const loading = useAppSelector(state => state.maintenanceEvent.loading);
  const updating = useAppSelector(state => state.maintenanceEvent.updating);
  const updateSuccess = useAppSelector(state => state.maintenanceEvent.updateSuccess);
  const maintenanceTypeValues = Object.keys(MaintenanceType);
  const maintenanceStatusValues = Object.keys(MaintenanceStatus);

  const handleClose = () => {
    navigate(`/maintenance-event${location.search}`);
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
    values.plannedAt = convertDateTimeToServer(values.plannedAt);
    values.startedAt = convertDateTimeToServer(values.startedAt);
    values.finishedAt = convertDateTimeToServer(values.finishedAt);
    if (values.downtimeMinutes !== undefined && typeof values.downtimeMinutes !== 'number') {
      values.downtimeMinutes = Number(values.downtimeMinutes);
    }
    if (values.costAmount !== undefined && typeof values.costAmount !== 'number') {
      values.costAmount = Number(values.costAmount);
    }

    const entity = {
      ...maintenanceEventEntity,
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
          plannedAt: displayDefaultDateTime(),
          startedAt: displayDefaultDateTime(),
          finishedAt: displayDefaultDateTime(),
        }
      : {
          maintenanceType: 'PREVENTIVE',
          status: 'REQUESTED',
          ...maintenanceEventEntity,
          requestedAt: convertDateTimeFromServer(maintenanceEventEntity.requestedAt),
          plannedAt: convertDateTimeFromServer(maintenanceEventEntity.plannedAt),
          startedAt: convertDateTimeFromServer(maintenanceEventEntity.startedAt),
          finishedAt: convertDateTimeFromServer(maintenanceEventEntity.finishedAt),
          asset: maintenanceEventEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.maintenanceEvent.home.createOrEditLabel" data-cy="MaintenanceEventCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.maintenanceEvent.home.createOrEditLabel">Create or edit a MaintenanceEvent</Translate>
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
                  id="maintenance-event-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.maintenanceType')}
                id="maintenance-event-maintenanceType"
                name="maintenanceType"
                data-cy="maintenanceType"
                type="select"
              >
                {maintenanceTypeValues.map(maintenanceType => (
                  <option value={maintenanceType} key={maintenanceType}>
                    {translate(`SmartAssetCoreApp.MaintenanceType.${maintenanceType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.status')}
                id="maintenance-event-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {maintenanceStatusValues.map(maintenanceStatus => (
                  <option value={maintenanceStatus} key={maintenanceStatus}>
                    {translate(`SmartAssetCoreApp.MaintenanceStatus.${maintenanceStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.requestedAt')}
                id="maintenance-event-requestedAt"
                name="requestedAt"
                data-cy="requestedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.plannedAt')}
                id="maintenance-event-plannedAt"
                name="plannedAt"
                data-cy="plannedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.startedAt')}
                id="maintenance-event-startedAt"
                name="startedAt"
                data-cy="startedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.finishedAt')}
                id="maintenance-event-finishedAt"
                name="finishedAt"
                data-cy="finishedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.title')}
                id="maintenance-event-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  maxLength: { value: 180, message: translate('entity.validation.maxlength', { max: 180 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.description')}
                id="maintenance-event-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 2000, message: translate('entity.validation.maxlength', { max: 2000 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.technician')}
                id="maintenance-event-technician"
                name="technician"
                data-cy="technician"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.downtimeMinutes')}
                id="maintenance-event-downtimeMinutes"
                name="downtimeMinutes"
                data-cy="downtimeMinutes"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.costAmount')}
                id="maintenance-event-costAmount"
                name="costAmount"
                data-cy="costAmount"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.maintenanceEvent.notes')}
                id="maintenance-event-notes"
                name="notes"
                data-cy="notes"
                type="text"
                validate={{
                  maxLength: { value: 2000, message: translate('entity.validation.maxlength', { max: 2000 }) },
                }}
              />
              <ValidatedField
                id="maintenance-event-asset"
                name="asset"
                data-cy="asset"
                label={translate('SmartAssetCoreApp.maintenanceEvent.asset')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/maintenance-event" replace color="info">
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

export default MaintenanceEventUpdate;
