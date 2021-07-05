import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './title.styled.scss';
import footerStyles from './footer-title.styled.scss';

ThemeFactory.Register('default', 'title', styles);
ThemeFactory.Register('default', 'footer_title', footerStyles);
