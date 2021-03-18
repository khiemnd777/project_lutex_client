import styles from './menu-desktop.styled.scss';
import classNamesBind from 'classnames/bind';
import { map } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { NavItem } from './nav-item';
import { NavItemModel } from './nav-item-model';

const cx = classNamesBind.bind(styles);

interface MenuDesktopArgs {
  items?: NavItemModel[];
}

export const MenuDesktop: FunctionalComponent<MenuDesktopArgs> = ({ items }) => {
  const navRef = useRef<HTMLElement>();
  const [navDom, setNavDom] = useState({} as HTMLElement);
  const [addedSticky, setAddedSticky] = useState(false);
  let navOffsetY = 0;
  useEffect(() => {
    if (!!navRef.current) {
      setNavDom(navRef.current);
      navOffsetY = navDom.offsetTop;
    }
    const listener = (evt: Event) => {
      if (!!navDom) {
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
    <nav class={cx('nav', !!addedSticky ? 'stick' : null)} ref={navRef}>
      <div class={cx('background')}></div>
      {map(items, (item) => (
        <NavItem item={item} />
      ))}
    </nav>
  );
};
