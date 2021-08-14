import { isEmpty } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { isMobileBrowser } from '_stdio/shared/utils/common.utils';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './picture-field-constants';
import { PictureFieldWidgetArgs } from './picture-field-interfaces';

export const PictureFieldWidget: FunctionalComponent<PictureFieldWidgetArgs> = ({ theme, data, parameters }) => {
  const isMobile = parseBool(GetParameterValue('isMobile', parameters, DefaultParams));
  if (isMobile && !isMobileBrowser()) {
    return null;
  }
  if (!isMobile && isMobileBrowser()) {
    return null;
  }
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const width = GetParameterValue('width', parameters, DefaultParams);
  const height = GetParameterValue('height', parameters, DefaultParams);
  const style = {};
  if (width) {
    style['width'] = width;
  }
  if (height) {
    style['height'] = height;
  }
  const useHqPicture = parseBool(GetParameterValue('useHqPicture', parameters, DefaultParams));
  const cx = BuildClassNameBind(theme.Name, styleName);
  const picture = data?.Picture
    ? GetSingleMedia(data?.Picture, useHqPicture ? MediaFormatEnums.ordinary : MediaFormatEnums.thumbnail)
    : undefined;
  return (
    <div style={style} class={cx('picture_field', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('image_container')}>
        {picture ? (
          data?.Url ? (
            <Link src={data?.Url}>
              <img src={picture.url} alt={data?.Picture?.Caption} />
            </Link>
          ) : (
            <img src={picture.url} alt={data?.Picture?.Caption} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default WidgetFactory.Register(
  'picture_field',
  'Picture field',
  PictureFieldWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
