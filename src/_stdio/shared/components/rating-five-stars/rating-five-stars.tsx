import { Fragment, FunctionalComponent, h } from 'preact';
import classNamesBind from 'classnames/bind';
import styles from './rating-five-stars.styled.scss';
import shortid from 'shortid';

export const RatingFiveStars: FunctionalComponent<{ rate: number }> = ({ rate }) => {
  const cx = classNamesBind.bind(styles);

  const items: JSX.Element[] = [];
  const rateElmId = `rate__${shortid.generate()}`;

  for (let i = 5 - 1; i >= 0; i--) {
    const rateNum = i + 1;
    const checked = rateNum === rate;
    const id = shortid.generate();
    const inputId = `star${rateNum}_${id}`;
    items.push(
      <Fragment>
        <input type="radio" id={inputId} name={rateElmId} value={rateNum} checked={checked} />
        <label for={inputId} title="text">
          {`${rateNum} stars`}
        </label>
      </Fragment>
    );
  }

  return <div class={cx('rate')}>{items}</div>;
};
