import { FunctionalComponent, h } from 'preact';
import { TemplateArgs } from '_stdio/core/template/template-interfaces';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { TemplateFactory } from '_stdio/core/template/template-factory';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';

const TemplateDefault: FunctionalComponent<TemplateArgs> = ({ theme, styleName, widgets, routerParams, visitorId }) => {
  const cx = BuildClassNameBind(theme.Name, 'template_default');
  styleName || (styleName = 'template_default');
  return (
    <div class={cx(styleName)}>
      <div class={cx('body')}>
        <Placeholder name={'body'} theme={theme} widgets={widgets} routerParams={routerParams} visitorId={visitorId} />
      </div>
    </div>
  );
};

export default TemplateFactory.Register('template_default', TemplateDefault);
