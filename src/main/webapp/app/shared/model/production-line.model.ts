import { IZone } from 'app/shared/model/zone.model';

export interface IProductionLine {
  id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  zone?: IZone;
}

export const defaultValue: Readonly<IProductionLine> = {};
