import gsap from "gsap";

export default function hidePoint( point: HTMLDivElement | string, pointNumber: HTMLElement | string, animationDuration: number) {
  gsap.set(point, {
    zIndex: 2,
  });
  gsap.to(point, {
    duration: animationDuration,
    top: '-3.3%',
    left: '-3.3%',
    width: '106.6%',
    height: '106.6%',
    ease: "power1.in"
  });
  gsap.set(pointNumber, {
    backgroundColor: '#42567b',
  });
  gsap.to(pointNumber, {
    duration: animationDuration,
    width: 6,
    height: 6,
    ease: "power1.in"
  });
}
