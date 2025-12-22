import dayjs from 'dayjs';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentLinkEntityType } from 'app/shared/model/enumerations/document-link-entity-type.model';

export interface IDocumentLink {
  id?: number;
  entityType?: keyof typeof DocumentLinkEntityType;
  entityId?: number;
  label?: string | null;
  linkedAt?: dayjs.Dayjs;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  document?: IDocument;
}

export const defaultValue: Readonly<IDocumentLink> = {};
