import first from 'lodash-es/first';
import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './picked-navigation-constants';
import { PickedNavigationWidgetArgs } from './picked-navigation-interfaces';
import { GraphPickedNavigation } from './picked-navigation-service';
import { PickedNavigationType } from './picked-navigation-types';

const PickedNavigationWidgetConfig: FunctionalComponent<WidgetConfigArgs<PickedNavigationWidgetArgs>> = ({
  component,
  backgroundColor,
  backgroundImage,
  theme,
  parameters,
  routerParams,
}) => {
  const name = GetParameterValue('name', parameters, DefaultParams);
  const { data, loading, error } = GraphPickedNavigation(name);
  const result = data && !loading && !error ? data?.navigations : [];
  const matchedData = first(result) || ({} as PickedNavigationType);
  return createElement(component, {
    data: matchedData,
    backgroundImage,
    backgroundColor,
    theme,
    loading,
    error,
    parameters,
    routerParams,
  });
};

WidgetFactory.RegisterConfig('picked_navigation', 'picked_navigation', PickedNavigationWidgetConfig);
