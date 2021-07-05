import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './text-field.styled.scss';
import footerStyles from './footer-text-field.styled.scss';

ThemeFactory.Register('default', 'text_field', styles);
ThemeFactory.Register('default', 'footer_text_field', footerStyles);
