import React, { useState, useEffect, useRef, Ref } from 'react';
import MySwiper from './MySwiper';
import gsap from 'gsap';
import showPoint from './utils/gsap/showPoint';
import hidePoint from './utils/gsap/hidePoint';
import matrixToDegrees from './utils/matrixToDegrees';
const pointAnimationDuration = 0.2;

function App() {
  const timeIntervalsRef = useRef<HTMLDivElement | null>(null);
  const activePointNumberRef = useRef<HTMLElement | null>(null);
  const activePointRef = useRef<HTMLDivElement | null>(null);
  const prevPointNumberRef = useRef<HTMLElement | null>(null);
  const prevPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    showPoint(
      prevPointRef.current as HTMLDivElement,
      prevPointNumberRef.current as HTMLElement,
    );
    gsap.set(`.point${prevPointNumberRef.current?.innerText} .point-label`, {
      opacity: 1,
    });

    function handleMouseMove(e: MouseEvent) {
      const overlapped = document.elementsFromPoint(e.pageX, e.pageY);

      const included = overlapped.find((el) =>
        el.classList.contains('point-number'),
      );

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
        showPoint(
          activePointRef.current,
          activePointNumberRef.current,
          pointAnimationDuration,
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
          pointAnimationDuration,
        );
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

        gsap.set(activePointNumberRef.current, {
          cursor: 'auto',
        });

        const children = timeIntervalsRef.current?.children as HTMLCollection;

        if (prevPointRef.current && prevPointNumberRef.current) {
          hidePoint(
            prevPointRef.current,
            prevPointNumberRef.current,
            pointAnimationDuration,
          );
          gsap.set(
            `.point${prevPointNumberRef.current.innerText} .point-label`,
            {
              opacity: 0,
            },
          );
        }

        prevPointNumberRef.current = activePointNumberRef.current;
        prevPointRef.current = activePointRef.current;
        activePointRef.current = null;
        activePointNumberRef.current = null;

        for (let i = 1; i < children.length; i++) {
          const point = children[i] as HTMLDivElement;
          const pointNumber = point.firstElementChild as HTMLElement;
          const position = matrixToDegrees(
            window.getComputedStyle(point).transform,
          );

          const newPosition = (position + rotationDegrees) % 360;

          gsap.set(point, {
            zIndex: 2,
          });
          gsap.to(point, {
            duration: rotationDuration,
            rotate: `${newPosition}_${pointRotationDirection}`,
            ease: 'power1.out',
          });
          gsap.to(pointNumber, {
            duration: rotationDuration,
            rotate: `${-newPosition}_${numberRotationDirection}`,
            pointerEvents: 'none',
          });
        }

        gsap.set('.point-number', {
          delay: rotationDuration,
          clearProps: 'pointerEvents',
        });

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
