import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import style from './post-items-list.styled.scss';
import commonStyles from './common.post-items-list.styled.scss';
import commonSmallStyles from './common-small.post-items-list.styled.scss';
import singleStyles from './single.post-items-list.styled.scss';

ThemeFactory.Register('default', 'post_items_list', style);
ThemeFactory.Register('default', 'post_items_list_common', commonStyles);
ThemeFactory.Register('default', 'post_items_list_common_small', commonSmallStyles);
ThemeFactory.Register('default', 'post_items_list_single', singleStyles);
