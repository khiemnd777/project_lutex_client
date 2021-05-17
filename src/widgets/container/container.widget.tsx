import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './container-constants';

const ContainerWidget: FunctionalComponent<WidgetArgs> = ({
  theme,
  parameters,
  routerParams,
  visitorId,
  widgets,
  internalParams,
}) => {
  const placeholderName = GetParameterValue('placeholder', parameters, DefaultParams) || DefaultParams.placeholer;
  const width = GetParameterValue('width', parameters, DefaultParams);
  const flex = GetParameterValue('flex', parameters, DefaultParams);
  const display = GetParameterValue('display', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, 'container');
  const style = {};
  if (display) {
    style['display'] = display;
  }
  if (width) {
    style['width'] = width;
  }
  if (flex) {
    style['flex'] = flex;
  }
  return (
    <div style={style} class={cx('container')}>
      <Placeholder
        name={placeholderName}
        theme={theme}
        routerParams={routerParams}
        visitorId={visitorId}
        widgets={widgets}
        internalParams={internalParams}
      />
    </div>
  );
};

export default WidgetFactory.Register('container', 'Container', ContainerWidget);
