import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSensors } from 'app/entities/sensor/sensor.reducer';
import { createEntity, getEntity, reset, updateEntity } from './sensor-measurement.reducer';

export const SensorMeasurementUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sensors = useAppSelector(state => state.sensor.entities);
  const sensorMeasurementEntity = useAppSelector(state => state.sensorMeasurement.entity);
  const loading = useAppSelector(state => state.sensorMeasurement.loading);
  const updating = useAppSelector(state => state.sensorMeasurement.updating);
  const updateSuccess = useAppSelector(state => state.sensorMeasurement.updateSuccess);

  const handleClose = () => {
    navigate(`/sensor-measurement${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSensors({}));
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
    values.measuredAt = convertDateTimeToServer(values.measuredAt);
    if (values.value !== undefined && typeof values.value !== 'number') {
      values.value = Number(values.value);
    }

    const entity = {
      ...sensorMeasurementEntity,
      ...values,
      sensor: sensors.find(it => it.id.toString() === values.sensor?.toString()),
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
          measuredAt: displayDefaultDateTime(),
        }
      : {
          ...sensorMeasurementEntity,
          measuredAt: convertDateTimeFromServer(sensorMeasurementEntity.measuredAt),
          sensor: sensorMeasurementEntity?.sensor?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartassetcoreApp.sensorMeasurement.home.createOrEditLabel" data-cy="SensorMeasurementCreateUpdateHeading">
            <Translate contentKey="smartassetcoreApp.sensorMeasurement.home.createOrEditLabel">
              Create or edit a SensorMeasurement
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
                  id="sensor-measurement-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('smartassetcoreApp.sensorMeasurement.measuredAt')}
                id="sensor-measurement-measuredAt"
                name="measuredAt"
                data-cy="measuredAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.sensorMeasurement.value')}
                id="sensor-measurement-value"
                name="value"
                data-cy="value"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.sensorMeasurement.quality')}
                id="sensor-measurement-quality"
                name="quality"
                data-cy="quality"
                type="text"
                validate={{
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.sensorMeasurement.source')}
                id="sensor-measurement-source"
                name="source"
                data-cy="source"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                id="sensor-measurement-sensor"
                name="sensor"
                data-cy="sensor"
                label={translate('smartassetcoreApp.sensorMeasurement.sensor')}
                type="select"
              >
                <option value="" key="0" />
                {sensors
                  ? sensors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sensor-measurement" replace color="info">
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

export default SensorMeasurementUpdate;
