import { FunctionalComponent, h } from 'preact';
import { StateUpdater, useRef, useState } from 'preact/hooks';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';

interface PostCatalogBurgerArgs {
  theme: ThemeType;
  open?: boolean;
  setOpen?: StateUpdater<boolean>;
}

const PostCatalogBurger: FunctionalComponent<PostCatalogBurgerArgs> = ({ theme, open, setOpen }) => {
  const cx = BuildClassNameBind(theme.Name, 'post_catalog_burger');
  const navRef = useRef<HTMLButtonElement>();
  return (
    <button ref={navRef} class={cx('burger')} open={open} onClick={() => setOpen?.(!open)}>
      <div />
      <div />
      <div />
    </button>
  );
};

export default PostCatalogBurger;
