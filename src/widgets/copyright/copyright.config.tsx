import { createElement, FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { CopyrightWidgetArgs } from './copyright-interfaces';
import { GraphCopyright } from './copyright-service';
import { CopyrightType } from './copyright-types';

const CopyrightWidgetConfig: FunctionalComponent<WidgetConfigArgs<CopyrightWidgetArgs>> = ({
  component,
  theme,
  backgroundImage,
  backgroundColor,
  parameters,
  routerParams,
}) => {
  const { data, loading, error } = GraphCopyright();
  const matchedData = data && !loading && !error ? data?.environment : ({} as CopyrightType);
  return createElement(component, {
    data: matchedData,
    loading,
    error,
    theme,
    backgroundColor,
    backgroundImage,
    parameters,
    routerParams,
  });
};

WidgetFactory.RegisterConfig('copyright', 'copyright', CopyrightWidgetConfig);
