import dayjs from 'dayjs';
import { SystemEventSeverity } from 'app/shared/model/enumerations/system-event-severity.model';
import { SystemEventSource } from 'app/shared/model/enumerations/system-event-source.model';

export interface ISystemEvent {
  id?: number;
  eventType?: string;
  severity?: keyof typeof SystemEventSeverity;
  source?: keyof typeof SystemEventSource;
  message?: string | null;
  createdAt?: dayjs.Dayjs;
  createdBy?: string | null;
  correlationId?: string | null;
  payload?: string | null;
}

export const defaultValue: Readonly<ISystemEvent> = {};
