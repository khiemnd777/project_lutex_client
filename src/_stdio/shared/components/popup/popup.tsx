import { h, FunctionalComponent } from 'preact';
import { popup_container, popup_btn_close } from './popup.scss';

interface PopupProps {
  icon: preact.JSX.Element;
  content: preact.JSX.Element;
  extraClass: string;
}

const Popup: FunctionalComponent<PopupProps> = (props) => {
  const { children, content, icon } = props;
  return (
    <div class={popup_container}>
      {icon}
      {children ? children : content}
      <div class={popup_btn_close}>x</div>
    </div>
  );
};

export default Popup;
