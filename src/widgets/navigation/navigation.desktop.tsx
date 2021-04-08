import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { useEffect, useRef, useState } from 'preact/hooks';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { replaceByKeyPairValue } from '_stdio/shared/utils/string.utils';
import { ChildrenNavigationEnum } from './navigation-enums';
import { NavigationWidgetArgs } from './navigation-interfaces';
import { ChildrenNavigationType, OtherNavItemType, PostCatalogNavItemType } from './navigation-types';

export const NavigationDesktop: FunctionalComponent<NavigationWidgetArgs> = ({ data, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_desktop');
  const navRef = useRef<HTMLDivElement>();
  const [navDom, setNavDom] = useState({} as HTMLElement);
  const [addedSticky, setAddedSticky] = useState(false);
  let navOffsetY = 0;
  useEffect(() => {
    if (navRef?.current) {
      setNavDom(navRef.current);
      navOffsetY = navDom.offsetTop;
    }
    const listener = () => {
      if (navDom) {
        if (window.pageYOffset >= navOffsetY) {
          setAddedSticky(true);
        } else {
          setAddedSticky(false);
        }
      }
    };
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [navRef.current]);
  return (
    <div
      ref={navRef}
      class={cx('navigation_desktop', addedSticky ? 'sticky' : null, size(data?.Children) ? 'visible' : null)}
    >
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
