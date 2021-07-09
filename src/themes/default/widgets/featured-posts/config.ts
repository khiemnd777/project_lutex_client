import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './featured-posts.styled.scss';
import simpleStyles from './simple.featured-posts.styled.scss';

ThemeFactory.Register('default', 'featured_posts', styles);
ThemeFactory.Register('default', 'featured_posts_simple', simpleStyles);
