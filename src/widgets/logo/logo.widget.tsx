import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { LogoWidgetArgs } from './logo-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import Loading from '_stdio/shared/components/loading/loading';
import { Link } from 'preact-router/match';

const LogoWidget: FunctionalComponent<LogoWidgetArgs> = ({ logo, theme, loading }) => {
  if (loading) {
    return <Loading />;
  }
  const cx = BuildClassNameBind(theme.Name, 'logo');
  const imgProps = logo.Media.formats.thumbnail;
  return (
    <div class={cx('logo', logo != null ? 'visible' : null)}>
      <Link href="/">
        <img src={imgProps.url} alt={logo.Caption} />
      </Link>
    </div>
  );
};

WidgetFactory.Register('logo', 'Logo', LogoWidget);
