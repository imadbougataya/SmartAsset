import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { SensorType } from 'app/shared/model/enumerations/sensor-type.model';

export interface ISensor {
  id?: number;
  sensorType?: keyof typeof SensorType;
  name?: string | null;
  unit?: string | null;
  minThreshold?: number | null;
  maxThreshold?: number | null;
  installedAt?: dayjs.Dayjs | null;
  active?: boolean;
  externalId?: string | null;
  asset?: IAsset | null;
}

export const defaultValue: Readonly<ISensor> = {
  active: false,
};
