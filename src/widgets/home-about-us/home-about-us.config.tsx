import { FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { HomeAboutUsWidgetArgs } from './home-about-us-interfaces';
import { GraphHomeAboutUs } from './home-about-us-service';
import { HomeAboutUsType } from './home-about-us-types';

const HomeAboutUsWidgetConfig: FunctionalComponent<WidgetConfigArgs<HomeAboutUsWidgetArgs>> = ({
  theme,
  component,
  routerParams,
  parameters,
}) => {
  const { data, loading, error } = GraphHomeAboutUs();
  const item = !loading && !error ? data?.homeAboutUs : ({} as HomeAboutUsType);
  return component?.call(null, {
    data: item,
    theme,
    loading,
    error,
    routerParams,
    parameters,
  });
};

WidgetFactory.RegisterConfig('home_about_us', 'home_about_us', HomeAboutUsWidgetConfig);
