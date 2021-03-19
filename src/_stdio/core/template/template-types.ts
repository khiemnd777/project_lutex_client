import { ComponentClass, FunctionalComponent } from 'preact';

export type TemplateFactoryType<P = any, S = any> = {
  [name: string]: ComponentClass<P, S> | FunctionalComponent<P>;
};
