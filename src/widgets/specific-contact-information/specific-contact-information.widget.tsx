import { isEmpty } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { BindFontFaceClassNames } from '_stdio/core/font-faces/font-face-utils';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { SpecificContactInformationWidgetArgs } from './specific-contact-information-interfaces';
import { DefaultParams } from './specific-contact.information-constants';

const SpecificContactInformationWidget: FunctionalComponent<SpecificContactInformationWidgetArgs> = ({
  theme,
  data,
  parameters,
}) => {
  const fontFaceName = GetParameterValue('fontFaceName', parameters, DefaultParams) || '';
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'specific_contact_information';
  const useIconOnly = parseBool(GetParameterValue('useIconOnly', parameters, DefaultParams));
  const cx = BuildClassNameBind(theme.Name, styleName);
  const icons = BindFontFaceClassNames(fontFaceName);
  return (
    <div class={cx('specific_contact_information', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('container')}>
        {data?.Icon ? (
          <span class={cx('icon')}>
            <i class={icons('icon', data?.Icon)}></i>
          </span>
        ) : null}
        {!useIconOnly ? (
          data?.Label ? (
            <span class={cx('label')}>{data?.Label}: </span>
          ) : (
            <span class={cx('key')}>{data?.Key}: </span>
          )
        ) : null}
        {data?.Link ? (
          <a href={data?.Link}>
            <span class={cx('value')}>{data.Value}</span>
          </a>
        ) : (
          <span class={cx('value')}>{data?.Value}</span>
        )}
      </div>
    </div>
  );
};

export default WidgetFactory.Register(
  'specific_contact_information',
  'Specific contact information',
  SpecificContactInformationWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
