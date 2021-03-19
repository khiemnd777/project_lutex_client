import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
import { TemplateFactory } from '_stdio/core/template/template-factory';
import { TemplateArgs } from '_stdio/core/template/template-interfaces';

const SimpleTemplate: FunctionalComponent<TemplateArgs> = ({ widgets }) => {
  return (
    <div>
      <div class="header">
        <Placeholder name={'Header'} widgets={widgets} />
      </div>
      <div class="body">
        <Placeholder name={'Body'} widgets={widgets} />
      </div>
      <div class="footer">
        <Placeholder name={'Footer'} widgets={widgets} />
      </div>
    </div>
  );
};

TemplateFactory.Register('simple_factory', SimpleTemplate);
