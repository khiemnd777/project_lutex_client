import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import PostCatalogBurger from './post-catalog-burger';
import { PostCatalogsListArgs } from './post-catalog-interfaces';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { DefaultParams } from './post-catalog-constants';

const PostCatalogsList: FunctionalComponent<PostCatalogsListArgs> = ({
  theme,
  items,
  parameters,
  routerParams,
  totalCount,
  onShowMore,
  sticky,
  open,
  setOpen,
  responsiveFor,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_catalogs');
  const slug = routerParams?.slug || '';
  const title = GetParameterValue('title', parameters, DefaultParams) || `Post's catalogs`;
  const threeDotAtParam = tryParseInt(GetParameterValue('threeDotAt', parameters, DefaultParams)) || 9;
  return (
    <div
      class={cx('post_catalogs', responsiveFor ?? 'desktop', sticky ? 'sticky' : null, size(items) ? 'visible' : null)}
    >
      <div class={cx('title')} onClick={() => setOpen?.(!open)}>
        <span>{title}</span>
        <PostCatalogBurger theme={theme} open={open} setOpen={setOpen} />
      </div>
      <ul open={open}>
        {map(items, (item) => {
          const routerPath = item.Router?.Path;
          const path = buildRouterPath(routerPath, item);
          return (
            <li class={cx(slug == item.Slug ? 'selected' : null)}>
              <Link href={path}>
                <span>{threeDotsAt(item.Name, threeDotAtParam)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {totalCount && size(items) < totalCount && (
        <div class={cx('show_more')}>
          <a class={cx('show_more_btn')} onClick={onShowMore}>
            <span>Show more</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default PostCatalogsList;
