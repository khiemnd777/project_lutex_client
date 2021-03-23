import { Fragment, FunctionalComponent, h } from 'preact';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';
import { PostCatalogsSideColumnWidgetArgs } from './post-catalog-types';

const PostCatalogsSideColumnWidgetConfig: FunctionalComponent<WidgetConfigArgs<PostCatalogsSideColumnWidgetArgs>> = ({
  component,
  parameters,
}) => {
  return (
    <Fragment>
      {component?.call(null, {
        items: [],
        parameters: parameters,
      })}
    </Fragment>
  );
};

export default PostCatalogsSideColumnWidgetConfig;
