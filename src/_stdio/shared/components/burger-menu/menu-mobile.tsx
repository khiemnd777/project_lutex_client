import { map } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { nav } from './menu-mobile.styled.scss';
import { NavItem } from './nav-item';
import { NavItemModel } from './nav-item-model';

interface MenuArgs {
  open: boolean;
  items?: NavItemModel[];
}

export const MenuMobile: FunctionalComponent<MenuArgs> = ({ open, items }) => {
  return (
    <nav class={nav} open={open}>
      {map(items, (item) => (
        <NavItem item={item} />
      ))}
    </nav>
  );
};
