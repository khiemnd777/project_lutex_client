import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { LogoWidgetArgs } from './logo-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { Link } from 'preact-router/match';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import isEmpty from 'lodash-es/isEmpty';

const LogoWidget: FunctionalComponent<LogoWidgetArgs> = ({ logo, theme, loading }) => {
  const cx = BuildClassNameBind(theme.Name, 'logo');
  const imgProps = GetSingleMedia(logo, MediaFormatEnums.thumbnail);
  return (
    <div class={cx('logo', !isEmpty(logo) ? 'visible' : null)}>
      <Link href="/">
        <img src={imgProps.url} alt={logo.Caption} />
      </Link>
    </div>
  );
};

WidgetFactory.Register('logo', 'Logo', LogoWidget);
