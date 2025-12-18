import dayjs from 'dayjs';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentEntityType } from 'app/shared/model/enumerations/document-entity-type.model';

export interface IDocumentLink {
  id?: number;
  entityType?: keyof typeof DocumentEntityType;
  entityId?: number;
  label?: string | null;
  linkedAt?: dayjs.Dayjs;
  document?: IDocument | null;
}

export const defaultValue: Readonly<IDocumentLink> = {};
