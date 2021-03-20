import './theme/default/font.scss';
import './theme/default/font-face.scss';
import './theme/default/style.scss';
import 'preact/devtools';
import './widgets/widget-registrar';
import { h, render } from 'preact';
import App from './_stdio/app/app';
import { Provider } from 'redux-zero/preact';
import appStore from '_stdio/store/app.store';

render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.body
);
