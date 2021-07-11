import { Fragment, FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { RelatedPostItemsListWidgetArgs } from './related-post-items-list-interfaces';
import { map, size } from 'lodash-es';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { Link } from 'preact-router/match';
import { GetParameterValue, GetParameterValueWithGeneric } from '_stdio/shared/utils/params.util';
import { PropRef, useRef, useState } from 'preact/hooks';
import StickyAnchor from '_stdio/shared/components/sticky/sticky-anchor';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { DefaultParams } from './related-post-items-list-constants';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';

const RelatedPostItemsListWidget: FunctionalComponent<RelatedPostItemsListWidgetArgs> = ({
  theme,
  data,
  widgets,
  internalParams,
  routerParams,
  parameters,
  visitorId,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const containerRef = GetParameterValueWithGeneric<PropRef<HTMLDivElement>>('containerRef', internalParams);
  const stickedRef = useRef<HTMLDivElement>();
  const [addedSticky, setAddedSticky] = useState(false);
  return (
    <Fragment>
      <StickyAnchor stickyRef={stickedRef} containerRef={containerRef} handler={setAddedSticky} paddingBottom={80} />
      <div ref={stickedRef} class={cx('related_posts', size(data) ? 'visible' : null, addedSticky ? 'sticky' : null)}>
        <div class={cx('related_posts_top')}>
          <Placeholder
            name={'related_posts_top'}
            theme={theme}
            widgets={widgets}
            internalParams={internalParams}
            routerParams={routerParams}
            visitorId={visitorId}
          />
        </div>
        <div class={cx('related_posts_body')}>
          <div class={cx('related_posts_body_container')}>
            {size(data) ? (
              <ul>
                {map(data, (item) => {
                  const routerPath = buildRouterPath(item.Router.Path, item);
                  return (
                    <li>
                      <Link href={routerPath}>
                        <span>{item.Title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
        <div class={cx('related_posts_bottom')}>
          <Placeholder
            name={'related_posts_bottom'}
            theme={theme}
            widgets={widgets}
            internalParams={internalParams}
            routerParams={routerParams}
            visitorId={visitorId}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default WidgetFactory.Register(
  'related_posts',
  'Related posts',
  RelatedPostItemsListWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
