import styles from './slider.styled.scss';
import classNames from 'classnames/bind';
import { size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { SliderModel } from './slider-model';
import { BackgroundImageParallax } from '../components/background-image-parallax/background-image-parallax';

const cx = classNames.bind(styles);

interface SliderArgs {
  list: SliderModel[];
  transitionDuration?: number;
  duration?: number;
  parallaxSpeed?: number;
}

const Slider: FunctionalComponent<SliderArgs> = ({
  list,
  duration = 6000,
  transitionDuration = 2000,
  parallaxSpeed = 2,
}) => {
  const [alternate1, setAlternate1] = useState({} as SliderModel);
  const [alternate2, setAlternate2] = useState({} as SliderModel);
  const [alterViewIndex, setAlterViewIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getNext = () => {
    return currentIndex < size(list) - 1 ? list[currentIndex + 1] : list[0];
  };
  const switchAlter = () => {
    const matchedCurrent = list[currentIndex];
    if (alterViewIndex === 0) {
      setAlternate1(matchedCurrent);
      setTimeout(() => {
        setAlternate2(getNext());
      }, transitionDuration);
    } else {
      setAlternate2(matchedCurrent);
      setTimeout(() => {
        setAlternate1(getNext());
      }, transitionDuration);
    }
  };
  useEffect(() => {
    switchAlter();
    const interval = setTimeout(() => {
      const expectedCurrentIndex = currentIndex < size(list) - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(expectedCurrentIndex);
      setAlterViewIndex(alterViewIndex === 0 ? 1 : 0);
    }, duration);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, size(list)]);
  return (
    <div class={cx('slider')}>
      <BackgroundImageParallax
        primaryClassName={cx('alternate')}
        image={alternate1?.image}
        speed={parallaxSpeed}
        transitionDuration={transitionDuration / 1000}
        opacity={alterViewIndex === 0 ? 1 : 0}
      />
      <BackgroundImageParallax
        primaryClassName={cx('alternate')}
        image={alternate2?.image}
        speed={parallaxSpeed}
        transitionDuration={transitionDuration / 1000}
        opacity={alterViewIndex === 1 ? 1 : 0}
      />
    </div>
  );
};

export default Slider;
