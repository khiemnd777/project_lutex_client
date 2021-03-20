import { FunctionalComponent, h } from 'preact';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';

const Product: FunctionalComponent<WidgetArgs> = ({ name }) => {
  return (
    <div>
      <span>Product widget {name}</span>
    </div>
  );
};

export default Product;
