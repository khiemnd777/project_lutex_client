import { below_section } from './template.styled.scss';
import { FunctionComponent, h } from 'preact';
import SocialLogo from 'components/social-logo/social-logo';
import Copyright from 'components/copyright/copyright';
import ScrollTop from 'components/shared/scroll-top/scroll-top';

interface TemplateBodyArgs {}

const TemplateBody: FunctionComponent<TemplateBodyArgs> = ({ ...props }) => {
  const { children } = props;
  return (
    <div class={below_section}>
      {children}
      <SocialLogo />
      <Copyright />
      <ScrollTop />
    </div>
  );
};

export default TemplateBody;
