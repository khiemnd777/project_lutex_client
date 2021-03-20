import { FunctionalComponent, h } from 'preact';
import WidgetAssembler from '_stdio/core/widget/widget-assembler';
import { WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';

const ProductConfig: FunctionalComponent<WidgetConfigArgs> = ({ component }) => {
  return (
    <div>
      <WidgetAssembler component={component} args={{ name: 'abc' }} />
    </div>
  );
};

export default ProductConfig;
