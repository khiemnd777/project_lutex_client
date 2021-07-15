import Fetchanic from '../fetchanic/fetchanic';
import { FetchTemplateById } from './template-service';
import { TemplateType } from './template-types';

export const PrepareTemplate = (templateId?: string) => {
  const { data, loading, error } = Fetchanic(() => FetchTemplateById(templateId), templateId ? templateId : '');
  const template = (!!data && !loading && !error && data) || ({} as TemplateType);
  return template;
};
