import { above_section } from './template.styled.scss';
import { Logo } from 'components/logo/logo';
import NavBar from 'components/nav-bar/nav-bar';
import { FunctionComponent, h } from 'preact';

interface TemplateHeaderArgs {}

const TemplateHeader: FunctionComponent<TemplateHeaderArgs> = ({ ...props }) => {
  const { children } = props;
  return (
    <div class={above_section}>
      <Logo />
      <NavBar />
      {children}
    </div>
  );
};

export default TemplateHeader;
