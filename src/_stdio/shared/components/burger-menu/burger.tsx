import { h } from 'preact';
import { StateUpdater } from 'preact/hooks';
import { nav_burger } from './burger.styled.scss';

interface BurgerArgs {
  open: boolean;
  setOpen: StateUpdater<boolean>;
}

export const Burger = ({ open, setOpen }: BurgerArgs) => {
  return (
    <button class={nav_burger} open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
};
