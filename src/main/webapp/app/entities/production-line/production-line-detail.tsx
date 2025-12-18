import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './production-line.reducer';

export const ProductionLineDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productionLineEntity = useAppSelector(state => state.productionLine.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productionLineDetailsHeading">
          <Translate contentKey="smartassetcoreApp.productionLine.detail.title">ProductionLine</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productionLineEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="smartassetcoreApp.productionLine.code">Code</Translate>
            </span>
          </dt>
          <dd>{productionLineEntity.code}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="smartassetcoreApp.productionLine.name">Name</Translate>
            </span>
          </dt>
          <dd>{productionLineEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="smartassetcoreApp.productionLine.description">Description</Translate>
            </span>
          </dt>
          <dd>{productionLineEntity.description}</dd>
          <dt>
            <Translate contentKey="smartassetcoreApp.productionLine.site">Site</Translate>
          </dt>
          <dd>{productionLineEntity.site ? productionLineEntity.site.code : ''}</dd>
        </dl>
        <Button tag={Link} to="/production-line" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/production-line/${productionLineEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductionLineDetail;
