import isEmpty from 'lodash-es/isEmpty';
import marked from 'marked';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { convertDateFormat, DATE_FORMAT } from '_stdio/shared/utils/date.utils';
import { PostItemWidgetArgs } from './post-item-interface';

const PostItemWidget: FunctionalComponent<PostItemWidgetArgs> = ({ theme, data, widgets, routerParams }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_item');
  const catalogRouterPath = buildRouterPath(data?.Catalog?.Router?.Path ?? '', data?.Catalog);
  return (
    <div class={cx('post_item', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('container')}>
        <div class={cx('header')}>
          <div class={cx('row')}>
            <div class={cx('catalog')}>
              <Link href={catalogRouterPath}>
                <span>{data?.Catalog?.DisplayName}</span>
              </Link>
            </div>
            <div class={cx('seperate')}></div>
            <div class={cx('created_date')}>
              <span>{convertDateFormat(data?.createdAt, DATE_FORMAT)}</span>
            </div>
          </div>
        </div>
        <div class={cx('body')}>
          <div class={cx('post_title')}>
            <h1>{data?.Title}</h1>
          </div>
          {!!data?.Short && (
            <div class={cx('post_short')}>
              <span>{data?.Short}</span>
            </div>
          )}
          {!!data?.Body && (
            <div class={cx('post_body')}>
              <div class={cx('post_body_left')}>
                <Placeholder name={'post_body_left'} theme={theme} routerParams={routerParams} widgets={widgets} />
              </div>
              <div class={cx('post_body_right')}>
                <div class={cx('post_body_content_left')}>
                  <div class={cx('post_body_content')} dangerouslySetInnerHTML={{ __html: marked(data.Body) }}></div>
                </div>
                <div class={cx('post_body_content_right')}>
                  <Placeholder
                    name={'post_body_content_right'}
                    theme={theme}
                    routerParams={routerParams}
                    widgets={widgets}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div class={cx('footer')}></div>
      </div>
    </div>
  );
};

WidgetFactory.Register('post_item', 'Post item', PostItemWidget);
