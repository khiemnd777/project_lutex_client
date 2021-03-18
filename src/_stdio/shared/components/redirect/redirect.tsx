import { FunctionalComponent } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

interface RedirectArgs {
  url?: string;
}

const Redirect: FunctionalComponent<RedirectArgs> = ({ url, ...props }) => {
  useEffect(() => {
    const resUrl = url?.replace(/redirect\//, '');
    route(`${resUrl}`, true);
  }, []);
  return null;
};

export default Redirect;
