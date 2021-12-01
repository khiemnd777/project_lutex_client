import { each, filter, first, flatten, isEmpty, map, size, some } from 'lodash-es';
import marked from 'marked';
import { createElement, Fragment, FunctionalComponent, h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import { GraphInputFieldsByName } from 'widgets/input-fields/input-fields-services';
import { InputFieldType } from 'widgets/input-fields/input-fields-types';
import { GraphTextFields } from 'widgets/text-field/text-field-services';
import { TextFieldType } from 'widgets/text-field/text-field-types';
import Fetchanic from '_stdio/core/fetchanic/fetchanic';
import { MacroFactory } from '_stdio/core/macros/macro-factory';
import { ThemeType } from '_stdio/core/theme/theme-types';
import { BuildClassNameBind } from '_stdio/core/theme/theme-utils';
import { WidgetFactory } from '_stdio/core/widget/widget-factory';
import { WidgetInstaller } from '_stdio/core/widget/widget-installer';
import { PackDefaultParams } from '_stdio/core/widget/widget-utils';
import Button from '_stdio/shared/components/button/button';
import Input from '_stdio/shared/components/input/input';
import { ValidateInputs } from '_stdio/shared/components/input/input-factory';
import InputModel from '_stdio/shared/components/input/input-model';
import { MediaFormatEnums } from '_stdio/shared/enums/image-enums';
import { ExecutedState } from '_stdio/shared/enums/state-enums';
import { ParameterConsumedType } from '_stdio/shared/types/parameter-types';
import { isMobileBrowser } from '_stdio/shared/utils/common.utils';
import { disableBodyScrolling, enableBodyScrolling } from '_stdio/shared/utils/dom.utils';
import { GetSingleMedia } from '_stdio/shared/utils/media.utils';
import { GetParameterValue } from '_stdio/shared/utils/params.util';
import { AreNotBeingInStates } from '_stdio/shared/utils/state-utils';
import { parseBool } from '_stdio/shared/utils/string.utils';
import { DefaultParams } from './feeling-checkin-form-constants';
import {
  ContactFieldsArgs,
  FeelingCheckinFormWidgetArgs,
  FormDialogArgs,
  FormPanelArgs,
  HomeFormPanelArgs,
} from './feeling-checkin-form-interfaces';
import { FetchForm, FetchNextForm } from './feeling-checkin-form-service';
import {
  FeelingCheckinAnswer,
  FeelingCheckinForm,
  FeelingCheckinQuestion,
  FeelingContactSender,
} from './feeling-checkin-form-types';

const FeelingCheckinFormWidget: FunctionalComponent<FeelingCheckinFormWidgetArgs> = ({
  theme,
  data,
  loading: loading,
  error,
  parameters,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  // const isMobile = parseBool(GetParameterValue('isMobile', parameters, DefaultParams));
  // if (isMobile && !isMobileBrowser()) {
  //   return null;
  // }
  // if (!isMobile && isMobileBrowser()) {
  //   return null;
  // }
  // const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  // const width = GetParameterValue('width', parameters, DefaultParams);
  // const height = GetParameterValue('height', parameters, DefaultParams);
  // const style = {};
  // if (width) {
  //   style['width'] = width;
  // }
  // if (height) {
  //   style['height'] = height;
  // }
  // const useHqPicture = parseBool(GetParameterValue('useHqPicture', parameters, DefaultParams));
  // const cx = BuildClassNameBind(theme.Name, styleName);
  // const picture = data?.Picture
  //   ? GetSingleMedia(data?.Picture, useHqPicture ? MediaFormatEnums.ordinary : MediaFormatEnums.thumbnail)
  //   : undefined;

  // return (
  //   <Fragment>
  //     <div style={style} class={cx('picture_field', !isEmpty(data) ? 'visible' : null)}>
  //       <div class={cx('image_container')}>
  //         {picture ? (
  //           <a src={data?.Url} onClick={() => setOpenForm(true)}>
  //             <img src={picture.url} alt={data?.Picture?.Caption} />
  //           </a>
  //         ) : null}
  //       </div>
  //     </div>
  //     {openForm ? (
  //       <FormDialog
  //         theme={theme}
  //         parameters={parameters}
  //         forms={forms}
  //         setForms={setForms}
  //         setFormLoading={setFormLoading}
  //         setOpenForm={setOpenForm}
  //       />
  //     ) : null}
  //   </Fragment>
  // );

  const [forms, setForms] = useState<FeelingCheckinForm[]>(() => []);
  const homeFormName = GetParameterValue('homeFormName', parameters, DefaultParams);
  const homeFormResult = Fetchanic(() => FetchForm(homeFormName));
  // Reset home form for being unselected
  if (!openForm) {
    if (homeFormResult && size(homeFormResult.data?.Questions)) {
      each(homeFormResult.data?.Questions, (q) => {
        if (q && size(q?.Answers)) {
          each(q?.Answers, (a) => {
            a.Selected = false;
          });
        }
      });
    }
  }

  if (
    homeFormResult.data &&
    !homeFormResult?.loading &&
    !some(forms, (form) => {
      return homeFormResult?.data?.id === form.id;
    })
  ) {
    const formData = homeFormResult.data ? homeFormResult.data : ({} as FeelingCheckinForm);
    if (!isEmpty(formData)) {
      setForms((f) => [...f, formData]);
    }
  }

  return homeFormResult.data ? (
    <Fragment>
      <HomeFormPanel
        formData={homeFormResult.data}
        theme={theme}
        parameters={parameters}
        setFormLoading={setFormLoading}
        forms={forms}
        setForms={setForms}
        setOpenForm={setOpenForm}
      />
      {openForm ? (
        <FormDialog
          theme={theme}
          parameters={parameters}
          forms={forms}
          setForms={setForms}
          setFormLoading={setFormLoading}
          setOpenForm={setOpenForm}
        />
      ) : null}
    </Fragment>
  ) : null;
};

const FormDialog: FunctionalComponent<FormDialogArgs> = ({
  theme,
  parameters,
  forms,
  setForms,
  setFormLoading,
  setOpenForm,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const startFormName = GetParameterValue('startFormName', parameters, DefaultParams);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
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

  // Disable body scroll bar
  disableBodyScrolling();

  if (startFormResult.loading) {
    return (
      <Fragment>
        <div class={cx('loading_form')}>
          <div class={cx('logo_container')}>
            <div class={cx('logo')}></div>
          </div>
        </div>
        <div class={cx('overlay')}></div>
      </Fragment>
    );
  }

  return startFormResult.data ? (
    <Fragment>
      <div class={cx('dialog_wrapper')}>
        <div class={cx('dialog')}>
          <FormPanel
            startFormData={startFormResult.data}
            theme={theme}
            parameters={parameters}
            setFormLoading={setFormLoading}
            forms={forms}
            setForms={setForms}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setOpenForm={setOpenForm}
          />
        </div>
      </div>
      <div class={cx('dialog_close_wrapper')}>
        <div
          class={cx('dialog_close')}
          onClick={() => {
            enableBodyScrolling();
            setOpenForm && setOpenForm(false);
          }}
        >
          <div></div>
          <div></div>
        </div>
      </div>
      <div class={cx('overlay')}></div>
    </Fragment>
  ) : null;
};

const HomeFormPanel: FunctionalComponent<HomeFormPanelArgs> = ({
  formData,
  theme,
  parameters,
  forms,
  setForms,
  setOpenForm,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);

  return (
    <div class={cx('form_panel', 'home')}>
      <Fragment>
        <div class={cx('header')}>{formData?.Header && <h1 class={cx('header_content')}>{formData?.Header}</h1>}</div>
        <div class={cx('form_question_area')}>
          <QuestionPanel
            data={formData?.Questions}
            theme={theme}
            parameters={parameters}
            isHomeForm={true}
            setOpenForm={setOpenForm}
          />
        </div>
      </Fragment>
    </div>
  );
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
  setOpenForm,
}) => {
  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const thankfulMessage = GetParameterValue('thankfulMessage', parameters, DefaultParams);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextFlag, setNextFlag] = useState<boolean>(false);
  // const [openContactFields, setOpenContactFields] = useState<boolean>(false);
  const cx = BuildClassNameBind(theme.Name, styleName);
  const currentForm = forms[selectedIndex]
    ? forms[selectedIndex]
    : selectedIndex > size(forms) - 1
    ? forms[size(forms) - 1]
    : forms[1];

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
    <div class={cx('form_panel', loading ? 'loading' : null)}>
      {/* {openContactFields ? (
        <div class={cx('form_contact_fields')}>
          <ContactInputs theme={theme} parameters={parameters} forms={forms} setOpenForm={setOpenForm} />
        </div>
      ) : (
        <Fragment>
          <div class={cx('header')}>
            {currentForm?.Header && <h1 class={cx('header_content')}>{currentForm?.Header}</h1>}
          </div>
          <div class={cx('form_question_area')}>
            <QuestionPanel data={currentForm?.Questions} theme={theme} parameters={parameters} />
          </div>
          {selectedIndex === forms.length - 1 ? (
            <div class={cx('form_contact_fields')}>
              <ContactInputs theme={theme} parameters={parameters} forms={forms} setOpenForm={setOpenForm} />
            </div>
          ) : null}
        </Fragment>
      )} */}
      <Fragment>
        <div class={cx('header')}>
          {currentForm?.Header && <h1 class={cx('header_content')}>{currentForm?.Header}</h1>}
        </div>
        <div class={cx('form_question_area')}>
          <QuestionPanel data={currentForm?.Questions} theme={theme} parameters={parameters} />
        </div>
        {currentForm?.Completed && currentForm?.ShowContactForm ? (
          <div class={cx('form_contact_fields')}>
            <ContactInputs
              theme={theme}
              parameters={parameters}
              forms={forms}
              setForms={setForms}
              setOpenForm={setOpenForm}
            />
          </div>
        ) : currentForm?.Completed ? (
          <div
            class={cx('thank_you')}
            onClick={() => {
              enableBodyScrolling();
              setOpenForm && setOpenForm(false);
            }}
          >
            <span>{thankfulMessage}</span>
          </div>
        ) : null}
      </Fragment>
      <div class={cx('form_action_panel')}>
        {/* Back */}
        <a
          class={cx('form_button', 'back', currentForm?.Start || loading ? 'disabled' : null)}
          onClick={() => {
            --selectedIndex;
            if (selectedIndex < 1) {
              selectedIndex = 1;
            }
            setSelectedIndex(selectedIndex);
            // if (!openContactFields) {
            //   --selectedIndex;
            //   if (selectedIndex < 1) {
            //     selectedIndex = 1;
            //   }
            //   setSelectedIndex(selectedIndex);
            // } else {
            //   selectedIndex = forms.length - 1;
            //   setSelectedIndex(selectedIndex);
            // }
            // setOpenContactFields(false);
          }}
        >
          <div></div>
          <div></div>
        </a>
        {/* Next */}
        <a
          class={cx('form_button', 'next', currentForm?.Completed || loading ? 'disabled' : null)}
          onClick={() => {
            if (!currentForm?.Completed) {
              setNextFlag(true);
            }
            // if (!currentForm?.Completed) {
            //   setNextFlag(true);
            // } else {
            //   setOpenContactFields(true);
            // }
          }}
        >
          <div></div>
          <div></div>
        </a>
      </div>
    </div>
  );
};

