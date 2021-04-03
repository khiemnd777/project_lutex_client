import { FunctionalComponent } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { FacebookFanpageWidgetArgs } from './facebook-fanpage-interfaces';
import { GraphFacebookFanpage } from './facebook-fanpage-service';
import { FacebookFanpageType } from './facebook-fanpage-types';

const FacebookFanpageWidgetConfig: FunctionalComponent<WidgetConfigArgs<FacebookFanpageWidgetArgs>> = ({
  component,
  theme,
  backgroundColor,
  backgroundImage,
  parameters,
  routerParams,
}) => {
  const { data, loading, error } = GraphFacebookFanpage();
  const matchedData = data && !loading && !error ? data?.facebookFanpage : ({} as FacebookFanpageType);
  return component?.call(null, {
    data: matchedData,
    theme,
    loading,
    error,
    backgroundColor,
    backgroundImage,
    parameters,
    routerParams,
  });
};

WidgetFactory.RegisterConfig('facebook_fanpage', 'facebook_fanpage', FacebookFanpageWidgetConfig);
