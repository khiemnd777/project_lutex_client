import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './container.styled.scss';
// Wrapper container
import wrapperContainer from './wrapper-container.styled.scss';
// Header info container
import wrapperHeaderInfoContainerStyles from './header-info-container-wrapper.styled.scss';
import headerInfoContainerStyles from './header-info-container.styled.scss';
// Header nav container
import wrapperHeaderNavContainerStyles from './header-nav-container-wrapper.styled.scss';
import headerNavContainerStyles from './header-nav-container.styled.scss';
import logoContainerStyles from './logo-container.styled.scss';
import navContainerStyles from './nav-container.styled.scss';
// Body container
import bodyContainerStyles from './body-container.styled.scss';
// Footer container
import wrapperFooterContainerStyles from './footer-container-wrapper.styled.scss';
import footerContainerStyles from './footer-container.styled.scss';
import footerItemContainerStyles from './footer-item-container.styled.scss';
// Footer copyright container
import wrapperFooterCopyrightContainerStyles from './footer-copyright-container-wrapper.styled.scss';
import footerCopyrightContainerStyles from './footer-copyright-container.styled.scss';
// Introduction container
import introductionContainerStyles from './introduction-container.styled.scss';
import introductioniImageContainerStyles from './introduction-image-container.styled.scss';
import introductionTextContainerStyles from './introduction-text-container.styled.scss';

// Default
ThemeFactory.Register('default', 'container', styles);
// Wrapper container
ThemeFactory.Register('default', 'wrapper_container', wrapperContainer);
// Header info container
ThemeFactory.Register('default', 'wrapper_header_info_container', wrapperHeaderInfoContainerStyles);
ThemeFactory.Register('default', 'header_info_container', headerInfoContainerStyles);
// Header nav container
ThemeFactory.Register('default', 'wrapper_header_nav_container', wrapperHeaderNavContainerStyles);
ThemeFactory.Register('default', 'header_nav_container', headerNavContainerStyles);
ThemeFactory.Register('default', 'logo_container', logoContainerStyles);
ThemeFactory.Register('default', 'nav_container', navContainerStyles);
// Body container
ThemeFactory.Register('default', 'body_container', bodyContainerStyles);
// Footer container
ThemeFactory.Register('default', 'wrapper_footer_container', wrapperFooterContainerStyles);
ThemeFactory.Register('default', 'footer_container', footerContainerStyles);
ThemeFactory.Register('default', 'footer_item_container', footerItemContainerStyles);
// Footer copyright container
ThemeFactory.Register('default', 'wrapper_footer_copyright_container', wrapperFooterCopyrightContainerStyles);
ThemeFactory.Register('default', 'footer_copyright_container', footerCopyrightContainerStyles);
// Introduction container
ThemeFactory.Register('default', 'introduction_container', introductionContainerStyles);
ThemeFactory.Register('default', 'introduction_image_container', introductioniImageContainerStyles);
ThemeFactory.Register('default', 'introduction_text_container', introductionTextContainerStyles);
