import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { DefaultParams } from './navigation-constants';
import { NavigationWidgetArgs } from './navigation-interfaces';
import { NavigationBurger } from './navigation.burger';
import { NavigationDesktop } from './navigation.desktop';
import { NavigationMobile } from './navigation.mobile';

const NavigationWidget: FunctionalComponent<NavigationWidgetArgs> = ({ data, theme, loading }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <NavigationBurger theme={theme} data={data} open={open} setOpen={setOpen} />
      <NavigationMobile theme={theme} data={data} open={open} loading={loading} />
      <NavigationDesktop theme={theme} data={data} loading={loading} />
    </Fragment>
  );
};

export default WidgetFactory.Register(
  'navigation',
  'Navigation',
  NavigationWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
