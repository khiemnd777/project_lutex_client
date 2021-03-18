import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { NavItemModel } from './nav-item-model';
import { active } from './menu-desktop.styled.scss';

interface NavItemArgs {
  item: NavItemModel;
}

export const NavItem: FunctionalComponent<NavItemArgs> = ({ item }) => {
  return (
    <Link activeClassName={active} href={`/${item.url}`}>
      <span>{item.name}</span>
    </Link>
  );
};
