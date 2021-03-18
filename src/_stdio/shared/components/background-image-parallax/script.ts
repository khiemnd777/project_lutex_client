import { PropRef, useEffect, useState } from 'preact/hooks';
import { getInnerHeight } from '_stdio/shared/utils/dom.utils';

export enum ParallaxAlignment {
  left,
  center,
  right,
}

function parallaxImg(
  img: HTMLImageElement,
  imgParent: HTMLElement,
  alignment: ParallaxAlignment = ParallaxAlignment.center
) {
  const dataSpeed = img.getAttribute('data-speed') || '0';
  const speed = parseInt(dataSpeed);
  const imgY = imgParent.offsetTop;
  const winY = window.scrollY;
  const winH = window.outerHeight;
  const parentH = getInnerHeight(imgParent);

  // The next pixel to show on screen
  const winBottom = winY + winH;
  let imgPercent = winY >= imgY + parentH ? 100 : 0;

  // If block is shown on screen
  if (winBottom > imgY && winY < imgY + parentH) {
    // Number of pixels shown after block appear
    const imgBottom = (winBottom - imgY) * speed;
    // Max number of pixels until block disappear
    const imgTop = winH + parentH;
    // Percentage between start showing until disappearing
    imgPercent = (imgBottom / imgTop) * 100 + (90 - speed * 90);
  }
  const percentX =
    alignment === ParallaxAlignment.left ? '0' : alignment === ParallaxAlignment.right ? '-100%' : '-50%';
  img.style.top = `${imgPercent}%`;
  img.style.transform = `translate(${percentX}, ${-imgPercent}%)`;
}

export function initParallaxImg(
  ref: PropRef<HTMLImageElement>,
  alignment: ParallaxAlignment = ParallaxAlignment.center
) {
  if (!!ref.current && !!ref.current.parentElement) {
    parallaxImg(ref.current, ref.current.parentElement, alignment);
  }
}

export const useImageParallax = (
  ref: PropRef<HTMLImageElement>,
  alignment: ParallaxAlignment = ParallaxAlignment.center
) => {
  const [refComp, setRefComp] = useState(ref.current);
  useEffect(() => {
    if (!refComp) {
      setRefComp(ref.current);
    }
    const listener = () => {
      initParallaxImg(ref, alignment);
    };
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  });
  if (refComp) {
    initParallaxImg(ref, alignment);
  }
};
