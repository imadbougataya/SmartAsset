import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { ISensor } from 'app/shared/model/sensor.model';
import { ISite } from 'app/shared/model/site.model';
import { IZone } from 'app/shared/model/zone.model';
import { LocationSource } from 'app/shared/model/enumerations/location-source.model';

export interface ILocationEvent {
  id?: number;
  source?: keyof typeof LocationSource;
  observedAt?: dayjs.Dayjs;
  zoneConfidence?: number | null;
  rssi?: number | null;
  txPower?: number | null;
  latitude?: number;
  longitude?: number;
  accuracyMeters?: number | null;
  speedKmh?: number | null;
  gnssConstellation?: string | null;
  rawPayload?: string | null;
  asset?: IAsset;
  sensor?: ISensor | null;
  matchedSite?: ISite | null;
  matchedZone?: IZone | null;
}

export const defaultValue: Readonly<ILocationEvent> = {};
