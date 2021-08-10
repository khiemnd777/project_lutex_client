import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './featured-posts.styled.scss';
import simpleStyles from './simple.featured-posts.styled.scss';
import commonSmallStyles from './common-small.featured-items-list.styled.scss';

ThemeFactory.Register('default', 'featured_posts', styles);
ThemeFactory.Register('default', 'featured_posts_simple', simpleStyles);
ThemeFactory.Register('default', 'featured_posts_list_common_small', commonSmallStyles);
