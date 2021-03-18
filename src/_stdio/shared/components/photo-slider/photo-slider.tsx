import classNamesBind from 'classnames/bind';
import styles from './photo-slider.styled.scss';
import { find, findIndex, isEmpty, size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PhotoSliderModel } from './photo-slider-model';
import { useEffect, useRef, useState } from 'preact/hooks';

const cx = classNamesBind.bind(styles);

const onCloseEvent = (e: MouseEvent, onClose?: (e: MouseEvent) => void) => {
  onClose?.call(null, e);
};

interface PhotoSliderArgs {
  data: PhotoSliderModel[];
  onClose?: (e: MouseEvent) => void;
}

const PhotoSlider: FunctionalComponent<PhotoSliderArgs> = ({ data, onClose }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState(data);
  const [selectedPhoto, setSelectedPhoto] = useState({} as PhotoSliderModel);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const expectPhoto = (expectedIndex: number) => {
    setSelectedIndex(expectedIndex);
    const expectedPhoto = list[expectedIndex];
    setSelectedPhoto(expectedPhoto);
  };
  useEffect(() => {
    // find selected photo.
    if (!!size(list)) {
      let matchedSelectedPhoto = find(list, (model) => !!model.selected) as PhotoSliderModel;
      if (isEmpty(matchedSelectedPhoto)) {
        matchedSelectedPhoto = list[0];
        matchedSelectedPhoto.selected = true;
      }
      if (!isEmpty(matchedSelectedPhoto)) {
        setSelectedPhoto(matchedSelectedPhoto);
        const matchedIndex = findIndex(list, (model) => !!model.selected);
        setSelectedIndex(matchedIndex);
      }
    }
  }, []);
  return (
    <div class={cx('photo_slider', !!size(list) ? 'visible' : null)}>
      <div class={cx('overlay')}></div>
      <div class={cx('close')} onClick={(e) => onCloseEvent(e, onClose)}>
        <span>CLOSE [X]</span>
      </div>
      <div class={cx('container')}>
        <div class={cx('loading')}>
          <span>Loading...</span>
        </div>
        <div
          class={cx('prev', selectedIndex <= 0 ? 'disabled' : null)}
          onClick={() => {
            const expectedIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
            expectPhoto(expectedIndex);
          }}
        >
          <span>Prev</span>
        </div>
        <div
          class={cx('next', selectedIndex >= size(list) - 1 ? 'disabled' : null)}
          onClick={() => {
            const expectedIndex = selectedIndex < size(list) - 1 ? selectedIndex + 1 : 0;
            expectPhoto(expectedIndex);
          }}
        >
          <span>Next</span>
        </div>
        <div ref={sliderRef} class={cx('slider')}>
          <LazyLoadImage
            afterLoad={() => sliderRef?.current?.classList.add(cx('slider_visible'))}
            src={selectedPhoto.image}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoSlider;
