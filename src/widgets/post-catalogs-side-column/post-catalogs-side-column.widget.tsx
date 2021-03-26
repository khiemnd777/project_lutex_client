import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { PostCatalogsSideColumnWidgetArgs } from './post-catalog-types';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';

const PostCatalogsSideColumnWidget: FunctionalComponent<PostCatalogsSideColumnWidgetArgs> = ({
  theme,
  items,
  totalCount,
  onShowMore,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'post_catalogs_side_column');
  return (
    <div class={cx('post_catalogs_side_column', size(items) ? 'visible' : null)}>
      <ul>
        {map(items, (item) => {
          return (
            <li>
              <Link href={`/post-catalog/${item.Slug}`}>
                <span>{item.Name}</span>
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

WidgetFactory.Register('post_catalogs_side_column', 'Post catalogs side column', PostCatalogsSideColumnWidget);
