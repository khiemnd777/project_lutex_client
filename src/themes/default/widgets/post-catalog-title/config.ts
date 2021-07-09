import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './post-catalog-title.styled.scss';
import topStyles from './top.post-catalog-title.styled.scss';

ThemeFactory.Register('default', 'post_catalog_title', styles);
ThemeFactory.Register('default', 'top_post_catalog_title', topStyles);
