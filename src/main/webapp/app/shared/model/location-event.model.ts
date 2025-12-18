import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { IZone } from 'app/shared/model/zone.model';
import { IGateway } from 'app/shared/model/gateway.model';
import { LocationSource } from 'app/shared/model/enumerations/location-source.model';

export interface ILocationEvent {
  id?: number;
  source?: keyof typeof LocationSource;
  observedAt?: dayjs.Dayjs;
  zoneConfidence?: number | null;
  rssi?: number | null;
  txPower?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  accuracyMeters?: number | null;
  speedKmh?: number | null;
  rawPayload?: string | null;
  asset?: IAsset | null;
  zone?: IZone | null;
  gateway?: IGateway | null;
}

export const defaultValue: Readonly<ILocationEvent> = {};
