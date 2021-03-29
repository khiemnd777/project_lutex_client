import { FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { SingleMediaType } from '_stdio/shared/types/image-types';
import { LogoWidgetArgs } from './logo-interfaces';
import { GraphLogo } from './logo-service';

const LogoWidgetConfig: FunctionalComponent<WidgetConfigArgs<LogoWidgetArgs>> = ({ component, theme }) => {
  const { data, loading, error } = GraphLogo();
  const logo = !loading && !error && data ? data.environment.Logo : ({} as SingleMediaType);
  return component?.call(null, {
    logo,
    theme,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('logo', 'logo', LogoWidgetConfig);
