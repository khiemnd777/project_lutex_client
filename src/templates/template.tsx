import { template } from './template.styled.scss';
import { FunctionalComponent, h } from 'preact';

interface TemplateArgs {
  [x: string]: any;
}

const Template: FunctionalComponent<TemplateArgs> = ({ ...props }) => {
  const { children } = props;
  return <div class={template}>{children}</div>;
};

export default Template;
