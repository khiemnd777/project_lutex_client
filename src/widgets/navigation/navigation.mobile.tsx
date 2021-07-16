import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { Fragment, FunctionalComponent, h } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import { StateUpdater, useState } from 'preact/hooks';
import { buildRouterPath } from '_stdio/core/router/router-utils';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { ChildrenNavigationEnum } from './navigation-enums';
import { NavigationMobileWidgetArgs } from './navigation-interfaces';
import { ChildrenNavigationType, OtherNavItemType, PostCatalogNavItemType } from './navigation-types';

export const NavigationMobile: FunctionalComponent<NavigationMobileWidgetArgs> = ({ data, open, setOpen, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_mobile');
  const [selectedId, setSelectedId] = useState<string>('');
  return (
    <div open={open} class={cx('navigation_mobile', size(data?.Children) ? 'visible' : null)}>
      <div class={cx('overlay')}></div>
      <BuildChildren
        theme={theme}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        items={data?.Children}
        setOpen={setOpen}
        open={open}
      />
    </div>
  );
};

interface BuildChildrenArgs {
  theme: ThemeType;
  items?: ChildrenNavigationType[];
  selectedId?: string;
  setSelectedId?: StateUpdater<string>;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

const BuildChildren: FunctionalComponent<BuildChildrenArgs> = ({
  theme,
  selectedId,
  setSelectedId,
  items,
  open,
  setOpen,
}) => {
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
                theme={theme}
                open={open}
                setOpen={setOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
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
                theme={theme}
                open={open}
                setOpen={setOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
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
  theme: ThemeType;
  items: PostCatalogNavItemType[];
  selectedId?: string;
  setSelectedId?: StateUpdater<string>;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

const BuildPostCatalogNavItems: FunctionalComponent<BuildPostCatalogNavItemsArgs> = ({
  theme,
  items,
  selectedId,
  setSelectedId,
  open,
  setOpen,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_mobile');
  const onClickToNavigate = (item: PostCatalogNavItemType, evt: h.JSX.TargetedMouseEvent<EventTarget>) => {
    evt.stopImmediatePropagation();
    const path = buildRouterPath(item?.RouterPath, item);
    setSelectedId?.call(null, item.id);
    setOpen?.call(null, false);
    route(path);
  };
  const onClickToExpand = (item: PostCatalogNavItemType, evt: h.JSX.TargetedMouseEvent<EventTarget>) => {
    evt.stopImmediatePropagation();
    setSelectedId?.call(null, selectedId === item.id ? '' : item.id);
  };
  return (
    <ul>
      {map(items, (item) => {
        return (
          <li>
            {size(item.Children) ? (
              <Link
                href="#"
                onClick={(evt) => onClickToExpand(item, evt)}
                class={cx(selectedId === item.id ? 'expand' : null)}
              >
                <span>{item.DisplayName}</span>
              </Link>
            ) : (
              <Link
                href="#"
                onClick={(evt) => onClickToNavigate(item, evt)}
                class={cx(selectedId === item.id ? 'selected' : null)}
              >
                <span>{item.DisplayName}</span>
              </Link>
            )}
            {size(item.Children) ? (
              <BuildChildren
                theme={theme}
                children={item.Children}
                setOpen={setOpen}
                open={open}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

interface BuildOtherNavItemArgs {
  theme: ThemeType;
  items: OtherNavItemType[];
  selectedId?: string;
  setSelectedId?: StateUpdater<string>;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

const BuildOthersNavItems: FunctionalComponent<BuildOtherNavItemArgs> = ({
  theme,
  selectedId,
  setSelectedId,
  items,
  open,
  setOpen,
}) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_mobile');
  const onClickToNavigate = (item: OtherNavItemType, evt: h.JSX.TargetedMouseEvent<EventTarget>) => {
    evt.stopImmediatePropagation();
    setSelectedId?.call(null, item.id);
    setOpen?.call(null, false);
    item && item.Path && route(item.Path);
  };
  const onClickToExpand = (item: OtherNavItemType, evt: h.JSX.TargetedMouseEvent<EventTarget>) => {
    evt.stopImmediatePropagation();
    setSelectedId?.call(null, selectedId === item.id ? '' : item.id);
  };
  return (
    <ul>
      {map(items, (item) => {
        return (
          <li>
            {size(item.Children) ? (
              <Link
                href="#"
                onClick={(evt) => onClickToExpand(item, evt)}
                class={cx(selectedId === item.id ? 'expand' : null)}
              >
                <span>{item.DisplayName}</span>
              </Link>
            ) : (
              <Link
                href="#"
                onClick={(evt) => onClickToNavigate(item, evt)}
                class={cx(selectedId === item.id ? 'selected' : null)}
              >
                <span>{item.DisplayName}</span>
              </Link>
            )}
            {size(item.Children) ? (
              <BuildChildren
                theme={theme}
                items={item.Children}
                setOpen={setOpen}
                open={open}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};
