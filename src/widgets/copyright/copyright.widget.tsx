import { isEmpty } from 'lodash-es';
import { Fragment, FunctionalComponent, h } from 'preact';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { CopyrightWidgetArgs } from './copyright-interfaces';

const CopyrightWidget: FunctionalComponent<CopyrightWidgetArgs> = ({ data, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'copyright');
  const logo = GetSingleMedia(data?.Logo, MediaFormatEnums.ordinary);
  return (
    <div class={cx('copyright', !isEmpty(data) ? 'visible' : null)}>
      {!isEmpty(data) ? (
        <Fragment>
          <div class={cx('logo')}>
            <img src={logo.url} alt={data?.Logo?.Caption} />
          </div>
          <div class={cx('copyright_container')}>
            {data.Copyright ? (
              <div class={cx('copyright_item')}>
                <span>&copy;{data.Copyright}</span>
              </div>
            ) : null}
            {data.PoweredBy ? (
              <div class={cx('copyright_item')}>
                <span>Powered by {data.PoweredBy}</span>
              </div>
            ) : null}
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

WidgetFactory.Register('copyright', 'Copyright', CopyrightWidget);
