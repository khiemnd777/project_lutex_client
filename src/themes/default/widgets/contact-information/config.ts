import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './contact-information.styled.scss';
import footerStyles from './footer-contact-information.styled.scss';

ThemeFactory.Register('default', 'contact_information', styles);
ThemeFactory.Register('default', 'footer_contact_information', footerStyles);
