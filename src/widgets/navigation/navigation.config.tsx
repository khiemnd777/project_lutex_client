import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { NavigationWidgetArgs } from './navigation-interfaces';
import { GraphNavigations } from './navigation-service';

const NavigationWidgetConfig: FunctionalComponent<WidgetConfigArgs<NavigationWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
}) => {
  const { data, loading, error } = GraphNavigations(true);
  const items = !loading && !error ? data?.navigations : [];
  return (
    <Fragment>
      {component?.call(null, {
        theme,
        items,
        loading,
        error,
        routerParams,
        parameters,
      })}
    </Fragment>
  );
};

export default WidgetFactory.RegisterConfig('navigation', 'navigation', NavigationWidgetConfig);
