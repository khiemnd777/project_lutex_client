import { ErrorPage } from '../shared/pages/error-page/error-page';
import { h } from 'preact';
import Router from 'preact-router';

const AppRouter = () => {
  return (
    // <Router history={createHashHistory() as any}>
    <Router>
      {/* <HomePage path="/" />
      <BlogPage path="/blog" />
      <PressDetailPage path="/press/:slug/:params?" />
      <Redirect path="/redirect/press/:slug/:params?" /> */}
      <ErrorPage type="404" default />
    </Router>
  );
};

export default AppRouter;
