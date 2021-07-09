import { isEmpty } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { PostCatalogShortWidgetArgs } from './post-catalog-interfaces';
import { DefaultParams } from './post-catalog-short-constants';

export const PostCatalogShortWidget: FunctionalComponent<PostCatalogShortWidgetArgs> = ({
  theme,
  data,
  parameters,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div class={cx('post_catalog_short', !isEmpty(data) ? 'visible' : null)}>
      {data?.Short ? (
        <div class={cx('short')}>
          <span>{data?.Short}</span>
        </div>
      ) : null}
    </div>
  );
};

export default WidgetFactory.Register(
  'post_catalog_short',
  'Post catalog short',
  PostCatalogShortWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
