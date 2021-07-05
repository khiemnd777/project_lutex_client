import { size } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useRef } from 'preact/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
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
  return (
    <Fragment>
      <button
        ref={navRef}
        class={cx('navigation_burger', size(data?.Children) ? 'visible' : null)}
        open={open}
        onClick={() => setOpen?.(!open)}
      >
        <div />
        <div />
        <div />
      </button>
    </Fragment>
  );
};
