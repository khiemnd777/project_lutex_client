import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { LogoWidgetArgs } from './logo-interfaces';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { Link } from 'preact-router/match';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import isEmpty from 'lodash-es/isEmpty';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './logo-constants';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';

const LogoWidget: FunctionalComponent<LogoWidgetArgs> = ({ logo, theme, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'logo');
  const width = GetParameterValue('width', parameters, DefaultParams);
  const height = GetParameterValue('height', parameters, DefaultParams);
  const imgProps = GetSingleMedia(logo, MediaFormatEnums.ordinary);
  const style = {};
  if (width) {
    style['width'] = width;
  }
  if (height) {
    style['height'] = height;
  }
  return (
    <div style={style} class={cx('logo', !isEmpty(logo) ? 'visible' : null)}>
      <Link href="/">
        <img src={imgProps.url} alt={logo.Caption} />
      </Link>
    </div>
  );
};

WidgetFactory.Register('logo', 'Logo', LogoWidget, new WidgetInstaller(PackDefaultParams(DefaultParams)));
