export interface ISite {
  id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  centerLat?: number | null;
  centerLon?: number | null;
  radiusMeters?: number | null;
}

export const defaultValue: Readonly<ISite> = {};
