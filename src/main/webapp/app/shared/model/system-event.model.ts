import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { SystemEntityType } from 'app/shared/model/enumerations/system-entity-type.model';
import { SystemEventSeverity } from 'app/shared/model/enumerations/system-event-severity.model';
import { SystemEventSource } from 'app/shared/model/enumerations/system-event-source.model';

export interface ISystemEvent {
  id?: number;
  eventType?: string;
  entityType?: keyof typeof SystemEntityType;
  entityId?: number | null;
  severity?: keyof typeof SystemEventSeverity;
  source?: keyof typeof SystemEventSource;
  message?: string | null;
  createdAt?: dayjs.Dayjs;
  createdBy?: string | null;
  correlationId?: string | null;
  payload?: string | null;
  asset?: IAsset | null;
}

export const defaultValue: Readonly<ISystemEvent> = {};
