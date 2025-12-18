import dayjs from 'dayjs';
import { IAsset } from 'app/shared/model/asset.model';
import { MovementRequestStatus } from 'app/shared/model/enumerations/movement-request-status.model';

export interface IAssetMovementRequest {
  id?: number;
  status?: keyof typeof MovementRequestStatus;
  requestedAt?: dayjs.Dayjs;
  reason?: string | null;
  fromLocationLabel?: string | null;
  toLocationLabel?: string | null;
  esignWorkflowId?: string | null;
  esignStatus?: string | null;
  esignLastUpdate?: dayjs.Dayjs | null;
  signedAt?: dayjs.Dayjs | null;
  executedAt?: dayjs.Dayjs | null;
  requestedBy?: string | null;
  approvedBy?: string | null;
  asset?: IAsset | null;
}

export const defaultValue: Readonly<IAssetMovementRequest> = {};
