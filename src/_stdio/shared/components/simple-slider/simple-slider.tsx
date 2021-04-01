import styles from './simple-slider.styled.scss';
import arrowStyles from '../../scss/_arrow.scss';
import classNames from 'classnames/bind';
import { size } from 'lodash-es';
import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { SimpleSliderModel } from './simple-slider-model';

const cx = classNames.bind(styles);
const cxArrow = classNames.bind(arrowStyles);

interface SliderArgs {
  list: SimpleSliderModel[];
  transitionDuration?: number;
  duration?: number;
  arrowAppearance?: string;
  [x: string]: any;
}

const getNext = (currentIndex: number, list: SimpleSliderModel[]) => {
  return list[getExpectedNextIndex(currentIndex, list)];
};
const getPrev = (currentIndex: number, list: SimpleSliderModel[]) => {
  return list[getExpectedPreviousIndex(currentIndex, list)];
};
const getAlterViewIndex = (alterViewIndex: number) => {
  return alterViewIndex === 0 ? 1 : 0;
};
const getExpectedNextIndex = (currentIndex: number, list: SimpleSliderModel[]) => {
  return currentIndex < size(list) - 1 ? currentIndex + 1 : 0;
};
const getExpectedPreviousIndex = (currentIndex: number, list: SimpleSliderModel[]) => {
  return currentIndex > 0 ? currentIndex - 1 : size(list) - 1;
};

const SimpleSlider: FunctionalComponent<SliderArgs> = ({
  list,
  duration = 6000,
  transitionDuration = 2000,
  arrowAppearance = 'dark',
}) => {
  const [alternate1, setAlternate1] = useState({} as SimpleSliderModel);
  const [alternate2, setAlternate2] = useState({} as SimpleSliderModel);
  const [alterViewIndex, setAlterViewIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 0: left, 1: right;
  const goNext = (currentIndex: number, alterViewIndex: number, list: SimpleSliderModel[]) => {
    const expectedCurrentIndex = getExpectedNextIndex(currentIndex, list);
    setCurrentIndex(expectedCurrentIndex);
    const expectedViewIndex = getAlterViewIndex(alterViewIndex);
    setAlterViewIndex(expectedViewIndex);
    setDirection(1);
  };
  const goPrev = (currentIndex: number, alterViewIndex: number, list: SimpleSliderModel[]) => {
    const expectedCurrentIndex = getExpectedPreviousIndex(currentIndex, list);
    setCurrentIndex(expectedCurrentIndex);
    const expectedViewIndex = getAlterViewIndex(alterViewIndex);
    setAlterViewIndex(expectedViewIndex);
    setDirection(0);
  };
  const switchAlter = () => {
    const matchedCurrent = list[currentIndex];
    if (alterViewIndex === 0) {
      setAlternate1(matchedCurrent);
      setTimeout(() => {
        setAlternate2(direction === 1 ? getNext(currentIndex, list) : getPrev(currentIndex, list));
      }, transitionDuration);
    } else {
      setAlternate2(matchedCurrent);
      setTimeout(() => {
        setAlternate1(direction === 1 ? getNext(currentIndex, list) : getPrev(currentIndex, list));
      }, transitionDuration);
    }
  };
  useEffect(() => {
    switchAlter();
    const interval = setTimeout(() => {
      if (direction === 1) {
        goNext(currentIndex, alterViewIndex, list);
      } else {
        goPrev(currentIndex, alterViewIndex, list);
      }
    }, duration);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, size(list)]);
  return (
    <div class={cx('simple_slider')}>
      <div class={cx('next')} onClick={() => goNext(currentIndex, alterViewIndex, list)}>
        <i class={cxArrow('arrow', 'right', arrowAppearance)} />
      </div>
      <div class={cx('prev')} onClick={() => goPrev(currentIndex, alterViewIndex, list)}>
        <i class={cxArrow('arrow', 'left', arrowAppearance)} />
      </div>
      <AlterItem
        className={cx('alternate')}
        opacity={alterViewIndex === 0 ? 1 : 0}
        transitionDuration={transitionDuration / 1000}
      >
        {alternate1?.template}
      </AlterItem>
      <AlterItem
        className={cx('alternate')}
        opacity={alterViewIndex === 1 ? 1 : 0}
        transitionDuration={transitionDuration / 1000}
      >
        {alternate2?.template}
      </AlterItem>
    </div>
  );
};

interface AlterItemArgs {
  className?: string;
  opacity?: number;
  transitionDuration?: number;
  [x: string]: any;
}

const AlterItem: FunctionalComponent<AlterItemArgs> = ({ opacity = 1, className, transitionDuration, children }) => {
  const refDom = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!!refDom?.current) {
      refDom.current.style.opacity = `${opacity}`;
      refDom.current.style.transitionDuration = `${transitionDuration}s`;
    }
  }, [opacity]);
  return (
    <div ref={refDom} class={className}>
      {children}
    </div>
  );
};

export default SimpleSlider;
