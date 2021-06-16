import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { BackgroundImageParallax } from '_stdio/shared/components/background-image-parallax/background-image-parallax';
import SimpleSlider from '_stdio/shared/components/simple-slider/simple-slider';
import { SimpleSliderModel } from '_stdio/shared/components/simple-slider/simple-slider-model';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { CarouselWidgetArgs } from './carousel-interfaces';

const CarouselWidget: FunctionalComponent<CarouselWidgetArgs> = ({ items, theme, styleName }) => {
  const cx = BuildClassNameBind(theme.Name, styleName || 'carousel');
  return (
    <div class={cx('carousel', size(items) ? 'visible' : null)}>
      {size(items) ? (
        <SimpleSlider
          list={map(items, (item) => {
            const expectedMedia = GetSingleMedia(item, MediaFormatEnums.ordinary);
            return {
              template: <BackgroundImageParallax image={expectedMedia.url} />,
            } as SimpleSliderModel;
          })}
          transitionDuration={2000}
          duration={6000}
          arrowAppearance={'light'}
        />
      ) : null}
    </div>
  );
};

WidgetFactory.Register('carousel', 'Carousel', CarouselWidget, new WidgetInstaller());
