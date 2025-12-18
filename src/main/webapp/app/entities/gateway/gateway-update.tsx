import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getSites } from 'app/entities/site/site.reducer';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { createEntity, getEntity, reset, updateEntity } from './gateway.reducer';

export const GatewayUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const sites = useAppSelector(state => state.site.entities);
  const zones = useAppSelector(state => state.zone.entities);
  const gatewayEntity = useAppSelector(state => state.gateway.entity);
  const loading = useAppSelector(state => state.gateway.loading);
  const updating = useAppSelector(state => state.gateway.updating);
  const updateSuccess = useAppSelector(state => state.gateway.updateSuccess);

  const handleClose = () => {
    navigate(`/gateway${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

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
    values.installedAt = convertDateTimeToServer(values.installedAt);

    const entity = {
      ...gatewayEntity,
      ...values,
      site: sites.find(it => it.id.toString() === values.site?.toString()),
      zone: zones.find(it => it.id.toString() === values.zone?.toString()),
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
          installedAt: displayDefaultDateTime(),
        }
      : {
          ...gatewayEntity,
          installedAt: convertDateTimeFromServer(gatewayEntity.installedAt),
          site: gatewayEntity?.site?.id,
          zone: gatewayEntity?.zone?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="smartassetcoreApp.gateway.home.createOrEditLabel" data-cy="GatewayCreateUpdateHeading">
            <Translate contentKey="smartassetcoreApp.gateway.home.createOrEditLabel">Create or edit a Gateway</Translate>
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
                  id="gateway-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.code')}
                id="gateway-code"
                name="code"
                data-cy="code"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.name')}
                id="gateway-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  maxLength: { value: 150, message: translate('entity.validation.maxlength', { max: 150 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.vendor')}
                id="gateway-vendor"
                name="vendor"
                data-cy="vendor"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.model')}
                id="gateway-model"
                name="model"
                data-cy="model"
                type="text"
                validate={{
                  maxLength: { value: 80, message: translate('entity.validation.maxlength', { max: 80 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.macAddress')}
                id="gateway-macAddress"
                name="macAddress"
                data-cy="macAddress"
                type="text"
                validate={{
                  maxLength: { value: 32, message: translate('entity.validation.maxlength', { max: 32 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.ipAddress')}
                id="gateway-ipAddress"
                name="ipAddress"
                data-cy="ipAddress"
                type="text"
                validate={{
                  maxLength: { value: 64, message: translate('entity.validation.maxlength', { max: 64 }) },
                }}
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.installedAt')}
                id="gateway-installedAt"
                name="installedAt"
                data-cy="installedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('smartassetcoreApp.gateway.active')}
                id="gateway-active"
                name="active"
                data-cy="active"
                check
                type="checkbox"
              />
              <ValidatedField
                id="gateway-site"
                name="site"
                data-cy="site"
                label={translate('smartassetcoreApp.gateway.site')}
                type="select"
              >
                <option value="" key="0" />
                {sites
                  ? sites.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="gateway-zone"
                name="zone"
                data-cy="zone"
                label={translate('smartassetcoreApp.gateway.zone')}
                type="select"
              >
                <option value="" key="0" />
                {zones
                  ? zones.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.code}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/gateway" replace color="info">
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

export default GatewayUpdate;
