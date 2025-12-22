import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { SystemEventSeverity } from 'app/shared/model/enumerations/system-event-severity.model';
import { SystemEventSource } from 'app/shared/model/enumerations/system-event-source.model';
import { createEntity, getEntity, reset, updateEntity } from './system-event.reducer';

export const SystemEventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const systemEventEntity = useAppSelector(state => state.systemEvent.entity);
  const loading = useAppSelector(state => state.systemEvent.loading);
  const updating = useAppSelector(state => state.systemEvent.updating);
  const updateSuccess = useAppSelector(state => state.systemEvent.updateSuccess);
  const systemEventSeverityValues = Object.keys(SystemEventSeverity);
  const systemEventSourceValues = Object.keys(SystemEventSource);

  const handleClose = () => {
    navigate('/system-event');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
    values.createdAt = convertDateTimeToServer(values.createdAt);

    const entity = {
      ...systemEventEntity,
      ...values,
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
          severity: 'INFO',
          source: 'UI',
          ...systemEventEntity,
          createdAt: convertDateTimeFromServer(systemEventEntity.createdAt),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.systemEvent.home.createOrEditLabel" data-cy="SystemEventCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.systemEvent.home.createOrEditLabel">Create or edit a SystemEvent</Translate>
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
                label={translate('SmartAssetCoreApp.systemEvent.eventType')}
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
                label={translate('SmartAssetCoreApp.systemEvent.severity')}
                id="system-event-severity"
                name="severity"
                data-cy="severity"
                type="select"
              >
                {systemEventSeverityValues.map(systemEventSeverity => (
                  <option value={systemEventSeverity} key={systemEventSeverity}>
                    {translate(`SmartAssetCoreApp.SystemEventSeverity.${systemEventSeverity}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.systemEvent.source')}
                id="system-event-source"
                name="source"
                data-cy="source"
                type="select"
              >
                {systemEventSourceValues.map(systemEventSource => (
                  <option value={systemEventSource} key={systemEventSource}>
                    {translate(`SmartAssetCoreApp.SystemEventSource.${systemEventSource}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.systemEvent.message')}
                id="system-event-message"
                name="message"
                data-cy="message"
                type="text"
                validate={{
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.systemEvent.createdAt')}
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
                label={translate('SmartAssetCoreApp.systemEvent.createdBy')}
                id="system-event-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.systemEvent.correlationId')}
                id="system-event-correlationId"
                name="correlationId"
                data-cy="correlationId"
                type="text"
                validate={{
                  maxLength: { value: 64, message: translate('entity.validation.maxlength', { max: 64 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.systemEvent.payload')}
                id="system-event-payload"
                name="payload"
                data-cy="payload"
                type="textarea"
              />
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
