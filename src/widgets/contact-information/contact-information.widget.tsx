import { map, size } from 'lodash-es';
import isEmpty from 'lodash-es/isEmpty';
import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { ContactInformationWidgetArgs } from './contact-information-interfaces';

const ContactInformationWidget: FunctionalComponent<ContactInformationWidgetArgs> = ({ data, theme, parameters }) => {
  if (!data) return null;
  const cx = BuildClassNameBind(theme.Name, 'contact_information');
  const title = GetParameterValue('title', parameters);
  return (
    <div class={cx('contact_information', !isEmpty(data) ? 'visible' : null)}>
      <div class={cx('title')}>
        <span>{title}</span>
      </div>
      {size(data.Parameters) ? (
        <div class={cx('children_container')}>
          <ul>
            {map(data.Parameters, (p) => {
              return (
                <li>
                  <span class={cx('key')}>{p.Key}: </span>
                  {p.Link ? (
                    <Link href={p.Link}>
                      <span class={cx('value')}>{p.Value}</span>
                    </Link>
                  ) : (
                    <span class={cx('value')}>{p.Value}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

WidgetFactory.Register('contact_information', 'Contact information', ContactInformationWidget);
