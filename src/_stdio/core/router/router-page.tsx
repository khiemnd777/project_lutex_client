import { FunctionalComponent, h } from 'preact';
import TemplateProvider from '../template/template-provider';
import { IndicatedWidgetType } from '../widget/widget-types';

interface RouterPageArgs {
  name?: string;
  templateName?: string;
  widgets?: IndicatedWidgetType[];
}
const RouterPage: FunctionalComponent<RouterPageArgs> = ({ templateName, widgets }) => {
  return (
    <div>
      <TemplateProvider name={templateName} widgets={widgets} />
    </div>
  );
};

export default RouterPage;
