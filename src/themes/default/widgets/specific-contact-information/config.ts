import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './specific-contact-information.styled.scss';
import headerStyles from './header-container-information.styled.scss';

ThemeFactory.Register('default', 'specific_contact_information', styles);
ThemeFactory.Register('default', 'header_contact_information', headerStyles);
