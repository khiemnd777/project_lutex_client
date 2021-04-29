import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';

const ContainerWidget: FunctionalComponent<WidgetArgs> = ({
  theme,
  parameters,
  routerParams,
  visitorId,
  widgets,
  internalParams,
}) => {
  const placeholderName = GetParameterValue('placeholder', parameters) || 'container';
  const className = GetParameterValue('className', parameters) || 'container';
  const cx = BuildClassNameBind(theme.Name, 'container');
  return (
    <div class={cx(className)}>
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
