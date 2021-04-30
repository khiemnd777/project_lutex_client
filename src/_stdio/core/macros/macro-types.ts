import { FunctionComponent } from 'preact';
import { MacroArgs } from './macro-interfaces';

export type MacroRegisteredType<TArgs extends MacroArgs> = {
  name: string;
  macro: FunctionComponent<TArgs>;
};
