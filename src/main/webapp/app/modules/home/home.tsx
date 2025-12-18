import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Col, Row, Card, CardBody, CardTitle } from 'reactstrap';
import { Translate } from 'react-jhipster';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <div className="home-dashboard">
      {/* ================= HEADER ================= */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-6 mb-1">
            <Translate contentKey="home.dashboard.title">Smart Asset Core</Translate>
          </h1>
          <p className="text-muted">
            <Translate contentKey="home.dashboard.subtitle">Industrial asset supervision – locations, events and maintenance</Translate>
          </p>
        </Col>
      </Row>

      {/* ================= LOGIN INFO ================= */}
      {account?.login && (
        <Row className="mb-4">
          <Col>
            <Alert color="success">
              <Translate contentKey="home.dashboard.logged" interpolate={{ username: account.login }} />
            </Alert>
          </Col>
        </Row>
      )}

      {/* ================= KPIs ================= */}
      <Row className="mb-4">
        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.kpi.assets">Assets</Translate>
              </CardTitle>
              <h2 className="text-ocp">128</h2>
              <span className="text-muted">
                <Translate contentKey="home.kpi.assets.total">Total registered</Translate>
              </span>
            </CardBody>
          </Card>
        </Col>

        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.kpi.operational">Operational</Translate>
              </CardTitle>
              <h2 className="text-success">112</h2>
              <span className="text-muted">
                <Translate contentKey="home.kpi.operational.label">In service</Translate>
              </span>
            </CardBody>
          </Card>
        </Col>

        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.kpi.alerts">Alerts</Translate>
              </CardTitle>
              <h2 className="text-warning">9</h2>
              <span className="text-muted">
                <Translate contentKey="home.kpi.alerts.label">To be monitored</Translate>
              </span>
            </CardBody>
          </Card>
        </Col>

        <Col md="3">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.kpi.maintenance">Maintenance</Translate>
              </CardTitle>
              <h2 className="text-danger">7</h2>
              <span className="text-muted">
                <Translate contentKey="home.kpi.maintenance.label">Open interventions</Translate>
              </span>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* ================= MAIN CONTENT ================= */}
      <Row className="mb-4">
        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.events.title">Latest events</Translate>
              </CardTitle>
              <ul className="mb-0">
                <li>
                  <Translate contentKey="home.events.sample.entry">Asset entry – Warehouse zone</Translate>
                </li>
                <li>
                  <Translate contentKey="home.events.sample.exit">Asset exit – Maintenance workshop</Translate>
                </li>
                <li>
                  <Translate contentKey="home.events.sample.alert">Temperature alert – Compressor</Translate>
                </li>
                <li>
                  <Translate contentKey="home.events.sample.movement">Unplanned movement – Critical area</Translate>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>

        <Col md="6">
          <Card>
            <CardBody>
              <CardTitle tag="h6">
                <Translate contentKey="home.shortcuts.title">Quick access</Translate>
              </CardTitle>
              <ul className="mb-0">
                <li>
                  <Link to="/asset">
                    <Translate contentKey="home.shortcuts.assets">Asset management</Translate>
                  </Link>
                </li>
                <li>
                  <Link to="/zone">
                    <Translate contentKey="home.shortcuts.zones">Zones & locations</Translate>
                  </Link>
                </li>
                <li>
                  <Link to="/location-event">
                    <Translate contentKey="home.shortcuts.locationEvents">Location events</Translate>
                  </Link>
                </li>
                <li>
                  <Link to="/maintenance-event">
                    <Translate contentKey="home.shortcuts.maintenance">Maintenance & interventions</Translate>
                  </Link>
                </li>
                <li>
                  <Link to="/document">
                    <Translate contentKey="home.shortcuts.documents">Technical documentation</Translate>
                  </Link>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* ================= AUTH PROMPT ================= */}
      {!account?.login && (
        <Row>
          <Col>
            <Alert color="warning">
              <Translate contentKey="home.login.required">Please sign in to access the application features.</Translate>{' '}
              <Link to="/login" className="alert-link">
                <Translate contentKey="home.login.link">Sign in</Translate>
              </Link>
            </Alert>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Home;
