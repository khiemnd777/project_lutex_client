import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import desktop from './navigation-desktop.styled.scss';
import mobile from './navigation-mobile.styled.scss';
import burger from './navigation-burger.styled.scss';

ThemeFactory.Register('default', 'navigation_desktop', desktop);
ThemeFactory.Register('default', 'navigation_mobile', mobile);
ThemeFactory.Register('default', 'navigation_burger', burger);
