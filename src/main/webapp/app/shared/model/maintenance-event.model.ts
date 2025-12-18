import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { MaintenanceType } from 'app/shared/model/enumerations/maintenance-type.model';
import { MaintenanceStatus } from 'app/shared/model/enumerations/maintenance-status.model';

export interface IMaintenanceEvent {
  id?: number;
  maintenanceType?: keyof typeof MaintenanceType;
  status?: keyof typeof MaintenanceStatus;
  requestedAt?: dayjs.Dayjs;
  plannedAt?: dayjs.Dayjs | null;
  startedAt?: dayjs.Dayjs | null;
  finishedAt?: dayjs.Dayjs | null;
  title?: string | null;
  description?: string | null;
  technician?: string | null;
  downtimeMinutes?: number | null;
  costAmount?: number | null;
  notes?: string | null;
  asset?: IAsset | null;
}

export const defaultValue: Readonly<IMaintenanceEvent> = {};
