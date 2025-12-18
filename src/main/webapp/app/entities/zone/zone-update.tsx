import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { createEntity, getEntity, reset, updateEntity } from './zone.reducer';

export const ZoneUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sites = useAppSelector(state => state.site.entities);
  const zoneEntity = useAppSelector(state => state.zone.entity);
  const loading = useAppSelector(state => state.zone.loading);
  const updating = useAppSelector(state => state.zone.updating);
  const updateSuccess = useAppSelector(state => state.zone.updateSuccess);

  const handleClose = () => {
    navigate(`/zone${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getSites({}));
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
    if (values.centerLat !== undefined && typeof values.centerLat !== 'number') {
      values.centerLat = Number(values.centerLat);
    }
    if (values.centerLon !== undefined && typeof values.centerLon !== 'number') {
      values.centerLon = Number(values.centerLon);
    }
    if (values.radiusMeters !== undefined && typeof values.radiusMeters !== 'number') {
      values.radiusMeters = Number(values.radiusMeters);
    }

    const entity = {
      ...zoneEntity,
      ...values,
      site: sites.find(it => it.id.toString() === values.site?.toString()),
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
          ...zoneEntity,
          site: zoneEntity?.site?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartassetcoreApp.zone.home.createOrEditLabel" data-cy="ZoneCreateUpdateHeading">
            <Translate contentKey="smartassetcoreApp.zone.home.createOrEditLabel">Create or edit a Zone</Translate>
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
                  id="zone-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('smartassetcoreApp.zone.code')}
                id="zone-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.name')}
                id="zone-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.description')}
                id="zone-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  maxLength: { value: 500, message: translate('entity.validation.maxlength', { max: 500 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.zoneType')}
                id="zone-zoneType"
                name="zoneType"
                data-cy="zoneType"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.centerLat')}
                id="zone-centerLat"
                name="centerLat"
                data-cy="centerLat"
                type="text"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.centerLon')}
                id="zone-centerLon"
                name="centerLon"
                data-cy="centerLon"
                type="text"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.zone.radiusMeters')}
                id="zone-radiusMeters"
                name="radiusMeters"
                data-cy="radiusMeters"
                type="text"
              />
              <ValidatedField id="zone-site" name="site" data-cy="site" label={translate('smartassetcoreApp.zone.site')} type="select">
                <option value="" key="0" />
                {sites
                  ? sites.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/zone" replace color="info">
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

export default ZoneUpdate;
