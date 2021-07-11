import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { ChildrenNavigationEnum } from './navigation-enums';
import { NavigationMobileWidgetArgs } from './navigation-interfaces';
import { ChildrenNavigationType, OtherNavItemType, PostCatalogNavItemType } from './navigation-types';

export const NavigationMobile: FunctionalComponent<NavigationMobileWidgetArgs> = ({ data, open, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_mobile');
  return (
    <div open={open} class={cx('navigation_mobile', size(data?.Children) ? 'visible' : null)}>
      <div class={cx('overlay')}></div>
      <BuildChildren items={data?.Children} />
    </div>
  );
};

interface BuildChildrenArgs {
  items?: ChildrenNavigationType[];
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
                items={map(item.Children, (item) => {
                  const routerPath = item.Router ? item.Router.Path : router.Path;
                  return {
                    id: item.id,
                    DisplayName: item.DisplayName,
                    Name: item.Name,
                    RouterPath: routerPath,
                    Slug: item.Slug,
                    Children: item.Children,
                  } as PostCatalogNavItemType;
                })}
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
                      Children: item.Children,
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
        const path = buildRouterPath(item?.RouterPath, item);
        return (
          <li>
            {size(item.Children) ? (
              <Link href="#">
                <span>{item.DisplayName}</span>
              </Link>
            ) : (
              <Link href={path}>
                <span>{item.DisplayName}</span>
              </Link>
            )}
            {size(item.Children) ? <BuildChildren children={item.Children} /> : null}
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
            {size(item.Children) ? (
              <Link href="#">
                <span>{item.DisplayName}</span>
              </Link>
            ) : (
              <Link href={item.Path}>
                <span>{item.DisplayName}</span>
              </Link>
            )}
            {size(item.Children) ? <BuildChildren items={item.Children} /> : null}
          </li>
        );
      })}
    </ul>
  );
};
