import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { ChildrenNavigationEnum } from './picked-navigation-enums';
import { PickedNavigationWidgetArgs } from './picked-navigation-interfaces';
import { OtherNavItemType, PostCatalogNavItemType } from './picked-navigation-types';

const PickedNavigationWidget: FunctionalComponent<PickedNavigationWidgetArgs> = ({ data, theme }) => {
  if (!data) return null;
  const cx = BuildClassNameBind(theme.Name, 'picked_navigation');
  return (
    <div class={cx('picked_navigation', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('title')}>
        <span>{data.DisplayName}</span>
      </div>
      {size(data.Children) ? (
        <div class={cx('children_container')}>
          {map(data.Children, (item) => {
            switch (item.__typename) {
              case ChildrenNavigationEnum.PostCatalog: {
                const router = item.Router || {
                  Path: '/',
                };
                return (
                  <BuildPostCatalogNavItems
                    items={map(
                      item.Children,
                      (item) =>
                        ({
                          id: item.id,
                          DisplayName: item.DisplayName,
                          Name: item.Name,
                          RouterPath: router.Path,
                          Slug: item.Slug,
                        } as PostCatalogNavItemType)
                    )}
                  />
                );
              }
              case ChildrenNavigationEnum.Others:
              default: {
                return (
                  <BuildOthersNavItems
                    items={map(
                      item.Children,
                      (item) =>
                        ({
                          id: item.id,
                          DisplayName: item.DisplayName,
                          Name: item.Name,
                          Path: item.Path,
                        } as OtherNavItemType)
                    )}
                  />
                );
              }
            }
          })}
        </div>
      ) : null}
    </div>
  );
};

interface BuildPostCatalogNavItemsArgs {
  items: PostCatalogNavItemType[];
}

const BuildPostCatalogNavItems: FunctionalComponent<BuildPostCatalogNavItemsArgs> = ({ items }) => {
  return (
    <ul>
      {map(items, (item) => {
        const path = buildRouterPath(item?.RouterPath, item);
        return (
          <li>
            <Link href={path}>
              <span>{item.DisplayName}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

interface BuildOtherNavItemArgs {
  items: OtherNavItemType[];
}

const BuildOthersNavItems: FunctionalComponent<BuildOtherNavItemArgs> = ({ items }) => {
  return (
    <ul>
      {map(items, (item) => {
        return (
          <li>
            <Link href={item.Path}>
              <span>{item.DisplayName}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

WidgetFactory.Register('picked_navigation', 'Picked navigation', PickedNavigationWidget);
