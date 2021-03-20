import { FunctionalComponent, h } from 'preact';
import Placeholder from '_stdio/core/placeholder/placeholder';
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

export default SimpleTemplate;
