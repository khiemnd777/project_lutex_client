import { isEmpty, map, size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './post-tags-constants';
import { PostTagsWidgetArgs } from './post-tags-interface';

const PostTagsWidget: FunctionalComponent<PostTagsWidgetArgs> = ({ theme, data, parameters }) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div class={cx('post_tags', size(data) ? 'visible' : null)}>
      {size(data)
        ? map(data, (tag) => {
            const path = !isEmpty(tag.Router) ? buildRouterPath(tag.Router.Path, tag) : '';
            return (
              <Link href={path} class={cx('link')} title={tag.Tag}>
                <span>{tag.Tag}</span>
              </Link>
            );
          })
        : null}
    </div>
  );
};

WidgetFactory.Register('post_tags', 'Post tags', PostTagsWidget, new WidgetInstaller(PackDefaultParams(DefaultParams)));
