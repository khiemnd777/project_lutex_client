// import styles from './template-two-sub-columns.styled.scss';
import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { TemplateFactory } from '_stdio/core/template/template-factory';
import { TemplateArgs } from '_stdio/core/template/template-interfaces';
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind({});

const TemplateTwoSubColumns: FunctionalComponent<TemplateArgs> = ({ theme, widgets, routerParams }) => {
  return (
    <div class={cx('template_two_sub_columns')}>
      <div class={cx('header')}>
        <Placeholder name={'Header'} theme={theme} widgets={widgets} routerParams={routerParams} />
      </div>
      <div class={cx('body')}>
        <div class={cx('left')}>
          <Placeholder name={'Left'} theme={theme} widgets={widgets} routerParams={routerParams} />
        </div>
        <div class={cx('right')}>
          <Placeholder name={'Right'} theme={theme} widgets={widgets} routerParams={routerParams} />
        </div>
      </div>
      <div class={cx('footer')}>
        <Placeholder name={'Footer'} theme={theme} widgets={widgets} routerParams={routerParams} />
      </div>
    </div>
  );
};

TemplateFactory.Register('two_sub_columns', TemplateTwoSubColumns);
