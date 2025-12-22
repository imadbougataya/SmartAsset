import { ISite } from 'app/shared/model/site.model';

export interface IZone {
  id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  centerLat?: number | null;
  centerLon?: number | null;
  radiusMeters?: number | null;
  site?: ISite;
}

export const defaultValue: Readonly<IZone> = {};
