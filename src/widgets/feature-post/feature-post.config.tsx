import find from 'lodash-es/find';
import first from 'lodash-es/first';
import size from 'lodash-es/size';
import { FunctionalComponent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { GetDatetimeServer } from '_stdio/shared/utils/datetime-server/datetime-server';
import { FeaturePostWidgetArgs } from './feature-post-interfaces';
import { GraphFeaturePost } from './feature-post-service';
import { FeaturePostType } from './feature-post-types';

const FeaturePostWidgetConfig: FunctionalComponent<WidgetConfigArgs<FeaturePostWidgetArgs>> = ({
  theme,
  component,
  backgroundColor,
  routerParams,
  parameters,
}) => {
  const [datetimeServer, setDatetimeServer] = useState<Date>({} as Date);
  useEffect(() => {
    void GetDatetimeServer().then((value) => {
      setDatetimeServer(value);
    });
  }, []);
  const slug = find(parameters, (p) => p.name === 'slug');
  const { data, loading, error } = GraphFeaturePost(slug?.value || '');
  const result = data && !loading && !error ? data?.postCatalogs : [];
  const matchedData = size(result) ? first(result) : ({} as FeaturePostType);
  return component?.call(null, {
    data: matchedData,
    datetimeServer,
    backgroundColor,
    theme,
    routerParams,
    parameters,
    loading,
    error,
  });
};

WidgetFactory.RegisterConfig('feature_post', 'feature_post', FeaturePostWidgetConfig);
