import dayjs from 'dayjs';
import { ISite } from 'app/shared/model/site.model';
import { IProductionLine } from 'app/shared/model/production-line.model';
import { IZone } from 'app/shared/model/zone.model';
import { AssetType } from 'app/shared/model/enumerations/asset-type.model';
import { AssetStatus } from 'app/shared/model/enumerations/asset-status.model';
import { Criticality } from 'app/shared/model/enumerations/criticality.model';
import { MountingType } from 'app/shared/model/enumerations/mounting-type.model';
import { TemperatureProbeType } from 'app/shared/model/enumerations/temperature-probe-type.model';

export interface IAsset {
  id?: number;
  assetType?: keyof typeof AssetType;
  assetCode?: string;
  reference?: string | null;
  description?: string | null;
  status?: keyof typeof AssetStatus;
  criticality?: keyof typeof Criticality;
  responsibleName?: string | null;
  costCenter?: string | null;
  brand?: string | null;
  model?: string | null;
  serialNumber?: string | null;
  powerKw?: number | null;
  voltageV?: number | null;
  currentA?: number | null;
  cosPhi?: number | null;
  speedRpm?: number | null;
  ipRating?: string | null;
  insulationClass?: string | null;
  mountingType?: keyof typeof MountingType | null;
  shaftDiameterMm?: number | null;
  footDistanceAmm?: number | null;
  footDistanceBmm?: number | null;
  frontFlangeMm?: number | null;
  rearFlangeMm?: number | null;
  iecAxisHeightMm?: number | null;
  dimensionsSource?: string | null;
  hasHeating?: boolean | null;
  temperatureProbeType?: keyof typeof TemperatureProbeType | null;
  lastCommissioningDate?: dayjs.Dayjs | null;
  lastMaintenanceDate?: dayjs.Dayjs | null;
  maintenanceCount?: number | null;
  site?: ISite | null;
  productionLine?: IProductionLine | null;
  currentZone?: IZone | null;
}

export const defaultValue: Readonly<IAsset> = {
  hasHeating: false,
};
