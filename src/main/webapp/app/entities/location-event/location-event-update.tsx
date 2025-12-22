import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { getEntities as getSensors } from 'app/entities/sensor/sensor.reducer';
import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { LocationSource } from 'app/shared/model/enumerations/location-source.model';
import { createEntity, getEntity, reset, updateEntity } from './location-event.reducer';

export const LocationEventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const assets = useAppSelector(state => state.asset.entities);
  const sensors = useAppSelector(state => state.sensor.entities);
  const sites = useAppSelector(state => state.site.entities);
  const zones = useAppSelector(state => state.zone.entities);
  const locationEventEntity = useAppSelector(state => state.locationEvent.entity);
  const loading = useAppSelector(state => state.locationEvent.loading);
  const updating = useAppSelector(state => state.locationEvent.updating);
  const updateSuccess = useAppSelector(state => state.locationEvent.updateSuccess);
  const locationSourceValues = Object.keys(LocationSource);

  const handleClose = () => {
    navigate(`/location-event${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAssets({}));
    dispatch(getSensors({}));
    dispatch(getSites({}));
    dispatch(getZones({}));
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
    values.observedAt = convertDateTimeToServer(values.observedAt);
    if (values.zoneConfidence !== undefined && typeof values.zoneConfidence !== 'number') {
      values.zoneConfidence = Number(values.zoneConfidence);
    }
    if (values.rssi !== undefined && typeof values.rssi !== 'number') {
      values.rssi = Number(values.rssi);
    }
    if (values.txPower !== undefined && typeof values.txPower !== 'number') {
      values.txPower = Number(values.txPower);
    }
    if (values.latitude !== undefined && typeof values.latitude !== 'number') {
      values.latitude = Number(values.latitude);
    }
    if (values.longitude !== undefined && typeof values.longitude !== 'number') {
      values.longitude = Number(values.longitude);
    }
    if (values.accuracyMeters !== undefined && typeof values.accuracyMeters !== 'number') {
      values.accuracyMeters = Number(values.accuracyMeters);
    }
    if (values.speedKmh !== undefined && typeof values.speedKmh !== 'number') {
      values.speedKmh = Number(values.speedKmh);
    }

    const entity = {
      ...locationEventEntity,
      ...values,
      asset: assets.find(it => it.id.toString() === values.asset?.toString()),
      sensor: sensors.find(it => it.id.toString() === values.sensor?.toString()),
      matchedSite: sites.find(it => it.id.toString() === values.matchedSite?.toString()),
      matchedZone: zones.find(it => it.id.toString() === values.matchedZone?.toString()),
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
          observedAt: displayDefaultDateTime(),
        }
      : {
          source: 'BLE',
          ...locationEventEntity,
          observedAt: convertDateTimeFromServer(locationEventEntity.observedAt),
          asset: locationEventEntity?.asset?.id,
          sensor: locationEventEntity?.sensor?.id,
          matchedSite: locationEventEntity?.matchedSite?.id,
          matchedZone: locationEventEntity?.matchedZone?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.locationEvent.home.createOrEditLabel" data-cy="LocationEventCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.locationEvent.home.createOrEditLabel">Create or edit a LocationEvent</Translate>
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
                  id="location-event-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.source')}
                id="location-event-source"
                name="source"
                data-cy="source"
                type="select"
              >
                {locationSourceValues.map(locationSource => (
                  <option value={locationSource} key={locationSource}>
                    {translate(`SmartAssetCoreApp.LocationSource.${locationSource}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.observedAt')}
                id="location-event-observedAt"
                name="observedAt"
                data-cy="observedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.zoneConfidence')}
                id="location-event-zoneConfidence"
                name="zoneConfidence"
                data-cy="zoneConfidence"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.rssi')}
                id="location-event-rssi"
                name="rssi"
                data-cy="rssi"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.txPower')}
                id="location-event-txPower"
                name="txPower"
                data-cy="txPower"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.latitude')}
                id="location-event-latitude"
                name="latitude"
                data-cy="latitude"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.longitude')}
                id="location-event-longitude"
                name="longitude"
                data-cy="longitude"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.accuracyMeters')}
                id="location-event-accuracyMeters"
                name="accuracyMeters"
                data-cy="accuracyMeters"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.speedKmh')}
                id="location-event-speedKmh"
                name="speedKmh"
                data-cy="speedKmh"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.gnssConstellation')}
                id="location-event-gnssConstellation"
                name="gnssConstellation"
                data-cy="gnssConstellation"
                type="text"
                validate={{
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.locationEvent.rawPayload')}
                id="location-event-rawPayload"
                name="rawPayload"
                data-cy="rawPayload"
                type="text"
                validate={{
                  maxLength: { value: 4000, message: translate('entity.validation.maxlength', { max: 4000 }) },
                }}
              />
              <ValidatedField
                id="location-event-asset"
                name="asset"
                data-cy="asset"
                label={translate('SmartAssetCoreApp.locationEvent.asset')}
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
                id="location-event-sensor"
                name="sensor"
                data-cy="sensor"
                label={translate('SmartAssetCoreApp.locationEvent.sensor')}
                type="select"
              >
                <option value="" key="0" />
                {sensors
                  ? sensors.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="location-event-matchedSite"
                name="matchedSite"
                data-cy="matchedSite"
                label={translate('SmartAssetCoreApp.locationEvent.matchedSite')}
                type="select"
              >
                <option value="" key="0" />
                {sites
                  ? sites.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="location-event-matchedZone"
                name="matchedZone"
                data-cy="matchedZone"
                label={translate('SmartAssetCoreApp.locationEvent.matchedZone')}
                type="select"
              >
                <option value="" key="0" />
                {zones
                  ? zones.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/location-event" replace color="info">
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

export default LocationEventUpdate;
