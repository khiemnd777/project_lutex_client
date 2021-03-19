import { ComponentClass, FunctionalComponent } from 'preact';
import { TemplateFactoryType } from './template-types';

export class TemplateFactory {
  static templates: TemplateFactoryType = {};
  static Register<P = any, S = any>(name: string, component: ComponentClass<P, S> | FunctionalComponent<P>) {
    if (!this.templates[name]) {
      this.templates[name] = component;
      return;
    }
    throw new Error('Duplicated template name');
  }
  static Get<P = any, S = any>(name: string): ComponentClass<P, S> | FunctionalComponent<P> | null {
    return this.templates[name];
  }
}
