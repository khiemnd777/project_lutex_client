import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './container.styled.scss';
// Header info container
import wrapperHeaderInfoContainerStyles from './header-info-container-wrapper.styled.scss';
import headerInfoContainerStyles from './header-info-container.styled.scss';
// Header nav container
import wrapperHeaderNavContainerStyles from './header-nav-container-wrapper.styled.scss';
import headerNavContainerStyles from './header-nav-container.styled.scss';
import logoContainerStyles from './logo-container.styled.scss';
import navContainerStyles from './nav-container.styled.scss';

// Default
ThemeFactory.Register('default', 'container', styles);
// Header info container
ThemeFactory.Register('default', 'wrapper_header_info_container', wrapperHeaderInfoContainerStyles);
ThemeFactory.Register('default', 'header_info_container', headerInfoContainerStyles);
// Header nav container
ThemeFactory.Register('default', 'wrapper_header_nav_container', wrapperHeaderNavContainerStyles);
ThemeFactory.Register('default', 'header_nav_container', headerNavContainerStyles);
ThemeFactory.Register('default', 'logo_container', logoContainerStyles);
ThemeFactory.Register('default', 'nav_container', navContainerStyles);
