import { FunctionalComponent } from 'preact';
import { CarouselWidgetArgs } from 'widgets/carousel/carousel-interfaces';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { SingleMediaType } from '_stdio/shared/types/image-types';
import { GraphHomeCarousel } from './home-carousel-service';

const HomeCarouselWidgetConfig: FunctionalComponent<WidgetConfigArgs<CarouselWidgetArgs>> = ({
  theme,
  component,
  routerParams,
  parameters,
}) => {
  const { data, loading, error } = GraphHomeCarousel();
  const items = !loading && !error && data ? data?.homeCarousel?.Media : ([] as SingleMediaType[]);
  const styleName = 'home_carousel';
  return component?.call(null, {
    items,
    styleName,
    theme,
    loading,
    error,
    parameters,
    routerParams,
  });
};

WidgetFactory.RegisterConfig('carousel', 'home_carousel', HomeCarouselWidgetConfig);
