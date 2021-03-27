import { FunctionalComponent } from 'preact';
import { TemplateArgs } from './template-interfaces';
import { TemplateFactoryType } from './template-types';

const TEMPLATE = 'templates';

const getTemplates = () => {
  return (window[TEMPLATE] as TemplateFactoryType) || (window[TEMPLATE] = {});
};

export class TemplateFactory {
  static Register(name: string, component: FunctionalComponent<TemplateArgs>) {
    const templates = getTemplates();
    if (!templates[name]) {
      templates[name] = component;
      return this;
    }
    throw new Error('Duplicated template name');
  }
  static Get(name: string): FunctionalComponent<TemplateArgs> | null {
    const templates = getTemplates();
    return templates[name];
  }
}
