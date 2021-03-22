import { QueryResult } from '@apollo/client';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import WidgetAssembler from '_stdio/core/widget/widget-assembler';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs, WidgetConfigArgs } from '_stdio/core/widget/widget-interfaces';

const Product: FunctionalComponent<WidgetArgs> = ({ name }) => {
  // const [datetimeNow, setDatetimeNow] = useState<Date>({} as Date);
  // useEffect(() => {
  //   GetDatetimeServer().then((x) => setDatetimeNow(x));
  // }, []);
  // const {data, loading, error} = GraphAvailablePostItems(datetimeNow);
  // const posts = !loading && !error ? data?.postItems : null;
  // console.log(posts);
  return (
    <div>
      <span>Product widget {name}</span>
    </div>
  );
};

const ProductConfig: FunctionalComponent<WidgetConfigArgs> = ({ component }) => {
  return (
    <div>
      <WidgetAssembler component={component} args={{ name: 'abc' }} />
    </div>
  );
};

const ProductConfig1: FunctionalComponent<WidgetConfigArgs> = ({ component }) => {
  return (
    <div>
      <WidgetAssembler component={component} args={{ name: 'abc1' }} />
    </div>
  );
};

WidgetFactory.Register('product', 'Product', Product, ProductConfig);
WidgetFactory.RegisterConfig('product', 'product1', ProductConfig1);
