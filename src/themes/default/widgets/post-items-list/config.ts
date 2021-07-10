import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import style from './post-items-list.styled.scss';
import commonStyles from './common.post-items-list.styled.scss';
import commonSmallStyles from './common-small.post-items-list.styled.scss';
import singleStyles from './single.post-items-list.styled.scss';
import styleOneStyles from './style-one.post-items-list.styled.scss';
import styleTwoStyles from './style-two.post-items-list.styled.scss';
import styleThreeStyles from './style-three.post-items-list.styled.scss';

ThemeFactory.Register('default', 'post_items_list', style);
ThemeFactory.Register('default', 'post_items_list_common', commonStyles);
ThemeFactory.Register('default', 'post_items_list_common_small', commonSmallStyles);
ThemeFactory.Register('default', 'post_items_list_single', singleStyles);
ThemeFactory.Register('default', 'post_items_list_style_one', styleOneStyles);
ThemeFactory.Register('default', 'post_items_list_style_two', styleTwoStyles);
ThemeFactory.Register('default', 'post_items_list_style_three', styleThreeStyles);
