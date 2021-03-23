import styles from './template-two-sub-columns.styled.scss';
import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { TemplateFactory } from '_stdio/core/template/template-factory';
import { TemplateArgs } from '_stdio/core/template/template-interfaces';
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind(styles);

const TemplateTwoSubColumns: FunctionalComponent<TemplateArgs> = ({ widgets }) => {
  return (
    <div class={cx('template_two_sub_columns')}>
      <div class={cx('header')}>
        <Placeholder name={'Header'} widgets={widgets} />
      </div>
      <div class={cx('body')}>
        <div class={cx('left')}>
          <Placeholder name={'Left'} widgets={widgets} />
        </div>
        <div class={cx('right')}>
          <Placeholder name={'Right'} widgets={widgets} />
        </div>
      </div>
      <div class={cx('footer')}>
        <Placeholder name={'Footer'} widgets={widgets} />
      </div>
    </div>
  );
};

TemplateFactory.Register('two_sub_columns', TemplateTwoSubColumns);
