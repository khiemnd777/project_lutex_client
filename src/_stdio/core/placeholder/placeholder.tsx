import map from 'lodash-es/map';
import { Fragment, FunctionalComponent, h } from 'preact';
import { ThemeType } from '../theme/theme-types';
import { WidgetFactory } from '../widget/widget-factory';
import { IndicatedWidgetType } from '../widget/widget-types';

interface PlaceholderArgs {
  name: string;
  theme: ThemeType;
  widgets?: IndicatedWidgetType[];
  matches?: Record<string, string>;
}

const Placeholder: FunctionalComponent<PlaceholderArgs> = ({ name, theme, widgets, matches }) => {
  const consumedWidgets = WidgetFactory.GetForPlaceholder(name, widgets);
  return (
    <Fragment>
      {map(consumedWidgets, (widget) =>
        widget?.config?.call(null, {
          name: widget.name,
          theme: theme,
          configName: widget.configName,
          component: widget.component,
          parameters: widget.parameters,
          matches: matches,
        })
      )}
    </Fragment>
  );
};

export default Placeholder;
