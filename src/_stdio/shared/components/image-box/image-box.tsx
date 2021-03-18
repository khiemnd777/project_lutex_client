import classNamesBind from 'classnames/bind';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import styles from './image-box.styled.scss';
import imagesLoaded from 'imagesloaded';

const cb = classNamesBind.bind(styles);

interface ImageBoxArgs {
  src: string;
  alt?: string;
  onClose?: (e: MouseEvent) => void;
}

const onCloseEvent = (e: MouseEvent, onClose?: (e: MouseEvent) => void) => {
  onClose?.call(null, e);
};

const onImageBoxLoadedProgress: ImagesLoaded.ImagesLoadedListener = (
  instance?: ImagesLoaded.ImagesLoaded,
  image?: ImagesLoaded.LoadingImage
) => {
  image?.img?.classList?.add(cb('img_box_visible'));
};

const ImageBox: FunctionalComponent<ImageBoxArgs> = ({ src, alt, onClose, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let imgLoaded: ImagesLoaded.ImagesLoaded;
    if (!!imgRef.current) {
      imgLoaded = imagesLoaded(`.${cb('image_box')}`);
      imgLoaded.on('progress', onImageBoxLoadedProgress);
    }
    return () => {
      imgLoaded?.off('progress', onImageBoxLoadedProgress);
    };
  }, []);
  return (
    <div class={cb('image_box')} onClick={(e) => onCloseEvent(e, onClose)}>
      <div class={cb('overlay')}></div>
      <img ref={imgRef} src={src} alt={alt} onClick={(e) => onCloseEvent(e, onClose)} />
      {props.children}
    </div>
  );
};

export default ImageBox;
