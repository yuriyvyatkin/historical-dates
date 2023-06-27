import gsap from 'gsap';
import hidePoint from './hidePoint';
import matrixToDegrees from '../matrixToDegrees';

export default function rotatePoints({
  chosenPosition,
  activePointNumber,
  prevPoint,
  prevPointNumber,
  pointsParent,
  duration = 1,
}: {
  chosenPosition: number;
  activePointNumber: HTMLElement;
  prevPoint: HTMLDivElement;
  prevPointNumber: HTMLElement;
  pointsParent: HTMLCollection;
  duration?: number;
}) {
  let rotationDegrees;
  let pointRotationDirection = 'short';
  let numberRotationDirection;

  if (chosenPosition < 180) {
    rotationDegrees = 30 - chosenPosition;
    numberRotationDirection = 'cw';
  } else {
    rotationDegrees = 390 - chosenPosition;
    numberRotationDirection = 'ccw';
  }

  if (chosenPosition === 210) {
    pointRotationDirection = 'cw';
  }

  gsap.set(activePointNumber, {
    cursor: 'auto',
  });

  if (prevPoint && prevPointNumber) {
    hidePoint({
      point: prevPoint,
      pointNumber: prevPointNumber,
    });
    gsap.set(`.point${prevPointNumber.innerText} .point-label`, {
      opacity: 0,
    });
  }

  for (let i = 1; i < pointsParent.length; i++) {
    const point = pointsParent[i] as HTMLDivElement;
    const pointNumber = point.firstElementChild as HTMLElement;
    const position = matrixToDegrees(window.getComputedStyle(point).transform);

    const newPosition = (position + rotationDegrees) % 360;

    gsap.set(point, {
      zIndex: 2,
    });
    gsap.to(point, {
      duration: duration,
      rotate: `${newPosition}_${pointRotationDirection}`,
      ease: 'power1.out',
    });
    gsap.to(pointNumber, {
      duration: duration,
      rotate: `${-newPosition}_${numberRotationDirection}`,
      pointerEvents: 'none',
    });
  }

  gsap.set('.point-number', {
    delay: duration,
    clearProps: 'pointerEvents',
  });
}
