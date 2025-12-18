import { ISite } from 'app/shared/model/site.model';

export interface IProductionLine {
  id?: number;
  code?: string;
  name?: string;
  description?: string | null;
  site?: ISite | null;
}

export const defaultValue: Readonly<IProductionLine> = {};
