import { isEmpty } from 'lodash-es';
import marked from 'marked';
import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './text-field-constants';
import { TextFieldWidgetArgs } from './text-field-interfaces';

export const TextFieldWidget: FunctionalComponent<TextFieldWidgetArgs> = ({
  theme,
  data,
  visitorId,
  routerParams,
  widgets,
  parameters,
}) => {
  const fontSize = GetParameterValue('fontSize', parameters, DefaultParams) ?? '';
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'text_field';
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div
      style={{
        'font-size': fontSize ? fontSize : 'inherit',
      }}
      class={cx('text_field', !isEmpty(data) ? 'visible' : null)}
    >
      <Placeholder
        name="text_field_content_top"
        widgets={widgets}
        theme={theme}
        routerParams={routerParams}
        visitorId={visitorId}
        internalParams={data}
      />
      {data?.Content ? (
        <div class={cx('content')} dangerouslySetInnerHTML={{ __html: marked(data.Content) }}></div>
      ) : null}
      <Placeholder
        name="text_field_content_bottom"
        widgets={widgets}
        theme={theme}
        routerParams={routerParams}
        visitorId={visitorId}
        internalParams={data}
      />
    </div>
  );
};

export default WidgetFactory.Register(
  'text_field',
  'Text field',
  TextFieldWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
