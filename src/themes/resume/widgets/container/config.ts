import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './container.styled.scss';
import containerOuterStyles from './container-outer.styled.scss';

ThemeFactory.Register('resume', 'container', styles);
ThemeFactory.Register('resume', 'container_outer', containerOuterStyles);
