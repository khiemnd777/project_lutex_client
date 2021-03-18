import { h } from 'preact';
import AppRouter from '../routes/routes';
import { useState, useEffect } from 'preact/hooks';
import Loading from '../shared/components/loading/loading';
import { connect } from 'redux-zero/preact';
import { app } from './app.styled.scss';

const App = () => {
  const [localState, setLocalState] = useState({ loading: true });

  useEffect(() => {
    setLocalState({ loading: false });
  }, []);
  if (localState.loading) {
    return <Loading message="Initializing..." />;
  }
  return (
    <div class={app}>
      <AppRouter />
    </div>
  );
};

export default connect(null, [])(App);
