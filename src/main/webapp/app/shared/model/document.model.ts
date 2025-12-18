import dayjs from 'dayjs';

export interface IDocument {
  id?: number;
  fileName?: string;
  mimeType?: string;
  sizeBytes?: number | null;
  storageRef?: string;
  checksumSha256?: string | null;
  uploadedAt?: dayjs.Dayjs;
  uploadedBy?: string | null;
}

export const defaultValue: Readonly<IDocument> = {};
