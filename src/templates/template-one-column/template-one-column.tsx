import { FunctionalComponent, h } from 'preact';
import { TemplateArgs } from '_stdio/core/template/template-interfaces';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { TemplateFactory } from '_stdio/core/template/template-factory';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';

const TemplateOneColumn: FunctionalComponent<TemplateArgs> = ({ theme, widgets, routerParams }) => {
  const cx = BuildClassNameBind(theme.Name, 'one_column');
  return (
    <div class={cx('template_one_column')}>
      <div class={cx('header')}>
        <div class={cx('header_top')}>
          <div class={cx('container')}>
            <Placeholder name={'header_top'} theme={theme} widgets={widgets} routerParams={routerParams} />
          </div>
        </div>
        <div class={cx('header_middle')}>
          <div class={cx('container')}>
            <div class={cx('header_middle_left')}>
              <Placeholder name={'header_middle_left'} theme={theme} widgets={widgets} routerParams={routerParams} />
            </div>
            <div class={cx('header_middle_right')}>
              <Placeholder name={'header_middle_right'} theme={theme} widgets={widgets} routerParams={routerParams} />
            </div>
          </div>
        </div>
        <div class={cx('header_bottom')}>
          <Placeholder name={'header_bottom'} theme={theme} widgets={widgets} routerParams={routerParams} />
        </div>
      </div>
      <div class={cx('body')}>
        <Placeholder name={'body'} theme={theme} widgets={widgets} routerParams={routerParams} />
      </div>
      <div class={cx('footer')}>
        <div class={cx('footer_above')}>
          <Placeholder name={'footer_above'} theme={theme} widgets={widgets} routerParams={routerParams} />
        </div>
        <div class={cx('footer_bottom')}>
          <Placeholder name={'footer_bottom'} theme={theme} widgets={widgets} routerParams={routerParams} />
        </div>
      </div>
    </div>
  );
};

TemplateFactory.Register('one_column', TemplateOneColumn);
