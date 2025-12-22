import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { SensorType } from 'app/shared/model/enumerations/sensor-type.model';
import { createEntity, getEntity, reset, updateEntity } from './sensor.reducer';

export const SensorUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const sensorEntity = useAppSelector(state => state.sensor.entity);
  const loading = useAppSelector(state => state.sensor.loading);
  const updating = useAppSelector(state => state.sensor.updating);
  const updateSuccess = useAppSelector(state => state.sensor.updateSuccess);
  const sensorTypeValues = Object.keys(SensorType);

  const handleClose = () => {
    navigate(`/sensor${location.search}`);
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
    if (values.minThreshold !== undefined && typeof values.minThreshold !== 'number') {
      values.minThreshold = Number(values.minThreshold);
    }
    if (values.maxThreshold !== undefined && typeof values.maxThreshold !== 'number') {
      values.maxThreshold = Number(values.maxThreshold);
    }
    values.installedAt = convertDateTimeToServer(values.installedAt);

    const entity = {
      ...sensorEntity,
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
          installedAt: displayDefaultDateTime(),
        }
      : {
          sensorType: 'TEMPERATURE',
          ...sensorEntity,
          installedAt: convertDateTimeFromServer(sensorEntity.installedAt),
          asset: sensorEntity?.asset?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.sensor.home.createOrEditLabel" data-cy="SensorCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.sensor.home.createOrEditLabel">Create or edit a Sensor</Translate>
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
                  id="sensor-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.sensorType')}
                id="sensor-sensorType"
                name="sensorType"
                data-cy="sensorType"
                type="select"
              >
                {sensorTypeValues.map(sensorType => (
                  <option value={sensorType} key={sensorType}>
                    {translate(`SmartAssetCoreApp.SensorType.${sensorType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.externalId')}
                id="sensor-externalId"
                name="externalId"
                data-cy="externalId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.name')}
                id="sensor-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.unit')}
                id="sensor-unit"
                name="unit"
                data-cy="unit"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.minThreshold')}
                id="sensor-minThreshold"
                name="minThreshold"
                data-cy="minThreshold"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.maxThreshold')}
                id="sensor-maxThreshold"
                name="maxThreshold"
                data-cy="maxThreshold"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.installedAt')}
                id="sensor-installedAt"
                name="installedAt"
                data-cy="installedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.sensor.active')}
                id="sensor-active"
                name="active"
                data-cy="active"
                check
                type="checkbox"
              />
              <ValidatedField
                id="sensor-asset"
                name="asset"
                data-cy="asset"
                label={translate('SmartAssetCoreApp.sensor.asset')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/sensor" replace color="info">
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

export default SensorUpdate;
