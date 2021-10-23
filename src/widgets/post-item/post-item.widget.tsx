import { map, size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import marked from 'marked';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect, useRef } from 'preact/hooks';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import Loading from '_stdio/shared/components/loading/loading';
import { convertDateFormat, DATE_FORMAT } from '_stdio/shared/utils/date.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './post-item-constants';
import { PostItemWidgetArgs } from './post-item-interface';

const PostItemWidget: FunctionalComponent<PostItemWidgetArgs> = ({
  theme,
  visitorId,
  data,
  widgets,
  routerParams,
  parameters,
  loading,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_item');
  const catalogRouterPath = buildRouterPath(data?.Catalog?.Router?.Path ?? '', data?.Catalog);
  const enableTags = parseBool(GetParameterValue('enableTags', parameters, DefaultParams));
  const bodyLeftRef = useRef<HTMLDivElement>();
  const bodyRightRef = useRef<HTMLDivElement>();
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);
  return (
    <Fragment>
      <Loading hidden={!loading} />
      <div class={cx('post_item', !isEmpty(data) ? 'visible' : null)}>
        <div class={cx('container')}>
          <div class={cx('header')}>
              {enableTags && size(data?.Tags) ? (
                <div class={cx('tags')}>
                  {map(data?.Tags, (tag) => {
                    const path = !isEmpty(tag.Router) ? buildRouterPath(tag.Router.Path, tag) : '';
                    return (
                      <Link href={path} class={cx('link')} title={tag.Tag}>
                        <span>{tag.Tag}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
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
                <div ref={bodyLeftRef} class={cx('post_body_left')}>
                  <Placeholder
                    name={'post_action'}
                    theme={theme}
                    routerParams={routerParams}
                    widgets={widgets}
                    visitorId={visitorId}
                    internalParams={{
                      postItem: {
                        id: data?.id,
                        Slug: data?.Slug,
                        Router: data?.Router,
                      },
                      CatalogId: data?.Catalog?.id,
                      postItemId: data?.id,
                      containerRef: bodyLeftRef,
                    }}
                  />
                </div>
                <div class={cx('post_body_right')}>
                  <div class={cx('post_body_content_left')}>
                    <div class={cx('post_body_content')} dangerouslySetInnerHTML={{ __html: marked(data.Body) }}></div>
                  </div>
                  <div ref={bodyRightRef} class={cx('post_body_content_right')}>
                    <Placeholder
                      name={'post_body_content_right'}
                      theme={theme}
                      routerParams={routerParams}
                      widgets={widgets}
                      internalParams={{
                        postId: data?.id,
                        containerRef: bodyRightRef,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {data && data?.Catalog ? (
            <div class={cx('footer')}>
              <div class={cx('footer_container')}>
                <Placeholder
                  name={'post_footer'}
                  theme={theme}
                  routerParams={routerParams}
                  widgets={widgets}
                  internalParams={{
                    CatalogId: data?.Catalog?.id,
                    postItem: {
                      id: data?.id,
                      Slug: data?.Slug,
                      Router: data?.Router,
                    },
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

WidgetFactory.Register('post_item', 'Post item', PostItemWidget, new WidgetInstaller(PackDefaultParams(DefaultParams)));
