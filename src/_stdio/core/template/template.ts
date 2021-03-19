import { ComponentClass, FunctionalComponent } from "preact";

export type TemplateType<P = {}, S = {}> = {
  [name: string]: ComponentClass<P, S> | FunctionalComponent<P>;
};

export class Template {
  static templates: TemplateType = {};
  static Register(name: string, component: ComponentClass | FunctionalComponent) {
    if (!this.templates[name]) {
      this.templates[name] = component;
      return;
    }
    throw new Error('Duplicated component factory name');
  }
}