const QuestionPanel: FunctionalComponent<{
  data?: FeelingCheckinQuestion[];
  theme: ThemeType;
  parameters?: ParameterConsumedType[];
  setOpenForm?: StateUpdater<boolean>;
  isHomeForm?: boolean;
}> = ({ data, theme, parameters, setOpenForm, isHomeForm }) => {
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
                <AnswerPanel
                  data={item}
                  parameters={parameters}
                  theme={theme}
                  setOpenForm={setOpenForm}
                  isHomeForm={isHomeForm}
                />
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
                <AnswerPanel
                  data={item}
                  parameters={parameters}
                  theme={theme}
                  setOpenForm={setOpenForm}
                  isHomeForm={isHomeForm}
                />
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
  setOpenForm?: StateUpdater<boolean>;
  isHomeForm?: boolean;
}> = ({ theme, data, parameters, setOpenForm, isHomeForm }) => {
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
                class={cx('answer_item', 'answer_image', ans.Selected ? 'selected' : null)}
                onClick={() => {
                  selectAnswer(!ans.Selected, ans, data);
                  if (isHomeForm) {
                    setOpenForm && setOpenForm(true);
                  }
                  setUpdateUI(true);
                }}
              >
                <div class={cx('answer_image_content')} dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}></div>
                <div class={cx('answer_image_value')}>
                  <span>{ans.Value}</span>
                </div>
              </div>
            );
          }
          case 'checkbox': {
            return (
              <div class={cx('answer_item', 'answer_checkbox')}>
                {ans.Selected ? (
                  <input
                    data-id={`${ans.id}`}
                    id={`ans_${ans.id}`}
                    checked={true}
                    type="checkbox"
                    onChange={(evt) => {
                      selectAnswer(evt.currentTarget.checked, ans, data);
                      if (isHomeForm) {
                        setOpenForm && setOpenForm(true);
                      }
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
                      if (isHomeForm) {
                        setOpenForm && setOpenForm(true);
                      }
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
          case 'checkbox2': {
            return (
              <div class={cx('answer_item', 'answer_checkbox2')}>
                <div
                  class={cx('answer_checkbox2_content', ans.Selected ? 'selected' : null)}
                  dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}
                  onClick={(evt) => {
                    selectAnswer(!ans.Selected, ans, data);
                    if (isHomeForm) {
                      setOpenForm && setOpenForm(true);
                    }
                    setUpdateUI(true);
                  }}
                ></div>
              </div>
            );
          }
          default:
          case 'text': {
            return (
              <div class={cx('answer_item', 'answer_text')}>
                <div class={cx('answer_text_content')} dangerouslySetInnerHTML={{ __html: marked(ans.Answer) }}></div>
              </div>
            );
          }
        }
      })}
    </div>
  ) : null;
};

