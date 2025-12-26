import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Spinner } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getAssets } from 'app/entities/asset/asset.reducer';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';

import { createEntity, reset } from './asset-movement-request.reducer';
import { MovementRequestStatus } from 'app/shared/model/enumerations/movement-request-status.model';
import { EsignStatus } from 'app/shared/model/enumerations/esign-status.model';

export const AssetMovementRequestUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id: assetId } = useParams<'id'>();

  const assets = useAppSelector(state => state.asset.entities);
  const zones = useAppSelector(state => state.zone.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const currentUser = useAppSelector(state => state.authentication.account);

  const updating = useAppSelector(state => state.assetMovementRequest.updating);
  const updateSuccess = useAppSelector(state => state.assetMovementRequest.updateSuccess);

  useEffect(() => {
    dispatch(reset());
    dispatch(getAssets({}));
    dispatch(getZones({}));
    dispatch(getUsers({}));
  }, []);

  const asset = useMemo(() => assets.find(a => a.id?.toString() === assetId), [assets, assetId]);

  const currentZone = asset?.zone;
  const currentZoneLabel = currentZone?.name ?? currentZone?.code ?? currentZone?.id ?? '';

  const destinationZones = useMemo(() => zones.filter(z => z.id !== currentZone?.id), [zones, currentZone]);

  const approvers = useMemo(() => users.filter(u => u.id !== currentUser?.id), [users, currentUser]);

  useEffect(() => {
    if (updateSuccess) {
      navigate(`/asset/${assetId}`);
    }
  }, [updateSuccess]);

  if (!asset || !currentUser || users.length === 0 || zones.length === 0) {
    return (
      <div className="text-center mt-5">
        <Spinner color="primary" />
      </div>
    );
  }

  const defaultValues = {
    requestedAt: displayDefaultDateTime(),
    fromLocationLabel: currentZoneLabel,
  };

  const saveEntity = values => {
    const entity = {
      requestedAt: convertDateTimeToServer(values.requestedAt),
      reason: values.reason,
      fromLocationLabel: currentZoneLabel,
      toLocationLabel: values.toLocationLabel,

      asset,
      requestedBy: currentUser,
      approvedBy: users.find(u => u.id.toString() === values.approvedBy),

      status: MovementRequestStatus.DRAFT,
      esignStatus: EsignStatus.NOT_STARTED,
    };

    dispatch(createEntity(entity));
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2>Demande de déplacement d’équipement</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm defaultValues={defaultValues} onSubmit={saveEntity}>
            {/* Emplacement de départ */}
            <ValidatedField label="Emplacement de départ" name="fromLocationLabel" type="text" readOnly />
            {/* Emplacement de destination */}
            <ValidatedField label="Emplacement de destination" name="toLocationLabel" type="select" required>
              <option value="" />
              {destinationZones.map(z => (
                <option key={z.id} value={z.name ?? z.code ?? z.id}>
                  {z.name ?? z.code ?? z.id}
                </option>
              ))}
            </ValidatedField>
            {/* Demandée par */}
            <ValidatedField
              label="Demandée par"
              name="requestedByLabel"
              type="text"
              readOnly
              value={`${currentUser.firstName ?? ''} ${currentUser.lastName ?? ''}`.trim() || currentUser.login}
            />
            {/* Approuvée par */}
            <ValidatedField label="Approuvée par" name="approvedBy" type="select" required>
              <option value="" />
              {approvers.map(u => (
                <option key={u.id} value={u.id}>
                  {u.firstName || u.lastName ? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() : u.login}
                </option>
              ))}
            </ValidatedField>
            {/* Motif */}
            <ValidatedField label="Motif" name="reason" type="textarea" />
            <Button tag={Link} to={`/asset/${assetId}`} color="info">
              <FontAwesomeIcon icon={faArrowLeft} /> Retour
            </Button>
            &nbsp;
            <Button color="primary" type="submit" disabled={updating}>
              Lancer le workflow
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default AssetMovementRequestUpdate;
