import './themes/default/config';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';

const TitleWidget: FunctionalComponent<WidgetArgs> = ({ theme, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'title');
  const className = GetParameterValue('className', parameters) || 'title';
  const title = GetParameterValue('title', parameters);
  const fontSize = GetParameterValue('fontSize', parameters);
  return (
    <div class={cx(className)}>
      <h1>
        <span style={{ 'font-size': fontSize ?? 'initial' }}>{title}</span>
      </h1>
    </div>
  );
};

WidgetFactory.Register('title', 'Title', TitleWidget);
