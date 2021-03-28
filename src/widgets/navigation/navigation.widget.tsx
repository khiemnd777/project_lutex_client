import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { replaceByKeyPairValue } from '_stdio/shared/utils/string.utils';
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
  items?: FullNavigationType[];
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
            <Link href={path}>
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
  return (
    <Fragment>
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
    </Fragment>
  );
};

interface BuildPostCatalogNavItemsArgs {
  items: PostCatalogNavItemType[];
}

const BuildPostCatalogNavItems: FunctionalComponent<BuildPostCatalogNavItemsArgs> = ({ items }) => {
  return (
    <ul>
      {map(items, (item) => {
        const routerPath = item.RouterPath;
        const path = replaceByKeyPairValue(routerPath, item);
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

export default WidgetFactory.Register('navigation', 'Navigation', NavigationWidget);
