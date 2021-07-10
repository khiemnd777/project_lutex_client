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
          name="mission_left_container"
          widgets={widgets}
          theme={theme}
          routerParams={routerParams}
          visitorId={visitorId}
        />
      </div>
      <div class={cx('right_container')}>
        <div class={cx('right_background_container')}>
          <Placeholder
            name="mission_right_background_container"
            widgets={widgets}
            theme={theme}
            routerParams={routerParams}
            visitorId={visitorId}
          />
        </div>
        <div class={cx('top')}>
          <div class={cx('top_container')}>
            <div class={cx('title')}>
              <Placeholder
                name="mission_title_container"
                widgets={widgets}
                theme={theme}
                routerParams={routerParams}
                visitorId={visitorId}
              />
            </div>
            <div class={cx('description')}>
              <Placeholder
                name="mission_description_container"
                widgets={widgets}
                theme={theme}
                routerParams={routerParams}
                visitorId={visitorId}
              />
            </div>
          </div>
        </div>
        <div class={cx('bottom')}>
          <div class={cx('mission_icons')}>
            <div class={cx('alt', 'alt_1')}>
              <Placeholder
                name="mission_icons_alt_1_container"
                widgets={widgets}
                theme={theme}
                routerParams={routerParams}
                visitorId={visitorId}
              />
            </div>
            <div class={cx('alt', 'alt_2')}>
              <Placeholder
                name="mission_icons_alt_2_container"
                widgets={widgets}
                theme={theme}
                routerParams={routerParams}
                visitorId={visitorId}
              />
            </div>
            <div class={cx('alt', 'alt_3')}>
              <Placeholder
                name="mission_icons_alt_3_container"
                widgets={widgets}
                theme={theme}
                routerParams={routerParams}
                visitorId={visitorId}
              />
            </div>
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
