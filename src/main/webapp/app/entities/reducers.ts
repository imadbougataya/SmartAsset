import site from 'app/entities/site/site.reducer';
import productionLine from 'app/entities/production-line/production-line.reducer';
import zone from 'app/entities/zone/zone.reducer';
import gateway from 'app/entities/gateway/gateway.reducer';
import asset from 'app/entities/asset/asset.reducer';
import sensor from 'app/entities/sensor/sensor.reducer';
import sensorMeasurement from 'app/entities/sensor-measurement/sensor-measurement.reducer';
import maintenanceEvent from 'app/entities/maintenance-event/maintenance-event.reducer';
import document from 'app/entities/document/document.reducer';
import documentLink from 'app/entities/document-link/document-link.reducer';
import assetMovementRequest from 'app/entities/asset-movement-request/asset-movement-request.reducer';
import locationEvent from 'app/entities/location-event/location-event.reducer';
import systemEvent from 'app/entities/system-event/system-event.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  site,
  productionLine,
  zone,
  gateway,
  asset,
  sensor,
  sensorMeasurement,
  maintenanceEvent,
  document,
  documentLink,
  assetMovementRequest,
  locationEvent,
  systemEvent,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
