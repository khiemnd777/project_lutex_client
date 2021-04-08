import { size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { StateUpdater, useEffect, useRef, useState } from 'preact/hooks';
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
  const [navDom, setNavDom] = useState({} as HTMLButtonElement);
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
