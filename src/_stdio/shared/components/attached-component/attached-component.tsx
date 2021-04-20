import { Attributes, ComponentType, createElement, FunctionalComponent } from 'preact';

interface AttachedComponentArgs<P = any> {
  type: ComponentType<P>;
  props: (Attributes & P) | null;
}

const AttachedComponent: FunctionalComponent<AttachedComponentArgs<any>> = ({ type, props, children }) => {
  return createElement(type, props, children);
};

export default AttachedComponent;
