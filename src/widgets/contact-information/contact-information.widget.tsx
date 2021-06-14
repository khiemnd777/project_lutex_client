import { map, size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './contact-information-constants';
import { ContactInformationWidgetArgs } from './contact-information-interfaces';

const ContactInformationWidget: FunctionalComponent<ContactInformationWidgetArgs> = ({ data, theme, parameters }) => {
  if (!data) return null;
  const fontFaceName = GetParameterValue('fontFaceName', parameters, DefaultParams) || '';
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'contact_information';
  const useIconOnly = parseBool(GetParameterValue('useIconOnly', parameters, DefaultParams));
  const cx = BuildClassNameBind(theme.Name, styleName);
  const icons = BindFontFaceClassNames(fontFaceName);
  // obsoleted param
  const title = GetParameterValue('title', parameters);
  return (
    <div class={cx('contact_information', !isEmpty(data) ? 'visible' : null)}>
      {title ? (
        <div class={cx('title')}>
          <span>{title}</span>
        </div>
      ) : null}
      {size(data.Parameters) ? (
        <div class={cx('children_container')}>
          <ul>
            {map(data.Parameters, (p) => {
              return (
                <li>
                  {p.Icon ? (
                    <span class={cx('icon')}>
                      <i class={icons('icon', p.Icon)}></i>
                    </span>
                  ) : null}
                  {!useIconOnly ? <span class={cx('key')}>{p.Key}: </span> : null}
                  {p.Link ? (
                    <Link href={p.Link}>
                      <span class={cx('value')}>{p.Value}</span>
                    </Link>
                  ) : (
                    <span class={cx('value')}>{p.Value}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

WidgetFactory.Register(
  'contact_information',
  'Contact information',
  ContactInformationWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
