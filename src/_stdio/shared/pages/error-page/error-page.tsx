import { FunctionalComponent, h } from 'preact';

interface ErrorPageArgs {
  type: string;
  url?: string;
}

export const ErrorPage: FunctionalComponent<ErrorPageArgs> = ({ type, url }) => (
  <section class="error">
    <h2>Error {type}</h2>
    <p>It looks like we hit a snag.</p>
    <pre>{url}</pre>
  </section>
);
