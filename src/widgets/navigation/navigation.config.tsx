import first from 'lodash-es/first';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './navigation-constants';
import { NavigationWidgetArgs } from './navigation-interfaces';
import { GraphNavigationsByName } from './navigation-service';
import { FullNavigationType } from './navigation-types';

const NavigationWidgetConfig: FunctionalComponent<WidgetConfigArgs<NavigationWidgetArgs>> = ({
  theme,
  component,
  parameters,
  routerParams,
}) => {
  const name = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphNavigationsByName(name);
  const items = !loading && !error ? data?.navigations : [];
  const matchedData = first(items) || ({} as FullNavigationType);
  return (
    <Fragment>
      {createElement(component, {
        theme,
        data: matchedData,
        loading,
        error,
        routerParams,
        parameters,
      })}
    </Fragment>
  );
};

export default WidgetFactory.RegisterConfig('navigation', 'navigation', NavigationWidgetConfig);
