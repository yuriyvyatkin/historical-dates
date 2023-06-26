import React, { useState, useEffect, useRef } from 'react';
import MySwiper from './MySwiper';
import gsap from "gsap";
import showPoint from './utils/gsap/showPoint';
import hidePoint from './utils/gsap/hidePoint';
import matrixToDegrees from "./utils/matrixToDegrees";
const animationDuration = 0.2;

function App() {
  const activePointNumberRef = useRef<HTMLElement | null>(null);
  const activePointRef = useRef<HTMLElement | null>(null);
  const timeIntervalsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const overlapped = document.elementsFromPoint(e.pageX, e.pageY);

      const included = overlapped.find((el) =>
        el.classList.contains('point-number'),
      );

      if (included && activePointNumberRef.current === null) {
        activePointNumberRef.current = included as HTMLElement;
        activePointRef.current = activePointNumberRef.current
          ?.offsetParent as HTMLElement;
        showPoint(
          activePointRef.current,
          activePointNumberRef.current,
          animationDuration,
        );
      }

      if (
        !included &&
        activePointNumberRef.current !== null &&
        activePointRef.current !== null
      ) {
        hidePoint(
          activePointRef.current,
          activePointNumberRef.current,
          animationDuration,
        );
        activePointRef.current = null;
        activePointNumberRef.current = null;
      }
    }

    function handleClick() {
      if (activePointNumberRef.current !== null && activePointRef.current !== null) {
        const chosenPosition = matrixToDegrees(window.getComputedStyle(activePointRef.current).transform);
        let rotation;

        if (chosenPosition < 180) {
          rotation = 30 - chosenPosition;
        } else {
          rotation = 390 - chosenPosition;
        }

        const children = timeIntervalsRef.current?.children as HTMLCollection;

        children[1].classList.remove('time-intervals__point_active', 'time-intervals__point_signed');

        for (let i = 1; i < children.length; i++) {
          const point = children[i] as HTMLElement;
          const pointNumber = point.firstElementChild as HTMLElement;
          const position = matrixToDegrees(window.getComputedStyle(point).transform);
          const newPointPosition = `rotate(${position + rotation}deg)`;
          const newPointNumberPosition = `rotate(${-(position + rotation)}deg)`;
          point.style.transform = newPointPosition;
          pointNumber.style.transform = newPointNumberPosition;
        }

        // activePointRef.current.style.transform = newPointPosition;
        // activePointNumberRef.current.style.transform = newPointNumberPosition;

        // gsap.to('.time-intervals__point', {
        //   duration: animationDuration,
        //   rotate: 60,
        //   ease: "power1.out"
        // });
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div className="App">
        <div className="time-intervals" ref={timeIntervalsRef}>
          <div className="time-intervals__interval">
            <span className="interval__start-year">2015</span>
            &nbsp;&nbsp;
            <span className="interval__final-year">2022</span>
          </div>
          <div
            className="time-intervals__point time-intervals__point_active time-intervals__point_signed point1"
            data-label="Литература"
          >
            <span className="point-number">1</span>
          </div>
          <div className="time-intervals__point point2">
            <span className="point-number">2</span>
          </div>
          <div className="time-intervals__point point3">
            <span className="point-number">3</span>
          </div>
          <div className="time-intervals__point point4">
            <span className="point-number">4</span>
          </div>
          <div className="time-intervals__point point5">
            <span className="point-number">5</span>
          </div>
          <div className="time-intervals__point point6">
            <span className="point-number">6</span>
          </div>
        </div>

        {/* <MySwiper /> */}
      </div>
    </>
  );
}

export default App;
