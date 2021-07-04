import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './container.styled.scss';
import headerInfoContainerStyles from './header-info-container.styled.scss';
import wrapperHeaderInfoContainerStyles from './wrapper-header-info-container.styled.scss';

ThemeFactory.Register('default', 'container', styles);
ThemeFactory.Register('default', 'header_info_container', headerInfoContainerStyles);
ThemeFactory.Register('default', 'wrapper_header_info_container', wrapperHeaderInfoContainerStyles);
