import first from 'lodash-es/first';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { ChildrenNavigationEnum } from './navigation-enums';
import { NavigationWidgetArgs } from './navigation-interfaces';
import {
  ChildrenNavigationType,
  FullNavigationType,
  OtherNavItemType,
  PostCatalogNavItemType,
} from './navigation-types';

const NavigationWidget: FunctionalComponent<NavigationWidgetArgs> = ({ items, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation');
  return (
    <div class={cx('navigation', size(items) ? 'visible' : null)}>
      <BuildNavigation items={items} />
    </div>
  );
};

interface BuildNavigationArgs {
  items: FullNavigationType[];
}

const BuildNavigation: FunctionalComponent<BuildNavigationArgs> = ({ items }) => {
  return (
    <ul>
      {map(items, (item) => {
        const displayName = item.DisplayName;
        const path = item.Path;
        const icon = item.Icon;
        const children = item.Children;
        return (
          <li>
            <Link path={path}>
              <i class={icon}></i>
              <span>{displayName}</span>
            </Link>
            <BuildChildren items={children} />
          </li>
        );
      })}
    </ul>
  );
};

interface BuildChildrenArgs {
  items: ChildrenNavigationType[];
}

const BuildChildren: FunctionalComponent<BuildChildrenArgs> = ({ items }) => {
  if (!size(items)) {
    return null;
  }
  return !size(first(items)?.Children) ? null : (
    <ul>
      {map(items, (item) => {
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
    </ul>
  );
};

interface BuildPostCatalogNavItemsArgs {
  items: PostCatalogNavItemType[];
}

const BuildPostCatalogNavItems: FunctionalComponent<BuildPostCatalogNavItemsArgs> = ({ items }) => {
  return <li></li>;
};

interface BuildOtherNavItemArgs {
  items: OtherNavItemType[];
}

const BuildOthersNavItems: FunctionalComponent<BuildOtherNavItemArgs> = ({ items }) => {
  return <li></li>;
};

WidgetFactory.Register('navigation', 'Navigation', NavigationWidget);
