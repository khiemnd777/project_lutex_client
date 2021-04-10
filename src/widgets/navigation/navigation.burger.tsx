import { size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { StateUpdater, useRef, useState } from 'preact/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { onSticky } from '_stdio/shared/utils/hooks';
import { FullNavigationType } from './navigation-types';

interface NavigationBurgerArgs {
  data?: FullNavigationType;
  theme: ThemeType;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

export const NavigationBurger: FunctionalComponent<NavigationBurgerArgs> = ({ data, theme, open, setOpen }) => {
  const cx = BuildClassNameBind(theme.Name, 'navigation_burger');
  const navRef = useRef<HTMLButtonElement>();
  const [addedSticky, setAddedSticky] = useState(false);
  onSticky(navRef, setAddedSticky);
  return (
    <button
      ref={navRef}
      class={cx('navigation_burger', addedSticky ? 'sticky' : null, size(data?.Children) ? 'visible' : null)}
      open={open}
      onClick={() => setOpen?.(!open)}
    >
      <div />
      <div />
      <div />
    </button>
  );
};
