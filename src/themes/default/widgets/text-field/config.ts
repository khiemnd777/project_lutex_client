import { ThemeFactory } from '_stdio/core/theme/theme-factory';
import styles from './text-field.styled.scss';
import footerStyles from './footer-text-field.styled.scss';
import introductionTitleStyles from './introduction-title-text-field.styled.scss';
import introductionDescriptionStyles from './introduction-description-text-field.styled.scss';
import missionTitleStyles from './mission-title.text-field.styled.scss';
import missionDescriptionStyles from './mission-description.text-field.styled.scss';
import missionAltDescriptionStyles from './mission-alt.text-field.styled.scss';

ThemeFactory.Register('default', 'text_field', styles);
ThemeFactory.Register('default', 'footer_text_field', footerStyles);
ThemeFactory.Register('default', 'introduction_title_text_field', introductionTitleStyles);
ThemeFactory.Register('default', 'introduction_description_text_field', introductionDescriptionStyles);
ThemeFactory.Register('default', 'mission_title_text_field', missionTitleStyles);
ThemeFactory.Register('default', 'mission_description_text_field', missionDescriptionStyles);
ThemeFactory.Register('default', 'mission_alt_text_field', missionAltDescriptionStyles);
