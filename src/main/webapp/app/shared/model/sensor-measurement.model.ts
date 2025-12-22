import dayjs from 'dayjs';
import { ISensor } from 'app/shared/model/sensor.model';

export interface ISensorMeasurement {
  id?: number;
  measuredAt?: dayjs.Dayjs;
  value?: number;
  quality?: string | null;
  source?: string | null;
  sensor?: ISensor;
}

export const defaultValue: Readonly<ISensorMeasurement> = {};
