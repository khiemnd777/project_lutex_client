import { useOnClickOutside } from '_stdio/shared/utils/hooks';
import { FunctionalComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { Burger } from './burger';
import { MenuDesktop } from './menu-desktop';
import { MenuMobile } from './menu-mobile';
import { NavItemModel } from './nav-item-model';

interface NavArgs {
  items?: NavItemModel[];
}

export const Nav: FunctionalComponent<NavArgs> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const node = useRef(null);
  useOnClickOutside(node, () => setOpen(false));
  return (
    <div ref={node}>
      <Burger open={open} setOpen={setOpen} />
      <MenuMobile open={open} items={items} />
      <MenuDesktop items={items} />
    </div>
  );
};
