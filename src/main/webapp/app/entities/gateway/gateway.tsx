import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
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
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="gateway-heading" data-cy="GatewayHeading">
        <Translate contentKey="SmartAssetCoreApp.gateway.home.title">Gateways</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="SmartAssetCoreApp.gateway.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/gateway/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="SmartAssetCoreApp.gateway.home.createLabel">Create new Gateway</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {gatewayList && gatewayList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('code')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.code">Code</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('code')} />
                </th>
                <th className="hand" onClick={sort('name')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.name">Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('name')} />
                </th>
                <th className="hand" onClick={sort('vendor')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.vendor">Vendor</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('vendor')} />
                </th>
                <th className="hand" onClick={sort('model')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.model">Model</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('model')} />
                </th>
                <th className="hand" onClick={sort('macAddress')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.macAddress">Mac Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('macAddress')} />
                </th>
                <th className="hand" onClick={sort('ipAddress')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.ipAddress">Ip Address</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('ipAddress')} />
                </th>
                <th className="hand" onClick={sort('installedAt')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.installedAt">Installed At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('installedAt')} />
                </th>
                <th className="hand" onClick={sort('active')}>
                  <Translate contentKey="SmartAssetCoreApp.gateway.active">Active</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('active')} />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.gateway.site">Site</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="SmartAssetCoreApp.gateway.zone">Zone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gatewayList.map((gateway, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/gateway/${gateway.id}`} color="link" size="sm">
                      {gateway.id}
                    </Button>
                  </td>
                  <td>{gateway.code}</td>
                  <td>{gateway.name}</td>
                  <td>{gateway.vendor}</td>
                  <td>{gateway.model}</td>
                  <td>{gateway.macAddress}</td>
                  <td>{gateway.ipAddress}</td>
                  <td>{gateway.installedAt ? <TextFormat type="date" value={gateway.installedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{gateway.active ? 'true' : 'false'}</td>
                  <td>{gateway.site ? <Link to={`/site/${gateway.site.id}`}>{gateway.site.id}</Link> : ''}</td>
                  <td>{gateway.zone ? <Link to={`/zone/${gateway.zone.id}`}>{gateway.zone.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/gateway/${gateway.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/gateway/${gateway.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/gateway/${gateway.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="SmartAssetCoreApp.gateway.home.notFound">No Gateways found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={gatewayList && gatewayList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
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
      ) : (
        ''
      )}
    </div>
  );
};

export default Gateway;
