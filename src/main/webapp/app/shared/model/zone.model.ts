import { ISite } from 'app/shared/model/site.model';

export interface IZone {
  id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  zoneType?: string | null;
  centerLat?: number | null;
  centerLon?: number | null;
  radiusMeters?: number | null;
  site?: ISite | null;
}

export const defaultValue: Readonly<IZone> = {};
