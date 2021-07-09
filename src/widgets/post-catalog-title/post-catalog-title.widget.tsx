import { isEmpty } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { PostCatalogTitleWidgetArgs } from './post-catalog-interfaces';
import { DefaultParams } from './post-catalog-title-constants';

export const PostCatalogTitleWidget: FunctionalComponent<PostCatalogTitleWidgetArgs> = ({
  theme,
  data,
  parameters,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div class={cx('post_catalog_title', !isEmpty(data) ? 'visible' : null)}>
      {data?.DisplayName ? (
        <div class={cx('title')}>
          <span>{data?.DisplayName}</span>
        </div>
      ) : null}
    </div>
  );
};

export default WidgetFactory.Register(
  'post_catalog_title',
  'Post catalog title',
  PostCatalogTitleWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
