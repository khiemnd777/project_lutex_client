import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { DefaultParams } from './mission-container-constants';
import { MissionContainerWidgetArgs } from './mission-container-types';

const MissionContainerWidget: FunctionalComponent<MissionContainerWidgetArgs> = ({
  theme,
  parameters,
  widgets,
  routerParams,
  visitorId,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div class={cx('mission_container')}>
      <div class={cx('left_container')}>
        <Placeholder
          name="left_container"
          widgets={widgets}
          theme={theme}
          routerParams={routerParams}
          visitorId={visitorId}
        />
      </div>
      <div class={cx('right_container')}>
        <div class={cx('top')}>
          <Placeholder
            name="left_container_top_container"
            widgets={widgets}
            theme={theme}
            routerParams={routerParams}
            visitorId={visitorId}
          />
        </div>
        <div class={cx('bottom')}>
          <div class={cx('mission_icons')}>
            <Placeholder
              name="mission_icons_container"
              widgets={widgets}
              theme={theme}
              routerParams={routerParams}
              visitorId={visitorId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetFactory.Register(
  'mission_container',
  'Mission container',
  MissionContainerWidget,
  new WidgetInstaller()
);
