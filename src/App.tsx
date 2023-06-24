import React, { useState, useEffect, useRef } from 'react';
import MySwiper from './MySwiper';

function App() {
  const activePointNumberRef = useRef<HTMLElement | null>(null);
  // const activePointRef = useRef<HTMLElement | null>(null);

  window.addEventListener('mousemove', checkMousePosition);

  function checkMousePosition(e: MouseEvent): void {
    const overlapped = document.elementsFromPoint(e.pageX, e.pageY);

    const included = overlapped.find((el) => el.classList.contains('point-number'));

    if (included && activePointNumberRef.current === null) {
      activePointNumberRef.current = included as HTMLElement;
      // activePointRef.current = activePointNumberRef.current?.offsetParent as HTMLElement;

      activePointNumberRef.current.classList.add('point-number_hovered');

      // console.log(activePointNumberRef.current.innerHTML);
      // console.log(activePointRef.current);
    }

    if (!included && activePointNumberRef.current !== null) {
      activePointNumberRef.current?.classList.remove('point-number_hovered');

      activePointNumberRef.current = null;
      // activePointRef.current = null;
    }
  }

  return (
    <>
      <div className="App">
        <div
          className="time-intervals"
        >
          <div className="time-intervals__interval">
            <span className="interval__start-year">2015</span>
            &nbsp;&nbsp;
            <span className="interval__final-year">2022</span>
          </div>
          <div className="time-intervals__point point1" data-label="Литература">
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

      {window.removeEventListener("mousemove", checkMousePosition)}
    </>
  );
}

export default App;
