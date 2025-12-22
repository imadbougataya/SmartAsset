import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getProductionLines } from 'app/entities/production-line/production-line.reducer';
import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { AssetType } from 'app/shared/model/enumerations/asset-type.model';
import { AssetStatus } from 'app/shared/model/enumerations/asset-status.model';
import { Criticality } from 'app/shared/model/enumerations/criticality.model';
import { AssetGeofencePolicy } from 'app/shared/model/enumerations/asset-geofence-policy.model';
import { MountingType } from 'app/shared/model/enumerations/mounting-type.model';
import { TemperatureProbeType } from 'app/shared/model/enumerations/temperature-probe-type.model';
import { createEntity, getEntity, reset, updateEntity } from './asset.reducer';

export const AssetUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const productionLines = useAppSelector(state => state.productionLine.entities);
  const sites = useAppSelector(state => state.site.entities);
  const zones = useAppSelector(state => state.zone.entities);
  const assetEntity = useAppSelector(state => state.asset.entity);
  const loading = useAppSelector(state => state.asset.loading);
  const updating = useAppSelector(state => state.asset.updating);
  const updateSuccess = useAppSelector(state => state.asset.updateSuccess);
  const assetTypeValues = Object.keys(AssetType);
  const assetStatusValues = Object.keys(AssetStatus);
  const criticalityValues = Object.keys(Criticality);
  const assetGeofencePolicyValues = Object.keys(AssetGeofencePolicy);
  const mountingTypeValues = Object.keys(MountingType);
  const temperatureProbeTypeValues = Object.keys(TemperatureProbeType);

  const handleClose = () => {
    navigate(`/asset${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProductionLines({}));
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
    if (values.powerKw !== undefined && typeof values.powerKw !== 'number') {
      values.powerKw = Number(values.powerKw);
    }
    if (values.voltageV !== undefined && typeof values.voltageV !== 'number') {
      values.voltageV = Number(values.voltageV);
    }
    if (values.currentA !== undefined && typeof values.currentA !== 'number') {
      values.currentA = Number(values.currentA);
    }
    if (values.cosPhi !== undefined && typeof values.cosPhi !== 'number') {
      values.cosPhi = Number(values.cosPhi);
    }
    if (values.speedRpm !== undefined && typeof values.speedRpm !== 'number') {
      values.speedRpm = Number(values.speedRpm);
    }
    if (values.shaftDiameterMm !== undefined && typeof values.shaftDiameterMm !== 'number') {
      values.shaftDiameterMm = Number(values.shaftDiameterMm);
    }
    if (values.footDistanceAmm !== undefined && typeof values.footDistanceAmm !== 'number') {
      values.footDistanceAmm = Number(values.footDistanceAmm);
    }
    if (values.footDistanceBmm !== undefined && typeof values.footDistanceBmm !== 'number') {
      values.footDistanceBmm = Number(values.footDistanceBmm);
    }
    if (values.frontFlangeMm !== undefined && typeof values.frontFlangeMm !== 'number') {
      values.frontFlangeMm = Number(values.frontFlangeMm);
    }
    if (values.rearFlangeMm !== undefined && typeof values.rearFlangeMm !== 'number') {
      values.rearFlangeMm = Number(values.rearFlangeMm);
    }
    if (values.iecAxisHeightMm !== undefined && typeof values.iecAxisHeightMm !== 'number') {
      values.iecAxisHeightMm = Number(values.iecAxisHeightMm);
    }
    if (values.maintenanceCount !== undefined && typeof values.maintenanceCount !== 'number') {
      values.maintenanceCount = Number(values.maintenanceCount);
    }

    const entity = {
      ...assetEntity,
      ...values,
      productionLine: productionLines.find(it => it.id.toString() === values.productionLine?.toString()),
      allowedSite: sites.find(it => it.id.toString() === values.allowedSite?.toString()),
      allowedZone: zones.find(it => it.id.toString() === values.allowedZone?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          assetType: 'INDUSTRIAL_ASSET',
          status: 'ACTIVE',
          criticality: 'LOW',
          geofencePolicy: 'NONE',
          mountingType: 'B3',
          temperatureProbeType: 'NONE',
          ...assetEntity,
          productionLine: assetEntity?.productionLine?.id,
          allowedSite: assetEntity?.allowedSite?.id,
          allowedZone: assetEntity?.allowedZone?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.asset.home.createOrEditLabel" data-cy="AssetCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.asset.home.createOrEditLabel">Create or edit a Asset</Translate>
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
                  id="asset-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.assetType')}
                id="asset-assetType"
                name="assetType"
                data-cy="assetType"
                type="select"
              >
                {assetTypeValues.map(assetType => (
                  <option value={assetType} key={assetType}>
                    {translate(`SmartAssetCoreApp.AssetType.${assetType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.assetCode')}
                id="asset-assetCode"
                name="assetCode"
                data-cy="assetCode"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.reference')}
                id="asset-reference"
                name="reference"
                data-cy="reference"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.description')}
                id="asset-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.status')}
                id="asset-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {assetStatusValues.map(assetStatus => (
                  <option value={assetStatus} key={assetStatus}>
                    {translate(`SmartAssetCoreApp.AssetStatus.${assetStatus}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.criticality')}
                id="asset-criticality"
                name="criticality"
                data-cy="criticality"
                type="select"
              >
                {criticalityValues.map(criticality => (
                  <option value={criticality} key={criticality}>
                    {translate(`SmartAssetCoreApp.Criticality.${criticality}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.geofencePolicy')}
                id="asset-geofencePolicy"
                name="geofencePolicy"
                data-cy="geofencePolicy"
                type="select"
              >
                {assetGeofencePolicyValues.map(assetGeofencePolicy => (
                  <option value={assetGeofencePolicy} key={assetGeofencePolicy}>
                    {translate(`SmartAssetCoreApp.AssetGeofencePolicy.${assetGeofencePolicy}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.responsibleName')}
                id="asset-responsibleName"
                name="responsibleName"
                data-cy="responsibleName"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.costCenter')}
                id="asset-costCenter"
                name="costCenter"
                data-cy="costCenter"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.brand')}
                id="asset-brand"
                name="brand"
                data-cy="brand"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.model')}
                id="asset-model"
                name="model"
                data-cy="model"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.serialNumber')}
                id="asset-serialNumber"
                name="serialNumber"
                data-cy="serialNumber"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.powerKw')}
                id="asset-powerKw"
                name="powerKw"
                data-cy="powerKw"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.voltageV')}
                id="asset-voltageV"
                name="voltageV"
                data-cy="voltageV"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.currentA')}
                id="asset-currentA"
                name="currentA"
                data-cy="currentA"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.cosPhi')}
                id="asset-cosPhi"
                name="cosPhi"
                data-cy="cosPhi"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.speedRpm')}
                id="asset-speedRpm"
                name="speedRpm"
                data-cy="speedRpm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.ipRating')}
                id="asset-ipRating"
                name="ipRating"
                data-cy="ipRating"
                type="text"
                validate={{
                  maxLength: { value: 20, message: translate('entity.validation.maxlength', { max: 20 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.insulationClass')}
                id="asset-insulationClass"
                name="insulationClass"
                data-cy="insulationClass"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.mountingType')}
                id="asset-mountingType"
                name="mountingType"
                data-cy="mountingType"
                type="select"
              >
                {mountingTypeValues.map(mountingType => (
                  <option value={mountingType} key={mountingType}>
                    {translate(`SmartAssetCoreApp.MountingType.${mountingType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.shaftDiameterMm')}
                id="asset-shaftDiameterMm"
                name="shaftDiameterMm"
                data-cy="shaftDiameterMm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.footDistanceAmm')}
                id="asset-footDistanceAmm"
                name="footDistanceAmm"
                data-cy="footDistanceAmm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.footDistanceBmm')}
                id="asset-footDistanceBmm"
                name="footDistanceBmm"
                data-cy="footDistanceBmm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.frontFlangeMm')}
                id="asset-frontFlangeMm"
                name="frontFlangeMm"
                data-cy="frontFlangeMm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.rearFlangeMm')}
                id="asset-rearFlangeMm"
                name="rearFlangeMm"
                data-cy="rearFlangeMm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.iecAxisHeightMm')}
                id="asset-iecAxisHeightMm"
                name="iecAxisHeightMm"
                data-cy="iecAxisHeightMm"
                type="text"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.dimensionsSource')}
                id="asset-dimensionsSource"
                name="dimensionsSource"
                data-cy="dimensionsSource"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.hasHeating')}
                id="asset-hasHeating"
                name="hasHeating"
                data-cy="hasHeating"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.temperatureProbeType')}
                id="asset-temperatureProbeType"
                name="temperatureProbeType"
                data-cy="temperatureProbeType"
                type="select"
              >
                {temperatureProbeTypeValues.map(temperatureProbeType => (
                  <option value={temperatureProbeType} key={temperatureProbeType}>
                    {translate(`SmartAssetCoreApp.TemperatureProbeType.${temperatureProbeType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.lastCommissioningDate')}
                id="asset-lastCommissioningDate"
                name="lastCommissioningDate"
                data-cy="lastCommissioningDate"
                type="date"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.lastMaintenanceDate')}
                id="asset-lastMaintenanceDate"
                name="lastMaintenanceDate"
                data-cy="lastMaintenanceDate"
                type="date"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.asset.maintenanceCount')}
                id="asset-maintenanceCount"
                name="maintenanceCount"
                data-cy="maintenanceCount"
                type="text"
              />
              <ValidatedField
                id="asset-productionLine"
                name="productionLine"
                data-cy="productionLine"
                label={translate('SmartAssetCoreApp.asset.productionLine')}
                type="select"
                required
              >
                <option value="" key="0" />
                {productionLines
                  ? productionLines.map(otherEntity => (
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
                id="asset-allowedSite"
                name="allowedSite"
                data-cy="allowedSite"
                label={translate('SmartAssetCoreApp.asset.allowedSite')}
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
                id="asset-allowedZone"
                name="allowedZone"
                data-cy="allowedZone"
                label={translate('SmartAssetCoreApp.asset.allowedZone')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/asset" replace color="info">
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

export default AssetUpdate;
