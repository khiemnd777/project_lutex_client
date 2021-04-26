import './themes/default/config';
import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { GetParameterValue } from '_stdio/shared/utils/params.util';

const TitleWidget: FunctionalComponent<WidgetArgs> = ({ theme, parameters }) => {
  const cx = BuildClassNameBind(theme.Name, 'title');
  const title = GetParameterValue('title', parameters);
  return (
    <div class={cx('title')}>
      <h1>
        <span>{title}</span>
      </h1>
    </div>
  );
};

WidgetFactory.Register('title', 'Title', TitleWidget);
