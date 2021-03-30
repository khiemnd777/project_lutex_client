import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { NavigationWidgetArgs } from './navigation-interfaces';
import { NavigationBurger } from './navigation.burger';
import { NavigationDesktop } from './navigation.desktop';
import { NavigationMobile } from './navigation.mobile';

const NavigationWidget: FunctionalComponent<NavigationWidgetArgs> = ({ items, theme, loading }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <NavigationBurger theme={theme} items={items} open={open} setOpen={setOpen} />
      <NavigationMobile theme={theme} items={items} open={open} loading={loading} />
      <NavigationDesktop theme={theme} items={items} loading={loading} />
    </Fragment>
  );
};

export default WidgetFactory.Register('navigation', 'Navigation', NavigationWidget);
