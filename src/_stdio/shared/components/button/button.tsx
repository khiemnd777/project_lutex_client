import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';

interface ButtonArgs {
  [x: string]: any;
  path?: string;
  value?: string;
  classed?: string;
  onClick?: (e: MouseEvent) => void;
}

const Button: FunctionalComponent<ButtonArgs> = ({ path, value, classed, onClick, ...props }) => {
  return (
    <Link href={path} onClick={(props) => onClick?.call(null, props)} class={classed}>
      <span>{value}</span>
      <div></div>
      {props.children}
    </Link>
  );
};

export default Button;
