import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './document-link.reducer';

export const DocumentLinkDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const documentLinkEntity = useAppSelector(state => state.documentLink.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="documentLinkDetailsHeading">
          <Translate contentKey="SmartAssetCoreApp.documentLink.detail.title">DocumentLink</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.id}</dd>
          <dt>
            <span id="entityType">
              <Translate contentKey="SmartAssetCoreApp.documentLink.entityType">Entity Type</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.entityType}</dd>
          <dt>
            <span id="entityId">
              <Translate contentKey="SmartAssetCoreApp.documentLink.entityId">Entity Id</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.entityId}</dd>
          <dt>
            <span id="label">
              <Translate contentKey="SmartAssetCoreApp.documentLink.label">Label</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.label}</dd>
          <dt>
            <span id="linkedAt">
              <Translate contentKey="SmartAssetCoreApp.documentLink.linkedAt">Linked At</Translate>
            </span>
          </dt>
          <dd>
            {documentLinkEntity.linkedAt ? <TextFormat value={documentLinkEntity.linkedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">
              <Translate contentKey="SmartAssetCoreApp.documentLink.createdBy">Created By</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.createdBy}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="SmartAssetCoreApp.documentLink.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {documentLinkEntity.createdDate ? (
              <TextFormat value={documentLinkEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">
              <Translate contentKey="SmartAssetCoreApp.documentLink.lastModifiedBy">Last Modified By</Translate>
            </span>
          </dt>
          <dd>{documentLinkEntity.lastModifiedBy}</dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="SmartAssetCoreApp.documentLink.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {documentLinkEntity.lastModifiedDate ? (
              <TextFormat value={documentLinkEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="SmartAssetCoreApp.documentLink.document">Document</Translate>
          </dt>
          <dd>{documentLinkEntity.document ? documentLinkEntity.document.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/document-link" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document-link/${documentLinkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DocumentLinkDetail;
