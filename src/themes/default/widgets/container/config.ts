import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './container.styled.scss';
import wrapperStyles from './container.styled.scss';

ThemeFactory.Register('default', 'container', styles);
ThemeFactory.Register('default', 'wrapper_container', wrapperStyles);
