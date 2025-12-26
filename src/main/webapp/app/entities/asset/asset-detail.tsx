import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './asset.reducer';

export const AssetDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  const [activeTab, setActiveTab] = useState<'general' | 'technical'>('general');

  useEffect(() => {
    if (id) {
      dispatch(getEntity(id));
    }
  }, [id]);

  const assetEntity = useAppSelector(state => state.asset.entity);

  if (!assetEntity) {
    return null;
  }

  return (
    <>
      {/* ===========================
          HEADER – RÉSUMÉ ASSET
         =========================== */}
      <Card className="mb-3">
        <CardBody>
          <Row className="align-items-center">
            <Col md="8">
              <h4 className="mb-1">{assetEntity.assetCode}</h4>
              <div className="text-muted">{assetEntity.description}</div>

              <div className="mt-2">
                <Badge color="primary" className="me-2">
                  {assetEntity.assetType}
                </Badge>
                <Badge color={assetEntity.status === 'ACTIVE' ? 'success' : 'secondary'} className="me-2">
                  {assetEntity.status}
                </Badge>
                <Badge color="danger">{assetEntity.criticality}</Badge>
              </div>
            </Col>

            <Col md="4" className="text-end">
              <Button tag={Link} to={`/asset/${assetEntity.id}/edit`} color="primary" className="me-2">
                <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Modifier</span>
              </Button>
              <Button tag={Link} to="/asset" color="light">
                <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Retour</span>
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ===========================
          ONGLET NAVIGATION
         =========================== */}
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
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* ===========================
            ONGLET GÉNÉRAL
           =========================== */}
        <TabPane tabId="general">
          <Card className="mt-3">
            <CardHeader>Informations générales</CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <dl>
                    <dt>Référence</dt>
                    <dd>{assetEntity.reference}</dd>

                    <dt>Responsable</dt>
                    <dd>{assetEntity.responsibleName}</dd>

                    <dt>Centre de coût</dt>
                    <dd>{assetEntity.costCenter}</dd>

                    <dt>Marque</dt>
                    <dd>{assetEntity.brand}</dd>

                    <dt>Modèle</dt>
                    <dd>{assetEntity.model}</dd>

                    <dt>Numéro de série</dt>
                    <dd>{assetEntity.serialNumber}</dd>
                  </dl>
                </Col>

                <Col md="6">
                  <dl>
                    <dt>Date de mise en service</dt>
                    <dd>
                      {assetEntity.lastCommissioningDate && (
                        <TextFormat value={assetEntity.lastCommissioningDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                      )}
                    </dd>

                    <dt>Dernière maintenance</dt>
                    <dd>
                      {assetEntity.lastMaintenanceDate && (
                        <TextFormat value={assetEntity.lastMaintenanceDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                      )}
                    </dd>

                    <dt>Nombre de maintenances</dt>
                    <dd>{assetEntity.maintenanceCount}</dd>

                    <dt>Politique géofence</dt>
                    <dd>{assetEntity.geofencePolicy}</dd>
                  </dl>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </TabPane>

        {/* ===========================
            ONGLET TECHNIQUE
           =========================== */}
        <TabPane tabId="technical">
          {/* ÉLECTRIQUE */}
          <Card className="mt-3">
            <CardHeader>Données électriques</CardHeader>
            <CardBody>
              <Row>
                <Col md="4">Puissance : {assetEntity.powerKw} kW</Col>
                <Col md="4">Tension : {assetEntity.voltageV} V</Col>
                <Col md="4">Courant : {assetEntity.currentA} A</Col>
                <Col md="4">Cos φ : {assetEntity.cosPhi}</Col>
                <Col md="4">Vitesse : {assetEntity.speedRpm} rpm</Col>
              </Row>
            </CardBody>
          </Card>

          {/* MÉCANIQUE */}
          <Card className="mt-3">
            <CardHeader>Caractéristiques mécaniques</CardHeader>
            <CardBody>
              <Row>
                <Col md="4">Montage : {assetEntity.mountingType}</Col>
                <Col md="4">Ø Arbre : {assetEntity.shaftDiameterMm} mm</Col>
                <Col md="4">Axe IEC : {assetEntity.iecAxisHeightMm} mm</Col>
                <Col md="4">Pied A : {assetEntity.footDistanceAmm} mm</Col>
                <Col md="4">Pied B : {assetEntity.footDistanceBmm} mm</Col>
                <Col md="4">Bride avant : {assetEntity.frontFlangeMm} mm</Col>
                <Col md="4">Bride arrière : {assetEntity.rearFlangeMm} mm</Col>
              </Row>
            </CardBody>
          </Card>

          {/* PROTECTION */}
          <Card className="mt-3">
            <CardHeader>Protection & environnement</CardHeader>
            <CardBody>
              <Row>
                <Col md="4">IP : {assetEntity.ipRating}</Col>
                <Col md="4">Classe isolation : {assetEntity.insulationClass}</Col>
                <Col md="4">Chauffage : {assetEntity.hasHeating ? 'Oui' : 'Non'}</Col>
                <Col md="4">Source dimensions : {assetEntity.dimensionsSource}</Col>
                <Col md="4">Sonde température : {assetEntity.temperatureProbeType}</Col>
              </Row>
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>
    </>
  );
};

export default AssetDetail;
