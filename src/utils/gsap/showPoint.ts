import gsap from "gsap";

export default function showPoint( activePoint: HTMLElement | string, activePointNumber: HTMLElement | string, animationDuration: number) {
  gsap.to(activePoint, {
    duration: animationDuration,
    top: '-5%',
    left: '-5%',
    zIndex: 4,
    width: '110%',
    height: '110%',
    cursor: 'pointer',
    ease: "power1.out"
  });
  gsap.to(activePointNumber, {
    duration: animationDuration,
    width: 56,
    height: 56,
    backgroundColor: '#f5f6fa',
    ease: "power1.out"
  });
}
