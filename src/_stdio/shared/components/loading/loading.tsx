import { h, FunctionalComponent } from 'preact';
import { MathRound } from '_stdio/shared/utils/math.utils';

interface LoadingProps {
  message?: string;
  size?: number;
  fontSize?: string;
  bgColor?: string;
  fgColor?: string;
}
const Loading: FunctionalComponent<LoadingProps> = ({ message, size, fontSize, bgColor, fgColor }) => {
  const loaderSize = size || 64;
  const borderSize = MathRound(loaderSize * 0.2);
  const loadStyle = {
    width: `${loaderSize}px`,
    height: `${loaderSize}px`,
    border: `${borderSize}px solid ${bgColor || '#f3f3f3'}`,
    'border-top': `${borderSize}px solid ${fgColor || '#3498db'}`,
  };
  const style: any = {};
  fontSize && (style['font-size'] = fontSize);
  return (
    <div class="loading" style={style}>
      <div class="loader" style={loadStyle}></div>
      {message ? <span>{message}</span> : null}
    </div>
  );
};

export default Loading;
