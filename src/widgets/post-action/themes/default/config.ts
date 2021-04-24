import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './post-action.styled.scss';
import sharedLinkStyles from './post-action-shared-link.styled.scss';

ThemeFactory.Register('default', 'post_action', styles);
ThemeFactory.Register('default', 'post_action_shared_link', sharedLinkStyles);
