import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './picked-navigation.styled.scss';
import footerStyles from './footer-picked-navigation.styled.scss';

ThemeFactory.Register('default', 'picked_navigation', styles);
ThemeFactory.Register('default', 'footer_picked_navigation', footerStyles);
