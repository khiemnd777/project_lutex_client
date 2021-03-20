import { FunctionalComponent } from 'preact';
import { TemplateArgs } from './template-interfaces';
import { TemplateFactoryType } from './template-types';

export class TemplateFactory {
  static templates: TemplateFactoryType = {};
  static Register(name: string, component: FunctionalComponent<TemplateArgs>) {
    if (!this.templates[name]) {
      this.templates[name] = component;
      return this;
    }
    throw new Error('Duplicated template name');
  }
  static Get(name: string): FunctionalComponent<TemplateArgs> | null {
    return this.templates[name];
  }
}
