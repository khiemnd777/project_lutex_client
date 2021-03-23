import { FunctionalComponent, h } from 'preact';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { PostCatalogsSideColumnWidgetArgs } from './post-catalog-types';
import PostCatalogsSideColumnWidgetConfig from './post-catalogs-side-column.config';

const PostCatalogsSideColumnWidget: FunctionalComponent<PostCatalogsSideColumnWidgetArgs> = ({ items, parameters }) => {
  return (
    <div>
      <div>
        {parameters ? parameters[0].name : null}
        <span>=</span>
        {parameters ? parameters[0].value : null}
      </div>
    </div>
  );
};

WidgetFactory.Register(
  'post_catalogs_side_column',
  'Post catalogs side column',
  PostCatalogsSideColumnWidget,
  PostCatalogsSideColumnWidgetConfig
);
