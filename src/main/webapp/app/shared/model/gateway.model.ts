import dayjs from 'dayjs';
import { ISite } from 'app/shared/model/site.model';
import { IZone } from 'app/shared/model/zone.model';

export interface IGateway {
  id?: number;
  code?: string;
  name?: string | null;
  vendor?: string | null;
  model?: string | null;
  macAddress?: string | null;
  ipAddress?: string | null;
  installedAt?: dayjs.Dayjs | null;
  active?: boolean;
  site?: ISite | null;
  zone?: IZone | null;
}

export const defaultValue: Readonly<IGateway> = {
  active: false,
};
