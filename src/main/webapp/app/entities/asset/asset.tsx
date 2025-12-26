import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlus, faEye, faPencilAlt, faTrash, faTruck, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { getEntities } from './asset.reducer';

export const Asset = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(location, ITEMS_PER_PAGE, 'assetCode'), location.search),
  );

  const assetList = useAppSelector(state => state.asset.entities);
  const loading = useAppSelector(state => state.asset.loading);
  const totalItems = useAppSelector(state => state.asset.totalItems);

  /* =====================
       LOAD DATA
       ===================== */
  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);

    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState(prev => ({
        ...prev,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      }));
    }
  }, [location.search]);

  const handlePagination = (currentPage: number) =>
    setPaginationState(prev => ({
      ...prev,
      activePage: currentPage,
    }));

  /* =====================
       EXPORT EXCEL
       ===================== */
  const handleExportExcel = () => {
    const data = assetList.map(asset => ({
      'Code équipement': asset.assetCode,
      Description: asset.description ?? '',
      Statut: asset.status,
      Criticité: asset.criticality,
      Site: asset.allowedSite?.name ?? asset.allowedSite?.id ?? '',
      Zone: asset.allowedZone?.name ?? asset.allowedZone?.id ?? '',
      Marque: asset.brand ?? '',
      Modèle: asset.model ?? '',
      'Numéro de série': asset.serialNumber ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `assets_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 id="asset-heading">
          <Translate contentKey="SmartAssetCoreApp.asset.home.title">Assets</Translate>
        </h2>

        <div className="d-flex align-items-center">
          <Button className="me-2" color="success" outline onClick={handleExportExcel} disabled={loading || assetList.length === 0}>
            <FontAwesomeIcon icon={faFileExcel} /> Export Excel
          </Button>

          <Button className="me-2" color="info" onClick={getAllEntities} disabled={loading}>
            <FontAwesomeIcon icon={faSync} spin={loading} />{' '}
            <Translate contentKey="SmartAssetCoreApp.asset.home.refreshListLabel">Refresh</Translate>
          </Button>

          <Link to="/asset/new" className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} /> <Translate contentKey="SmartAssetCoreApp.asset.home.createLabel">Create Asset</Translate>
          </Link>
        </div>
      </div>

      {/* GRID */}
      {assetList && assetList.length > 0 ? (
        <Row>
          {assetList.map(asset => (
            <Col key={asset.id} xl="3" lg="4" md="6" sm="12" className="mb-4">
              <Card className="h-100 shadow-sm">
                <CardHeader className="bg-light d-flex justify-content-between align-items-center">
                  <strong>{asset.assetCode}</strong>
                  <Badge color={asset.status === 'ACTIVE' ? 'success' : 'secondary'}>
                    <Translate contentKey={`SmartAssetCoreApp.AssetStatus.${asset.status}`} />
                  </Badge>
                </CardHeader>

                <CardBody>
                  <p className="mb-2 text-muted">{asset.description}</p>

                  <div className="mb-1">
                    <strong>Criticité :</strong> <Translate contentKey={`SmartAssetCoreApp.Criticality.${asset.criticality}`} />
                  </div>

                  <div className="mb-1">
                    <strong>Site :</strong> {asset.allowedSite?.name ?? '-'}
                  </div>

                  <div>
                    <strong>Zone :</strong> {asset.allowedZone?.name ?? '-'}
                  </div>
                </CardBody>

                <CardFooter className="bg-white">
                  <div className="d-flex justify-content-between">
                    <Button tag={Link} to={`/asset/${asset.id}`} color="info" size="md">
                      <FontAwesomeIcon icon={faEye} />
                    </Button>

                    <Button
                      tag={Link}
                      to={`/asset/${asset.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="md"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>

                    {/* ✅ ROUTE MOVE CORRECTE */}
                    {asset.status === 'ACTIVE' && (
                      <Button
                        tag={Link}
                        to={`/asset/${asset.id}/request-move`}
                        color="warning"
                        outline
                        size="md"
                        title="Demander un déplacement"
                      >
                        <FontAwesomeIcon icon={faTruck} />
                      </Button>
                    )}

                    <Button
                      onClick={() =>
                        navigate(
                          `/asset/${asset.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`,
                        )
                      }
                      color="danger"
                      size="md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="SmartAssetCoreApp.asset.home.notFound">No Assets found</Translate>
          </div>
        )
      )}

      {/* PAGINATION */}
      {totalItems ? (
        <div className={assetList.length > 0 ? 'mt-4' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Asset;
