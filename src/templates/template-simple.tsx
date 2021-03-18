import { template_simple } from './template.styled.scss';
import { FunctionalComponent, h } from 'preact';
import { Logo } from 'components/logo/logo';
import NavBar from 'components/nav-bar/nav-bar';
import SocialLogo from 'components/social-logo/social-logo';
import Copyright from 'components/copyright/copyright';
import ScrollTop from 'components/shared/scroll-top/scroll-top';

interface TemplateArgs {
  [x: string]: any;
}

const TemplateSimple: FunctionalComponent<TemplateArgs> = ({ ...props }) => {
  const { children } = props;
  return (
    <div class={template_simple}>
      <Logo />
      <NavBar />
      {children}
      <SocialLogo />
      <Copyright />
      <ScrollTop />
    </div>
  );
};

export default TemplateSimple;
