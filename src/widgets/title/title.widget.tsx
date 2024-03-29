import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { WidgetArgs } from '_stdio/core/widget/widget-interfaces';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './title-constants';

const TitleWidget: FunctionalComponent<WidgetArgs> = ({ theme, parameters }) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams) || 'title';
  const cx = BuildClassNameBind(theme.Name, styleName);
  const className = GetParameterValue('className', parameters, DefaultParams) || 'title';
  const title = GetParameterValue('title', parameters, DefaultParams);
  return (
    <div class={cx(className)}>
      <h1>
        <span>{title}</span>
      </h1>
    </div>
  );
};

WidgetFactory.Register('title', 'Title', TitleWidget, new WidgetInstaller(PackDefaultParams(DefaultParams)));
