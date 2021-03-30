import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { StateUpdater } from 'preact/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { FullNavigationType } from './navigation-types';

interface NavigationBurgerArgs {
  items?: FullNavigationType[];
  theme: ThemeType;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

export const NavigationBurger: FunctionalComponent<NavigationBurgerArgs> = ({ items, theme, open, setOpen }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_burger');
  return (
    <button
      class={cx('navigation_burger', size(items) ? 'visible' : null)}
      open={open}
      onClick={() => setOpen?.(!open)}
    >
      <div />
      <div />
      <div />
    </button>
  );
};
