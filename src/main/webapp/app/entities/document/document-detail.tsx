import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './document.reducer';

export const DocumentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const documentEntity = useAppSelector(state => state.document.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="documentDetailsHeading">
          <Translate contentKey="smartassetcoreApp.document.detail.title">Document</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{documentEntity.id}</dd>
          <dt>
            <span id="fileName">
              <Translate contentKey="smartassetcoreApp.document.fileName">File Name</Translate>
            </span>
          </dt>
          <dd>{documentEntity.fileName}</dd>
          <dt>
            <span id="mimeType">
              <Translate contentKey="smartassetcoreApp.document.mimeType">Mime Type</Translate>
            </span>
          </dt>
          <dd>{documentEntity.mimeType}</dd>
          <dt>
            <span id="sizeBytes">
              <Translate contentKey="smartassetcoreApp.document.sizeBytes">Size Bytes</Translate>
            </span>
          </dt>
          <dd>{documentEntity.sizeBytes}</dd>
          <dt>
            <span id="storageRef">
              <Translate contentKey="smartassetcoreApp.document.storageRef">Storage Ref</Translate>
            </span>
          </dt>
          <dd>{documentEntity.storageRef}</dd>
          <dt>
            <span id="checksumSha256">
              <Translate contentKey="smartassetcoreApp.document.checksumSha256">Checksum Sha 256</Translate>
            </span>
          </dt>
          <dd>{documentEntity.checksumSha256}</dd>
          <dt>
            <span id="uploadedAt">
              <Translate contentKey="smartassetcoreApp.document.uploadedAt">Uploaded At</Translate>
            </span>
          </dt>
          <dd>
            {documentEntity.uploadedAt ? <TextFormat value={documentEntity.uploadedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="uploadedBy">
              <Translate contentKey="smartassetcoreApp.document.uploadedBy">Uploaded By</Translate>
            </span>
          </dt>
          <dd>{documentEntity.uploadedBy}</dd>
        </dl>
        <Button tag={Link} to="/document" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document/${documentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default DocumentDetail;
