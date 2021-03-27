import { FunctionalComponent } from 'preact';
import { TemplateArgs } from './template-interfaces';

export type TemplateFactoryType<P = TemplateArgs> = {
  [name: string]: FunctionalComponent<P>;
};