// Contact Input Fields
const onSubmit = (data: InputModel[], setExecutedState: StateUpdater<ExecutedState>) => {
  setExecutedState(ExecutedState.validating);
  if (ValidateInputs(data)) {
    setExecutedState(ExecutedState.validated);
    setExecutedState(ExecutedState.sendRequest);
    return;
  }
  setExecutedState(ExecutedState.failedValidating);
};

const prepareAnswers = (forms: FeelingCheckinForm[]) => {
  const filteredForms = filter(forms, (f) => {
    return some(f.Questions, (q) => {
      return some(
        q.Answers,
        (a) => (a.Type === 'image' || a.Type === 'checkbox' || a.Type === 'checkbox2') && a.Selected
      );
    });
  });
  const answers = flatten(
    map(filteredForms, (f) => {
      return map(f.Questions, (q) => {
        const answers = filter(q.Answers, (a) => a.Selected);
        return {
          _v: 1,
          question: q.Question,
          answers: map(answers, (a) => {
            return {
              value: a.Value,
            };
          }),
        };
      });
    })
  );
  return answers;
};

const ContactInputs: FunctionalComponent<ContactFieldsArgs> = ({ theme, parameters, forms, setForms, setOpenForm }) => {
  const textFieldName = GetParameterValue('contactTextFieldName', parameters, DefaultParams);
  const textFieldResult = GraphTextFields(textFieldName);
  const contactTextField =
    !!textFieldResult.data &&
    !textFieldResult.loading &&
    !textFieldResult.error &&
    !!size(textFieldResult.data.textFields)
      ? first(textFieldResult.data.textFields)
      : ({} as TextFieldType);

  const styleName = GetParameterValue('styleName', parameters, DefaultParams);
  const cx = BuildClassNameBind(theme.Name, styleName);

  const sendingSuccess = () => {
    setOpenForm && setOpenForm(false);
    setForms && setForms([]);
    enableBodyScrolling();
  };

  const inputFieldsName = GetParameterValue('inputFieldsName', parameters, DefaultParams);
  const { data, loading, error } = GraphInputFieldsByName(inputFieldsName);
  const answers = prepareAnswers(forms);
  const result =
    !!data && !loading && !error && size(data?.inputFields)
      ? first(data?.inputFields)?.InputFields
      : ([] as InputFieldType[]);
  const inputFieldsStyleName = GetParameterValue('inputFieldsStyleName', parameters, DefaultParams) || 'input_fields';
  const cxInputFields = BuildClassNameBind(theme.Name, inputFieldsStyleName);
  // consume macro.
  const macroName = GetParameterValue('inputFieldsMacro', parameters, DefaultParams);
  const actionLayout = GetParameterValue('inputFieldsActionLayout', parameters, DefaultParams) || 'top-bottom';
  const submitText = GetParameterValue('inputFieldsSubmitText', parameters, DefaultParams) || 'Submit';
  const submitClassName = GetParameterValue('inputFieldsSubmitClassName', parameters, DefaultParams) || 'submit';
  const macroComponent = MacroFactory.Get(macroName);
  const [executedState, setExecutedState] = useState(() => ExecutedState.initial);
  const inputModelsParsed = map(result, (inputField) => {
    return {
      title: inputField.Title,
      name: inputField.Name,
      required: inputField.Required,
      type: inputField.Type,
      val: inputField.DefaultValue,
      visibleTitle: inputField.VisibleTitle,
    } as InputModel;
  });
  const [inputModels, setInputModels] = useState<InputModel[]>(() => inputModelsParsed);
  if (!size(inputModels) && size(result)) {
    setInputModels(inputModelsParsed);
  }
  const shownDisable = AreNotBeingInStates(
    executedState,
    ExecutedState.initial,
    ExecutedState.completed,
    ExecutedState.failedValidating
  );
  return (
    <Fragment>
      <div class={cx('contact_header')}>
        {contactTextField?.Content ? (
          <div class={cx('content')} dangerouslySetInnerHTML={{ __html: marked(contactTextField?.Content) }}></div>
        ) : null}
      </div>
      <div
        class={cxInputFields(
          'input_fields',
          actionLayout === 'top-bottom' ? 'top_bottom' : 'left_right',
          size(result) ? 'visible' : null
        )}
      >
        <div class={cxInputFields('fields', shownDisable ? 'disabled' : null)}>
          {!!size(inputModels) &&
            map(inputModels, (model) => <Input theme={theme} data={model} styleName={inputFieldsStyleName} />)}
        </div>
        <div class={cxInputFields('actions')}>
          <Button
            value={submitText}
            classed={cxInputFields(submitClassName, shownDisable ? 'disabled' : null)}
            onClick={() => onSubmit(inputModels, setExecutedState)}
          />
        </div>
      </div>
      {macroComponent
        ? createElement(macroComponent, {
            theme,
            parameters: {
              data: { inputFields: inputModels, answers } as FeelingContactSender,
              sendingSuccess,
              setExecutedState,
              executedState,
            },
          })
        : null}
    </Fragment>
  );
};

WidgetFactory.Register(
  'feeling_checkin_form',
  'Feeling checkin form',
  FeelingCheckinFormWidget,
  new WidgetInstaller(PackDefaultParams(DefaultParams))
);
