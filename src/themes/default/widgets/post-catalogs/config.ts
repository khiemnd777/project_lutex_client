import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import style from './post-catalogs.styled.scss';
import burger from './post-catalog-burger.styled.scss';

ThemeFactory.Register('default', 'post_catalogs', style);
ThemeFactory.Register('default', 'post_catalog_burger', burger);
