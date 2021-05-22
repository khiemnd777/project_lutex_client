import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './text-field.styled.scss';
import skillTagsStyles from './text-field.skill-tags.styled.scss';

ThemeFactory.Register('resume', 'text_field', styles);
ThemeFactory.Register('resume', 'text_field_skill_tags', skillTagsStyles);
