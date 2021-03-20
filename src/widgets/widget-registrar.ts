import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import Product from './product/product';
import ProductConfig from './product/product-config';

WidgetFactory.Register('product', Product, 'product', 'Product');
WidgetFactory.RegisterConfig('product', ProductConfig);
