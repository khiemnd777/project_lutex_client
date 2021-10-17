import { each, filter, isEmpty, map, size, some } from 'lodash-es';
import marked from 'marked';
import { Fragment, FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import Button from '_stdio/shared/components/button/button';
import Loading from '_stdio/shared/components/loading/loading';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { isMobileBrowser } from '_stdio/shared/utils/common.utils';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './feeling-checkin-form-constants';
import { FeelingCheckinFormWidgetArgs, FormDialogArgs, FormPanelArgs } from './feeling-checkin-form-interfaces';
import { FetchForm, FetchNextForm } from './feeling-checkin-form-service';
import { FeelingCheckinAnswer, FeelingCheckinForm, FeelingCheckinQuestion } from './feeling-checkin-form-types';

const FeelingCheckinFormWidget: FunctionalComponent<FeelingCheckinFormWidgetArgs> = ({
  theme,
  data,
  loading,
  error,
  parameters,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const isMobile = parseBool(GetParameterValue('isMobile', parameters, DefaultParams));
  if (isMobile && !isMobileBrowser()) {
    return null;
  }
  if (!isMobile && isMobileBrowser()) {
    return null;
  }
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const width = GetParameterValue('width', parameters, DefaultParams);
  const height = GetParameterValue('height', parameters, DefaultParams);
  const style = {};
  if (width) {
    style['width'] = width;
  }
  if (height) {
    style['height'] = height;
  }
  const useHqPicture = parseBool(GetParameterValue('useHqPicture', parameters, DefaultParams));
  const cx = BuildClassNameBind(theme.Name, styleName);
  const picture = data?.Picture
    ? GetSingleMedia(data?.Picture, useHqPicture ? MediaFormatEnums.ordinary : MediaFormatEnums.thumbnail)
    : undefined;

  return (
    <Fragment>
      <div style={style} class={cx('picture_field', !isEmpty(data) ? 'visible' : null)}>
        <div class={cx('image_container')}>
          {picture ? (
            <a src={data?.Url} onClick={() => setOpenForm(true)}>
              <img src={picture.url} alt={data?.Picture?.Caption} />
            </a>
          ) : null}
        </div>
      </div>
      {openForm ? <FormDialog theme={theme} parameters={parameters} setFormLoading={setFormLoading} /> : null}
    </Fragment>
  );
};

const FormDialog: FunctionalComponent<FormDialogArgs> = ({ theme, parameters, setFormLoading }) => {
  console.log('open form');
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const startFormName = GetParameterValue('startFormName', parameters, DefaultParams);
  const [forms, setForms] = useState<FeelingCheckinForm[]>(() => []);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const startFormResult = Fetchanic(() => FetchForm(startFormName));
  setFormLoading?.call(null, startFormResult.loading);
  if (
    startFormResult.data &&
    !startFormResult?.loading &&
    !some(forms, (form) => {
      return startFormResult?.data?.id === form.id;
    })
  ) {
    const formData = startFormResult.data ? startFormResult.data : ({} as FeelingCheckinForm);
    if (!isEmpty(formData)) {
      setForms((f) => [...f, formData]);
    }
  }

  return startFormResult.data ? (
    <div class={cx('form_dialog')}>
      <FormPanel
        startFormData={startFormResult.data}
        theme={theme}
        parameters={parameters}
        setFormLoading={setFormLoading}
        forms={forms}
        setForms={setForms}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </div>
  ) : null;
};

const FormPanel: FunctionalComponent<FormPanelArgs> = ({
  startFormData,
  theme,
  parameters,
  setFormLoading,
  forms,
  setForms,
  selectedIndex,
  setSelectedIndex,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextFlag, setNextFlag] = useState<boolean>(false);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const currentForm = forms[selectedIndex]
    ? forms[selectedIndex]
    : selectedIndex > size(forms) - 1
    ? forms[size(forms) - 1]
    : forms[0];

  // Fetch the next form by answers
  if (nextFlag) {
    const answers = map(currentForm?.Questions, (question) => {
      const answers = filter(question.Answers, (ans) => ans.Selected);
      return map(answers, (answer) => {
        return { id: answer.id };
      });
    });
    const nextFormResult = Fetchanic(
      () => FetchNextForm(currentForm?.Name, answers),
      currentForm?.Name,
      JSON.stringify(answers)
    );
    setLoading(nextFormResult.loading);
    if (nextFormResult?.data && !nextFormResult?.loading) {
      const formData = nextFormResult.data ? nextFormResult.data : ({} as FeelingCheckinForm);
      if (!isEmpty(formData)) {
        let changeFlag = false;
        if (selectedIndex === size(forms) - 1) {
          if (formData.id !== forms[size(forms) - 1]?.id) {
            changeFlag = true;
            forms = [...forms, formData];
          }
        }
        if (forms[selectedIndex + 1] && formData.id !== forms[selectedIndex + 1]?.id) {
          changeFlag = true;
          forms[selectedIndex + 1] && (forms[selectedIndex + 1] = formData);
          forms = [...forms];
        }
        if (forms[selectedIndex + 1] && formData.id === forms[selectedIndex + 1]?.id) {
          changeFlag = true;
        }
        if (changeFlag) {
          setForms(forms);
          setNextFlag(false);
          ++selectedIndex;
          if (selectedIndex === size(forms) - 1) {
            selectedIndex = size(forms) - 1;
          }
          setSelectedIndex(selectedIndex);
        }
      }
    }
  }

  return (
    <div class={cx('form_panel')}>
      <div class={cx('header')}>
        {currentForm?.Header && <h1 class={cx('header_content')}>{currentForm?.Header}</h1>}
      </div>
      <div class={cx('form_question_area')}>
        <QuestionPanel data={currentForm?.Questions} theme={theme} parameters={parameters} />
      </div>
      <div class={cx('form_action_panel')}>
        <a
          class={cx('form_button', 'back', currentForm?.Start ? 'disabled' : null)}
          onClick={() => {
            console.log('back');
            --selectedIndex;
            if (selectedIndex < 0) {
              selectedIndex = 0;
            }
            setSelectedIndex(selectedIndex);
          }}
        >
          <span>Back</span>
        </a>
        {!currentForm?.Completed && (
          <a
            class={cx('form_button', 'next', currentForm?.Completed ? 'disabled' : null)}
            onClick={() => {
              console.log('next');
              setNextFlag(true);
            }}
          >
            <span>Next</span>
          </a>
        )}
      </div>
    </div>
  );
};

const QuestionPanel: FunctionalComponent<{
  data?: FeelingCheckinQuestion[];
  theme: ThemeType;
  parameters?: ParameterConsumedType[];
}> = ({ data, theme, parameters }) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return (
    <div class={cx('question_panel')}>
      {map(data, (item) => {
        switch (item.Layout) {
          case 'horizontal': {
            return item ? (
              <div class={cx('question_panel_layout', 'horizontal')}>
                <div class={cx('question_title')}>
                  <span>{item.Question}</span>
                </div>
                <AnswerPanel data={item} parameters={parameters} theme={theme} />
              </div>
            ) : null;
          }
          default:
          case 'vertical': {
            return item ? (
              <div class={cx('question_panel_layout', 'vertical')}>
                <div class={cx('question_title')}>
                  <span>{item.Question}</span>
                </div>
                <AnswerPanel data={item} parameters={parameters} theme={theme} />
              </div>
            ) : null;
          }
        }
      })}
    </div>
  );
};

function selectAnswer(checked: boolean, answer: FeelingCheckinAnswer, question: FeelingCheckinQuestion) {
  if (!question.MultipleChoice) {
    each(question.Answers, (ans) => {
      ans.Selected = false;
    });
  }
  answer.Selected = checked;
}

const AnswerPanel: FunctionalComponent<{
  theme: ThemeType;
  data: FeelingCheckinQuestion;
  parameters?: ParameterConsumedType[];
}> = ({ theme, data, parameters }) => {
  const [updateUI, setUpdateUI] = useState<boolean>(false);
  if (updateUI) {
    setUpdateUI(false);
  }
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  return size(data?.Answers) ? (
    <div class={cx('answer_area')}>
      {map(data?.Answers, (ans) => {
        switch (ans.Type) {
          case 'image': {
            return (
              <div
                class={cx('answer_image', ans.Selected ? 'selected' : null)}
                onClick={() => {
                  selectAnswer(!ans.Selected, ans, data);
                  setUpdateUI(true);
                }}
              >
                <div class={cx('answer_image_content')} dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}></div>
              </div>
            );
          }
          case 'checkbox': {
            return (
              <div class={cx('answer_checkbox')}>
                {ans.Selected ? (
                  <input
                    data-id={`${ans.id}`}
                    id={`ans_${ans.id}`}
                    checked={true}
                    type="checkbox"
                    onChange={(evt) => {
                      selectAnswer(evt.currentTarget.checked, ans, data);
                      setUpdateUI(true);
                    }}
                  />
                ) : (
                  <input
                    data-id={`${ans.id}`}
                    id={`ans_${ans.id}`}
                    checked={false}
                    type="checkbox"
                    onChange={(evt) => {
                      selectAnswer(evt.currentTarget.checked, ans, data);
                      setUpdateUI(true);
                    }}
                  />
                )}
                <label for={`ans_${ans.id}`}>
                  <div
                    class={cx('answer_checkbox_content')}
                    dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}
                  ></div>
                </label>
              </div>
            );
          }
          default:
          case 'text': {
            return (
              <div class={cx('answer_text')}>
                <div class={cx('answer_text_content')} dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}></div>
              </div>
            );
          }
        }
      })}
    </div>
  ) : null;
};

WidgetFactory.Register(
  'feeling_checkin_form',
  'Feeling checkin form',
  FeelingCheckinFormWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
