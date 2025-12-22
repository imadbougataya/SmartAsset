import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, FormText, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { DocumentLinkEntityType } from 'app/shared/model/enumerations/document-link-entity-type.model';
import { createEntity, getEntity, reset, updateEntity } from './document-link.reducer';

export const DocumentLinkUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const documents = useAppSelector(state => state.document.entities);
  const documentLinkEntity = useAppSelector(state => state.documentLink.entity);
  const loading = useAppSelector(state => state.documentLink.loading);
  const updating = useAppSelector(state => state.documentLink.updating);
  const updateSuccess = useAppSelector(state => state.documentLink.updateSuccess);
  const documentLinkEntityTypeValues = Object.keys(DocumentLinkEntityType);

  const handleClose = () => {
    navigate(`/document-link${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getDocuments({}));
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
    if (values.entityId !== undefined && typeof values.entityId !== 'number') {
      values.entityId = Number(values.entityId);
    }
    values.linkedAt = convertDateTimeToServer(values.linkedAt);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    const entity = {
      ...documentLinkEntity,
      ...values,
      document: documents.find(it => it.id.toString() === values.document?.toString()),
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
          linkedAt: displayDefaultDateTime(),
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          entityType: 'ASSET',
          ...documentLinkEntity,
          linkedAt: convertDateTimeFromServer(documentLinkEntity.linkedAt),
          createdDate: convertDateTimeFromServer(documentLinkEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(documentLinkEntity.lastModifiedDate),
          document: documentLinkEntity?.document?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="SmartAssetCoreApp.documentLink.home.createOrEditLabel" data-cy="DocumentLinkCreateUpdateHeading">
            <Translate contentKey="SmartAssetCoreApp.documentLink.home.createOrEditLabel">Create or edit a DocumentLink</Translate>
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
                  id="document-link-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.entityType')}
                id="document-link-entityType"
                name="entityType"
                data-cy="entityType"
                type="select"
              >
                {documentLinkEntityTypeValues.map(documentLinkEntityType => (
                  <option value={documentLinkEntityType} key={documentLinkEntityType}>
                    {translate(`SmartAssetCoreApp.DocumentLinkEntityType.${documentLinkEntityType}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.entityId')}
                id="document-link-entityId"
                name="entityId"
                data-cy="entityId"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.label')}
                id="document-link-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  maxLength: { value: 200, message: translate('entity.validation.maxlength', { max: 200 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.linkedAt')}
                id="document-link-linkedAt"
                name="linkedAt"
                data-cy="linkedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.createdBy')}
                id="document-link-createdBy"
                name="createdBy"
                data-cy="createdBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.createdDate')}
                id="document-link-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.lastModifiedBy')}
                id="document-link-lastModifiedBy"
                name="lastModifiedBy"
                data-cy="lastModifiedBy"
                type="text"
                validate={{
                  maxLength: { value: 120, message: translate('entity.validation.maxlength', { max: 120 }) },
                }}
              />
              <ValidatedField
                label={translate('SmartAssetCoreApp.documentLink.lastModifiedDate')}
                id="document-link-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="document-link-document"
                name="document"
                data-cy="document"
                label={translate('SmartAssetCoreApp.documentLink.document')}
                type="select"
                required
              >
                <option value="" key="0" />
                {documents
                  ? documents.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/document-link" replace color="info">
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

export default DocumentLinkUpdate;
