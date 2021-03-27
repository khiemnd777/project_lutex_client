import 'preact/devtools';
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
