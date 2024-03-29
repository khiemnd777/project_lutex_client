import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './post-catalog-constants';
import { PostCatalogsWidgetArgs } from './post-catalog-interfaces';
import PostCatalogsDesktop from './post-catalogs.desktop';
import PostCatalogsMobile from './post-catalogs.mobile';

const PostCatalogsWidget: FunctionalComponent<PostCatalogsWidgetArgs> = ({
  theme,
  items,
  parameters,
  routerParams,
  totalCount,
  onShowMore,
}) => {
  return (
    <Fragment>
      <PostCatalogsDesktop
        theme={theme}
        items={items}
        parameters={parameters}
        routerParams={routerParams}
        totalCount={totalCount}
        onShowMore={onShowMore}
      />
      <PostCatalogsMobile
        theme={theme}
        items={items}
        parameters={parameters}
        routerParams={routerParams}
        totalCount={totalCount}
        onShowMore={onShowMore}
      />
    </Fragment>
  );
};

WidgetFactory.Register(
  'post_catalogs',
  'Post catalogs',
  PostCatalogsWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
