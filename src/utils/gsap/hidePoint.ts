import gsap from "gsap";

export default function hidePoint( activePoint: HTMLElement | string, activePointNumber: HTMLElement | string, animationDuration: number) {
  gsap.set(activePoint, {
    clearProps: "cursor",
  });
  gsap.to(activePoint, {
    duration: animationDuration,
    top: '-3.3%',
    left: '-3.3%',
    width: '106.6%',
    height: '106.6%',
    clearProps: "zIndex",
    ease: "power1.in"
  });
  gsap.set(activePointNumber, {
    clearProps: "backgroundColor",
  });
  gsap.to(activePointNumber, {
    duration: animationDuration,
    width: 6,
    height: 6,
    ease: "power1.in"
  });
}
