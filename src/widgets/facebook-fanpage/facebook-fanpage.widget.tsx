import { FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { FacebookFanpageWidgetArgs } from './facebook-fanpage-interfaces';

const FacebookFanpageWidget: FunctionalComponent<FacebookFanpageWidgetArgs> = ({ data, theme, parameters }) => {
  if (!data) return null;
  const cx = BuildClassNameBind(theme.Name, 'facebook_fanpage');
  const title = GetParameterValue('title', parameters);
  return (
    <div class={cx('facebook_fanpage')}>
      <div class={cx('title')}>{title}</div>
      <div class={cx('container')}>
        <div id="fb-root"></div>
        <div
          class="fb-page"
          data-href={`https://www.facebook.com/${data.PageId}`}
          data-tabs={data.Tabs}
          data-width={data.Width}
          data-height={data.Height}
          data-small-header={data.SmallHeader}
          data-adapt-container-width={data.AdaptContainerWidth}
          data-hide-cover={data.HideCover}
          data-show-facepile={data.ShowFacepile}
        ></div>
      </div>
      <script async defer crossOrigin="anonymous" src={data.JavascriptSDK} nonce="hf4DQwCO"></script>
    </div>
  );
};

WidgetFactory.Register('facebook_fanpage', 'Facebook fanpage', FacebookFanpageWidget, new WidgetInstaller());
