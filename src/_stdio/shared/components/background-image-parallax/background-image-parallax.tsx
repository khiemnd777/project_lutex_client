import styles from './background-image-parallax.styled.scss';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { initParallaxImg, ParallaxAlignment, useImageParallax } from './script';
import classNamesBind from 'classnames/bind';

const cx = classNamesBind.bind(styles);

interface BackgroundImageParallaxArgs {
  image?: string;
  speed?: number;
  opacity?: number;
  alt?: string;
  primaryClassName?: string;
  transitionDuration?: number;
  alignment?: ParallaxAlignment;
  [x: string]: any;
}

export const BackgroundImageParallax: FunctionalComponent<BackgroundImageParallaxArgs> = ({
  image,
  speed = 0.5,
  opacity = 1,
  alt,
  primaryClassName,
  transitionDuration,
  alignment = ParallaxAlignment.center,
  ...props
}) => {
  const domRef = useRef<HTMLImageElement>();
  useImageParallax(domRef, alignment);
  const alignmentClassName =
    alignment === ParallaxAlignment.left ? 'left' : alignment === ParallaxAlignment.right ? 'right' : 'center';
  useEffect(() => {
    if (!!domRef.current) {
      domRef.current.style.opacity = `${opacity}`;
    }
  }, [opacity, image]);

  return !image ? null : (
    <div class={cx('parallax_block', primaryClassName)}>
      <img ref={domRef} class={cx('parallax_image', alignmentClassName)} data-speed={speed} src={image} alt={alt} />
      {props.children}
    </div>
  );
};
