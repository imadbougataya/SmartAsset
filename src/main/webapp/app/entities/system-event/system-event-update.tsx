import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { SystemEntityType } from 'app/shared/model/enumerations/system-entity-type.model';
import { SystemEventSeverity } from 'app/shared/model/enumerations/system-event-severity.model';
import { SystemEventSource } from 'app/shared/model/enumerations/system-event-source.model';
import { createEntity, getEntity, reset, updateEntity } from './system-event.reducer';

export const SystemEventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const systemEventEntity = useAppSelector(state => state.systemEvent.entity);
  const loading = useAppSelector(state => state.systemEvent.loading);
  const updating = useAppSelector(state => state.systemEvent.updating);
  const updateSuccess = useAppSelector(state => state.systemEvent.updateSuccess);
  const systemEntityTypeValues = Object.keys(SystemEntityType);
  const systemEventSeverityValues = Object.keys(SystemEventSeverity);
  const systemEventSourceValues = Object.keys(SystemEventSource);

  const handleClose = () => {
    navigate(`/system-event${location.search}`);
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
    if (values.entityId !== undefined && typeof values.entityId !== 'number') {
      values.entityId = Number(values.entityId);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...systemEventEntity,
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
          createdAt: displayDefaultDateTime(),
        }
      : {
          entityType: 'ASSET',
          severity: 'INFO',
          source: 'UI',
          ...systemEventEntity,
          createdAt: convertDateTimeFromServer(systemEventEntity.createdAt),
          asset: systemEventEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartassetcoreApp.systemEvent.home.createOrEditLabel" data-cy="SystemEventCreateUpdateHeading">
            <Translate contentKey="smartassetcoreApp.systemEvent.home.createOrEditLabel">Create or edit a SystemEvent</Translate>
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
                  id="system-event-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.eventType')}
                id="system-event-eventType"
                name="eventType"
                data-cy="eventType"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.entityType')}
                id="system-event-entityType"
                name="entityType"
                data-cy="entityType"
                type="select"
              >
                {systemEntityTypeValues.map(systemEntityType => (
                  <option value={systemEntityType} key={systemEntityType}>
                    {translate(`smartassetcoreApp.SystemEntityType.${systemEntityType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.entityId')}
                id="system-event-entityId"
                name="entityId"
                data-cy="entityId"
                type="text"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.severity')}
                id="system-event-severity"
                name="severity"
                data-cy="severity"
                type="select"
              >
                {systemEventSeverityValues.map(systemEventSeverity => (
                  <option value={systemEventSeverity} key={systemEventSeverity}>
                    {translate(`smartassetcoreApp.SystemEventSeverity.${systemEventSeverity}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.source')}
                id="system-event-source"
                name="source"
                data-cy="source"
                type="select"
              >
                {systemEventSourceValues.map(systemEventSource => (
                  <option value={systemEventSource} key={systemEventSource}>
                    {translate(`smartassetcoreApp.SystemEventSource.${systemEventSource}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.message')}
                id="system-event-message"
                name="message"
                data-cy="message"
                type="text"
                validate={{
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.createdAt')}
                id="system-event-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.createdBy')}
                id="system-event-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.correlationId')}
                id="system-event-correlationId"
                name="correlationId"
                data-cy="correlationId"
                type="text"
                validate={{
                  maxLength: { value: 64, message: translate('entity.validation.maxlength', { max: 64 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.systemEvent.payload')}
                id="system-event-payload"
                name="payload"
                data-cy="payload"
                type="textarea"
              />
              <ValidatedField
                id="system-event-asset"
                name="asset"
                data-cy="asset"
                label={translate('smartassetcoreApp.systemEvent.asset')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/system-event" replace color="info">
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

export default SystemEventUpdate;
