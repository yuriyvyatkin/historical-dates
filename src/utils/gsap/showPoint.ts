import gsap from "gsap";

export default function showPoint( point: HTMLDivElement | string, pointNumber: HTMLElement | string, animationDuration?: number) {
  if (animationDuration) {
    gsap.set(point, {
      zIndex: 3,
    });
    gsap.to(point, {
      duration: animationDuration,
      top: '-5%',
      left: '-5%',
      width: '110%',
      height: '110%',
      ease: "power1.out"
    });
    gsap.set(pointNumber, {
      backgroundColor: '#f5f6fa',
      cursor: 'pointer',
    });
    gsap.to(pointNumber, {
      duration: animationDuration,
      width: 56,
      height: 56,
      ease: "power1.out"
    });
  } else {
    gsap.set(point, {
      zIndex: 3,
      top: '-5%',
      left: '-5%',
      width: '110%',
      height: '110%',
    });
    gsap.set(pointNumber, {
      backgroundColor: '#f5f6fa',
      cursor: 'auto',
      width: 56,
      height: 56,
    });
  }
}
