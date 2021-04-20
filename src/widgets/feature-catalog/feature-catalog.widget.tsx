import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import first from 'lodash-es/first';
import { FunctionalComponent, h } from 'preact';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind, GetClassNameValues } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { GetParameterOrDataValue, GetParameterValue } from '_stdio/shared/utils/params.util';
import { threeDotsAt } from '_stdio/shared/utils/string.utils';
import { FeatureCatalogWidgetArgs } from './feature-catalog-interfaces';
import { VisualizedCatalogType } from './feature-catalog-types';
import TemplateGrid from '_stdio/shared/components/template-grid/template-grid';
import TemplateGridItem, { TemplateGridArgs } from '_stdio/shared/components/template-grid/template-grid-item';
import ImageContainer from '_stdio/shared/components/image-container/image-container';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { Link } from 'preact-router/match';
import { BackgroundImageParallax } from '_stdio/shared/components/background-image-parallax/background-image-parallax';
import classNamesBind from 'classnames/bind';
import { buildRouterPath } from '_stdio/core/router/router-utils';

const FeatureCatalogWidget: FunctionalComponent<FeatureCatalogWidgetArgs> = ({
  data,
  theme,
  backgroundColor,
  backgroundImage,
  parameters,
}) => {
  if (!data) return null;
  const cx = BuildClassNameBind(theme.Name, 'feature_catalog');
  const title = GetParameterOrDataValue('title', 'DisplayName', parameters, data);
  const titleColor = GetParameterValue('titleColor', parameters);
  const short = GetParameterValue('short', parameters);
  const backgroundImageValue = GetSingleMedia(backgroundImage, MediaFormatEnums.ordinary);
  const catalogs = map(data.FeatureCatalogs, (fcat) => {
    const cat = fcat.Catalog;
    const title = fcat.Title || cat.DisplayName;
    const backgroundColor = fcat.BackgroundColor;
    const url = buildRouterPath(fcat.Router?.Path, cat);
    const cover = first(fcat.Media);
    return {
      Title: title,
      BackgroundColor: backgroundColor,
      Url: url,
      Cover: cover,
    } as VisualizedCatalogType;
  });
  return (
    <div
      style={{ 'background-color': backgroundColor || 'inherit' }}
      class={cx('feature_catalog', !isEmpty(data) ? 'visible' : null)}
    >
      {backgroundImageValue && backgroundImageValue.url ? (
        <BackgroundImageParallax
          primaryClassName={cx('header_background_image_container')}
          imageClassName={cx('header_background_image')}
          image={backgroundImageValue.url}
          alt={backgroundImage?.Caption}
          speed={1}
          opacity={0.5}
        />
      ) : null}
      <div class={cx('container')}>
        <div class={cx('title')}>
          <span style={{ color: titleColor || 'inherit' }}>{title}</span>
        </div>
        {short ? (
          <div class={cx('short')}>
            <span>{short}</span>
          </div>
        ) : null}
        {size(catalogs) ? (
          <div class={cx('catalog_items_container')}>
            <CatalogBuilder catalogs={catalogs} theme={theme} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface CatalogBuilderArgs {
  theme: ThemeType;
  catalogs: VisualizedCatalogType[];
}

const CatalogBuilder: FunctionalComponent<CatalogBuilderArgs> = ({ theme, catalogs }) => {
  const styleVals = GetClassNameValues(theme.Name, 'feature_catalog');
  const cx = classNamesBind.bind(styleVals);
  return (
    <TemplateGrid
      classGridItem={cx('catalog_item_grid')}
      classGridItemContainer={cx('catalog_item_grid_container')}
      classNames={styleVals}
      list={map(catalogs, (catalog) => {
        return {
          template: (templateGridArgs: TemplateGridArgs) => {
            const { scrollPosition, mGrid, gridItemRef } = templateGridArgs;
            const cover = GetSingleMedia(catalog.Cover, MediaFormatEnums.ordinary);
            return (
              <div class={cx('catalog_item')}>
                <div
                  style={{ 'background-color': catalog.BackgroundColor || 'inherit' }}
                  class={cx('catalog_item_container')}
                >
                  <ImageContainer
                    className={cx('catalog_item_cover')}
                    src={cover?.url}
                    alt={catalog.Cover?.Caption}
                    gridItemRef={gridItemRef}
                    scrollPosition={scrollPosition}
                    mGrid={mGrid}
                  />
                  <div class={cx('catalog_item_title')}>
                    {catalog.Url ? (
                      <Link href={catalog.Url}>
                        <span>{threeDotsAt(catalog.Title, 20)}</span>
                      </Link>
                    ) : (
                      <span>{threeDotsAt(catalog.Title, 20)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        } as TemplateGridItem;
      })}
      dataLength={size(catalogs)}
    />
  );
};

WidgetFactory.Register('feature_catalog', 'Feature catalog', FeatureCatalogWidget);
