import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './gateway.reducer';

export const Gateway = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const gatewayList = useAppSelector(state => state.gateway.entities);
  const loading = useAppSelector(state => state.gateway.loading);
  const totalItems = useAppSelector(state => state.gateway.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();

    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);

    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: Number(page),
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const handlePagination = (currentPage: number) => {
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      {/* HEADER */}
      <Card className="mb-4">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <Translate contentKey="SmartAssetCoreApp.gateway.home.title">Gateways</Translate>
          </h5>
          <div>
            <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} />{' '}
              <Translate contentKey="SmartAssetCoreApp.gateway.home.refreshListLabel">Refresh</Translate>
            </Button>
            <Link to="/gateway/new" className="btn btn-primary">
              <FontAwesomeIcon icon="plus" /> <Translate contentKey="SmartAssetCoreApp.gateway.home.createLabel">Create</Translate>
            </Link>
          </div>
        </CardHeader>
      </Card>

      {/* GRID */}
      <Row>
        {gatewayList && gatewayList.length > 0
          ? gatewayList.map(gateway => (
              <Col key={gateway.id} xl="4" lg="6" md="6" sm="12" className="mb-4">
                <Card className="h-100 shadow-sm">
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <strong>{gateway.name}</strong>
                    {gateway.active ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge>}
                  </CardHeader>

                  <CardBody>
                    <div className="mb-2">
                      <strong>Code:</strong> {gateway.code}
                    </div>
                    <div className="mb-2">
                      <strong>Model:</strong> {gateway.model || '-'}
                    </div>
                    <div className="mb-2">
                      <strong>IP:</strong> {gateway.ipAddress || '-'}
                    </div>
                    <div className="mb-2">
                      <strong>Installed:</strong>{' '}
                      {gateway.installedAt ? <TextFormat value={gateway.installedAt} type="date" format={APP_DATE_FORMAT} /> : '-'}
                    </div>
                    <div className="mb-2">
                      <strong>Site:</strong> {gateway.site?.name || gateway.site?.code || '-'}
                    </div>
                    <div>
                      <strong>Zone:</strong> {gateway.zone?.name || gateway.zone?.code || '-'}
                    </div>
                  </CardBody>

                  <CardFooter className="d-flex justify-content-end">
                    <div className="btn-group">
                      <Button tag={Link} to={`/gateway/${gateway.id}`} size="sm" color="info">
                        <FontAwesomeIcon icon="eye" />
                      </Button>
                      <Button
                        tag={Link}
                        to={`/gateway/${gateway.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        size="sm"
                        color="primary"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            ))
          : !loading && (
              <Col>
                <div className="alert alert-warning">
                  <Translate contentKey="SmartAssetCoreApp.gateway.home.notFound">No Gateways found</Translate>
                </div>
              </Col>
            )}
      </Row>

      {/* PAGINATION */}
      {totalItems ? (
        <Card>
          <CardFooter className="d-flex justify-content-between align-items-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </CardFooter>
        </Card>
      ) : null}
    </div>
  );
};

export default Gateway;
