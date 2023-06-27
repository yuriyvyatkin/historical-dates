import React, { useState, useEffect, useRef } from 'react';
import MySwiper from './MySwiper';
import gsap from 'gsap';
import showPoint from './utils/gsap/showPoint';
import hidePoint from './utils/gsap/hidePoint';
import rotatePoints from "./utils/gsap/rotatePoints";
import matrixToDegrees from './utils/matrixToDegrees';
import findPointNumber from './utils/findPointNumber';

function App() {
  const timeIntervalsRef = useRef<HTMLDivElement | null>(null);
  const activePointNumberRef = useRef<HTMLElement | null>(null);
  const activePointRef = useRef<HTMLDivElement | null>(null);
  const prevPointNumberRef = useRef<HTMLElement | null>(null);
  const prevPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    showPoint({
      point: prevPointRef.current as HTMLDivElement,
      pointNumber: prevPointNumberRef.current as HTMLElement,
    });
    gsap.set(`.point${prevPointNumberRef.current?.innerText} .point-label`, {
      opacity: 1,
    });

    function handleMouseMove(e: MouseEvent) {
      const included = findPointNumber(e);

      if (included === prevPointNumberRef.current) {
        return;
      }

      if (
        included &&
        activePointNumberRef.current === null &&
        activePointRef.current === null
      ) {
        activePointNumberRef.current = included as HTMLElement;
        activePointRef.current = activePointNumberRef.current
          ?.offsetParent as HTMLDivElement;
        showPoint({
          point: activePointRef.current,
          pointNumber: activePointNumberRef.current,
        });
      }

      if (
        !included &&
        activePointNumberRef.current !== null &&
        activePointRef.current !== null
      ) {
        hidePoint({
          point: activePointRef.current,
          pointNumber: activePointNumberRef.current,
        });
        activePointRef.current = null;
        activePointNumberRef.current = null;
      }
    }

    function handleClick() {
      if (
        activePointNumberRef.current !== null &&
        activePointRef.current !== null
      ) {
        timeIntervalsRef.current?.removeEventListener(
          'mousemove',
          handleMouseMove,
        );

        const chosenPosition = matrixToDegrees(
          window.getComputedStyle(activePointRef.current).transform,
        );
        const rotationDuration = 1;

        rotatePoints({
          chosenPosition: chosenPosition,
          activePointNumber: activePointNumberRef.current,
          prevPoint: prevPointRef.current as HTMLDivElement,
          prevPointNumber: prevPointNumberRef.current as HTMLElement,
          pointsParent: timeIntervalsRef.current?.children as HTMLCollection,
          duration: rotationDuration,
        });

        prevPointNumberRef.current = activePointNumberRef.current;
        prevPointRef.current = activePointRef.current;
        activePointRef.current = null;
        activePointNumberRef.current = null;

        setTimeout(() => {
          gsap.to(
            `.point${prevPointNumberRef.current?.innerText} .point-label`,
            {
              duration: 0.3,
              opacity: 1,
              ease: 'power1.out',
            },
          );
          timeIntervalsRef.current?.addEventListener(
            'mousemove',
            handleMouseMove,
          );
        }, rotationDuration * 1000);
      }
    }

    timeIntervalsRef.current?.addEventListener('mousemove', handleMouseMove);
    timeIntervalsRef.current?.addEventListener('click', handleClick);

    return () => {
      timeIntervalsRef.current?.removeEventListener(
        'mousemove',
        handleMouseMove,
      );
      timeIntervalsRef.current?.removeEventListener('click', handleClick);
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
          <div className="time-intervals__point point1" ref={prevPointRef}>
            <span className="point-number" ref={prevPointNumberRef}>
              1
            </span>
            <span className="point-label">Литература</span>
          </div>
          <div className="time-intervals__point point2">
            <span className="point-number">2</span>
            <span className="point-label">Литература</span>
          </div>
          <div className="time-intervals__point point3">
            <span className="point-number">3</span>
            <span className="point-label">Литература</span>
          </div>
          <div className="time-intervals__point point4">
            <span className="point-number">4</span>
            <span className="point-label">Литература</span>
          </div>
          <div className="time-intervals__point point5">
            <span className="point-number">5</span>
            <span className="point-label">Литература</span>
          </div>
          <div className="time-intervals__point point6">
            <span className="point-number">6</span>
            <span className="point-label">Литература</span>
          </div>
        </div>

        {/* <MySwiper /> */}
      </div>
    </>
  );
}

export default App;
