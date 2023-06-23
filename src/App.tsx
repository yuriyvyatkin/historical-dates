import React, { useState, useEffect } from 'react';
import MySwiper from './MySwiper';

function App() {
  return (
    <div className="App">
      <div className="time-intervals">
        <div className="time-intervals__interval">
          <span className="interval__start-year">1992</span>
          <span className="interval__final-year">1997</span>
        </div>
        <div className="time-intervals__point point1" data-label="Литература">
          <span className="point__number">1</span>
        </div>
        <div className="time-intervals__point point2">
          <span className="point__number">2</span>
        </div>
        <div className="time-intervals__point point3">
          <span className="point__number">3</span>
        </div>
        <div className="time-intervals__point point4">
          <span className="point__number">4</span>
        </div>
        <div className="time-intervals__point point5">
          <span className="point__number">5</span>
        </div>
        <div className="time-intervals__point point6">
          <span className="point__number">6</span>
        </div>
      </div>

      {/* <MySwiper /> */}
    </div>
  );
}

export default App;
