import { size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { ContactInformationWidgetArgs } from './contact-information-interfaces';

const ContactInformationWidget: FunctionalComponent<ContactInformationWidgetArgs> = ({ data, theme, parameters }) => {
  if (!data) return null;
  const cx = BuildClassNameBind(theme.Name, 'contact_information');
  const title = GetParameterValue('title', parameters);
  return (
    <div class={cx('contact_information', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('title')}>
        <span>{title}</span>
      </div>
      {/* {size(data.Parameters)} */}
    </div>
  );
};

WidgetFactory.Register('contact_information', 'Contact information', ContactInformationWidget);
