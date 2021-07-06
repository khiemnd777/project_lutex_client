import classNamesBind from 'classnames/bind';
import { Ref } from 'preact/hooks';
import styles from './template-grid.styled.scss';

export const showTemplateGridItem = (gridElmRef?: Ref<HTMLDivElement>) => {
  const cb = classNamesBind.bind(styles);
  gridElmRef?.current?.classList?.add(cb('grid_item_visible'));
};