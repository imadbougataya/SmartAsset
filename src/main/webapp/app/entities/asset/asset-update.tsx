import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, FormText, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';

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

  const [activeTab, setActiveTab] = useState<'general' | 'technical' | 'organization'>('general');

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
    navigate('/asset');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else if (id) {
      dispatch(getEntity(id));
    }

    dispatch(getProductionLines({}));
    dispatch(getSites({}));
    dispatch(getZones({}));
  }, [id]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...assetEntity,
      ...values,
      powerKw: values.powerKw ? Number(values.powerKw) : undefined,
      voltageV: values.voltageV ? Number(values.voltageV) : undefined,
      currentA: values.currentA ? Number(values.currentA) : undefined,
      cosPhi: values.cosPhi ? Number(values.cosPhi) : undefined,
      speedRpm: values.speedRpm ? Number(values.speedRpm) : undefined,
      shaftDiameterMm: values.shaftDiameterMm ? Number(values.shaftDiameterMm) : undefined,
      footDistanceAmm: values.footDistanceAmm ? Number(values.footDistanceAmm) : undefined,
      footDistanceBmm: values.footDistanceBmm ? Number(values.footDistanceBmm) : undefined,
      frontFlangeMm: values.frontFlangeMm ? Number(values.frontFlangeMm) : undefined,
      rearFlangeMm: values.rearFlangeMm ? Number(values.rearFlangeMm) : undefined,
      iecAxisHeightMm: values.iecAxisHeightMm ? Number(values.iecAxisHeightMm) : undefined,
      maintenanceCount: values.maintenanceCount ? Number(values.maintenanceCount) : undefined,
      productionLine: productionLines.find(it => it.id === values.productionLine),
      allowedSite: sites.find(it => it.id === values.allowedSite),
      allowedZone: zones.find(it => it.id === values.allowedZone),
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
          assetType: 'INDUSTRIAL_ASSET',
          status: 'ACTIVE',
          criticality: 'LOW',
          geofencePolicy: 'NONE',
          mountingType: 'B3',
          temperatureProbeType: 'NONE',
        }
      : {
          ...assetEntity,
          productionLine: assetEntity.productionLine?.id,
          allowedSite: assetEntity.allowedSite?.id,
          allowedZone: assetEntity.allowedZone?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="10">
          <h2>
            <Translate contentKey="SmartAssetCoreApp.asset.home.createOrEditLabel">Create or edit an Asset</Translate>
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="10">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {/* ===================== TABS ===================== */}
              <Nav tabs>
                <NavItem>
                  <NavLink active={activeTab === 'general'} onClick={() => setActiveTab('general')} style={{ cursor: 'pointer' }}>
                    Général
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={activeTab === 'technical'} onClick={() => setActiveTab('technical')} style={{ cursor: 'pointer' }}>
                    Technique
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={activeTab === 'organization'} onClick={() => setActiveTab('organization')} style={{ cursor: 'pointer' }}>
                    Organisation
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                {/* ===================== GENERAL ===================== */}
                <TabPane tabId="general">
                  <Card className="mt-3">
                    <CardHeader>Informations générales</CardHeader>
                    <CardBody>
                      {!isNew && <ValidatedField name="id" readOnly label={translate('global.field.id')} />}

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.assetType')} name="assetType" type="select">
                        {assetTypeValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.AssetType.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.assetCode')} name="assetCode" required />

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.reference')} name="reference" />

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.description')} name="description" />

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.status')} name="status" type="select">
                        {assetStatusValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.AssetStatus.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.criticality')} name="criticality" type="select">
                        {criticalityValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.Criticality.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.geofencePolicy')} name="geofencePolicy" type="select">
                        {assetGeofencePolicyValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.AssetGeofencePolicy.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>
                    </CardBody>
                  </Card>
                </TabPane>

                {/* ===================== TECHNIQUE ===================== */}
                <TabPane tabId="technical">
                  <Card className="mt-3">
                    <CardHeader>Données techniques</CardHeader>
                    <CardBody>
                      <ValidatedField label="Puissance (kW)" name="powerKw" />
                      <ValidatedField label="Tension (V)" name="voltageV" />
                      <ValidatedField label="Courant (A)" name="currentA" />
                      <ValidatedField label="Cos φ" name="cosPhi" />
                      <ValidatedField label="Vitesse (rpm)" name="speedRpm" />

                      <ValidatedField label={translate('SmartAssetCoreApp.asset.mountingType')} name="mountingType" type="select">
                        {mountingTypeValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.MountingType.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>

                      <ValidatedField label="Indice IP" name="ipRating" />
                      <ValidatedField label="Classe isolation" name="insulationClass" />

                      <ValidatedField
                        label={translate('SmartAssetCoreApp.asset.temperatureProbeType')}
                        name="temperatureProbeType"
                        type="select"
                      >
                        {temperatureProbeTypeValues.map(v => (
                          <option key={v} value={v}>
                            {translate(`SmartAssetCoreApp.TemperatureProbeType.${v}`)}
                          </option>
                        ))}
                      </ValidatedField>
                    </CardBody>
                  </Card>
                </TabPane>

                {/* ===================== ORGANISATION ===================== */}
                <TabPane tabId="organization">
                  <Card className="mt-3">
                    <CardHeader>Organisation & zones</CardHeader>
                    <CardBody>
                      <ValidatedField name="productionLine" label="Ligne de production" type="select" required>
                        <option value="" />
                        {productionLines.map(pl => (
                          <option key={pl.id} value={pl.id}>
                            {pl.name || pl.code || pl.label || `Ligne ${pl.id}`}
                          </option>
                        ))}
                      </ValidatedField>
                      <FormText>Champ requis</FormText>

                      <ValidatedField name="allowedSite" label="Site autorisé" type="select">
                        <option value="" />
                        {sites.map(site => (
                          <option key={site.id} value={site.id}>
                            {site.name || site.code || `Site ${site.id}`}
                          </option>
                        ))}
                      </ValidatedField>

                      <ValidatedField name="allowedZone" label="Zone autorisée" type="select">
                        <option value="" />
                        {zones.map(zone => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name || zone.code || `Zone ${zone.id}`}
                          </option>
                        ))}
                      </ValidatedField>
                    </CardBody>
                  </Card>
                </TabPane>
              </TabContent>

              {/* ===================== ACTIONS ===================== */}
              <div className="mt-4">
                <Button tag={Link} to="/asset" color="info">
                  <FontAwesomeIcon icon="arrow-left" /> Back
                </Button>
                &nbsp;
                <Button color="primary" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" /> Save
                </Button>
              </div>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AssetUpdate;
