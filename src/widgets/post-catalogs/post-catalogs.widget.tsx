import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { PostCatalogsWidgetArgs } from './post-catalog-types';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { threeDotsAt, tryParseInt } from '_stdio/shared/utils/string.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import PostCatalogBurger from './post-catalog-burger';
import { onSticky } from '_stdio/shared/utils/hooks';

const PostCatalogsWidget: FunctionalComponent<PostCatalogsWidgetArgs> = ({
  theme,
  items,
  parameters,
  routerParams,
  totalCount,
  onShowMore,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_catalogs');
  const slug = routerParams?.slug || '';
  const title = GetParameterValue('title', parameters) || `Post's catalogs`;
  const threeDotAtParam = tryParseInt(GetParameterValue('threeDotAt', parameters)) || 9;
  const [open, setOpen] = useState<boolean>(true);
  const [addedSticky, setAddedSticky] = useState(false);
  const refEl = useRef<HTMLDivElement>(null);
  onSticky(refEl, (sticky) => {
    setAddedSticky(sticky);
    setOpen(!sticky);
  });
  return (
    <div ref={refEl} class={cx('post_catalogs', addedSticky ? 'sticky' : null, size(items) ? 'visible' : null)}>
      <div class={cx('title')} onClick={() => setOpen?.(!open)}>
        <span>{title}</span>
        <PostCatalogBurger theme={theme} open={open} setOpen={setOpen} />
      </div>
      <ul open={open}>
        {map(items, (item) => {
          return (
            <li class={cx(slug == item.Slug ? 'selected' : null)}>
              <Link href={`/post-catalog/${item.Slug}`}>
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

WidgetFactory.Register('post_catalogs', 'Post catalogs', PostCatalogsWidget);
