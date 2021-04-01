import first from 'lodash-es/first';
import isEmpty from 'lodash-es/isEmpty';
import map from 'lodash-es/map';
import size from 'lodash-es/size';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { EnumerationType } from '_stdio/shared/types/enumeration-types';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { HomeAboutUsWidgetArgs } from './home-about-us-interfaces';

const HomeAboutUsWidget: FunctionalComponent<HomeAboutUsWidgetArgs> = ({ data, theme }) => {
  const cx = BuildClassNameBind(theme.Name, 'home_about_us');
  return (
    <div class={cx('home_about_us', !isEmpty(data) ? 'visible' : null)}>
      {!isEmpty(data) ? (
        <div class={cx('container')}>
          <div class={cx('media')}>
            <img src={GetSingleMedia(first(data?.Media))?.url} alt={first(data?.Media)?.Caption} />
          </div>
          <div class={cx('content')}>
            <div class={cx('header')}>
              <i class={cx('mark')}></i>
              <span>{data?.Header}</span>
            </div>
            <div class={cx('title')}>
              <span>{data?.Title}</span>
            </div>
            <EnumerationBuilder items={data?.Enumeration} theme={theme} />
            {data?.Link ? (
              <div class={cx('explore_detail')}>
                <Link href={data?.Link}>{data?.LinkText || 'Explore'}</Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

interface EnumerationBuilderArgs {
  items?: EnumerationType[];
  theme: ThemeType;
}

const EnumerationBuilder: FunctionalComponent<EnumerationBuilderArgs> = ({ theme, items }) => {
  if (!items || !size(items)) return null;
  const cx = BuildClassNameBind(theme.Name, 'home_about_us');
  return (
    <ul class={cx('enumeration')}>
      {map(items, (item) => {
        return (
          <li class={cx('item')}>
            <div class={cx('icon')}>
              <img src={item.MediaIcon.url} alt={item.Text} />
            </div>
            <div class={cx('enumeration_content')}>
              {item.Link ? <Link href={item.Link}>{item.Text}</Link> : <span>{item.Text}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

WidgetFactory.Register('home_about_us', 'Home about us', HomeAboutUsWidget);
