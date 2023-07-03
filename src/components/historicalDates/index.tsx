import React, { useState, useEffect, MouseEvent } from 'react';
import TimeIntervals from '@/components/historicalDates/timeIntervals';
import Title from '@/components/historicalDates/Title';
import ArrowControls from '@/components/historicalDates/ArrowControls';
import FractionPagination from '@/components/historicalDates/FractionPagination';
import Footer from './Footer';
import dataset from '@/assets/dataset';
import capitalizeString from '@/utils/capitalizeString';
import Slider from '@/components/historicalDates/Slider';

function HistoricalDates() {
  if (dataset.length < 2) {
    return;
  }
  const [currentPointIndex, setCurrentPointIndex] = useState<number>(
    dataset[0].index,
  );
  const [startYear, setStartYear] = useState<number>(
    dataset[0].yearsInterval.start,
  );
  const [lastYear, setLastYear] = useState<number>(
    dataset[0].yearsInterval.last,
  );
  const [arrowControlsStatus, setArrowControlsStatus] = useState<
    null | 'left' | 'right'
  >(null);
  const pointsData = dataset.map(({ id, index, label }) => ({
    id,
    index,
    label: capitalizeString(label),
  }));
  const sliderData = dataset[currentPointIndex - 1].details;
  const rotationDuration = 1;

  const updateYears = (newIndex: number) => {
    const newYearsInterval = dataset[newIndex - 1].yearsInterval;

    let castNumber = 1;

    if (currentPointIndex > newIndex || arrowControlsStatus === 'left') {
      castNumber = -1;
    }

    let startYearCounter = Math.abs(startYear - newYearsInterval.start);
    let lastYearCounter = Math.abs(lastYear - newYearsInterval.last);
    let delay = (rotationDuration * 1000) / 2;

    if (startYearCounter > lastYearCounter) {
      delay = delay / startYearCounter;
    } else {
      delay = delay / lastYearCounter;
    }

    const interval = setInterval(() => {
      if (startYearCounter > 0) {
        setStartYear((prevYear) => prevYear + castNumber);
        startYearCounter--;
      }

      if (lastYearCounter > 0) {
        setLastYear((prevYear) => prevYear + castNumber);
        lastYearCounter--;
      }

      if (startYearCounter === 0 && lastYearCounter === 0) {
        clearInterval(interval);
      }
    }, delay);
  };

  const handleNumberClick = (index: number) => {
    updateYears(index);

    setCurrentPointIndex(index);
  };

  const handleControlClick = (e: MouseEvent, castNumber: number) => {
    if (
      e.currentTarget.classList.contains(
        'arrow-controls__arrow-left_disabled',
      ) ||
      e.currentTarget.classList.contains('arrow-controls__arrow-right_disabled')
    ) {
      return;
    }

    setArrowControlsStatus(castNumber < 0 ? 'left' : 'right');
    setCurrentPointIndex((prevIndex) => prevIndex + castNumber);
  };

  return (
    <>
      <div className="historical-dates">
        <Title />
        <TimeIntervals
          currentPointIndex={currentPointIndex}
          startYear={startYear}
          lastYear={lastYear}
          pointsData={pointsData}
          rotationDuration={rotationDuration}
          numberClickHandler={handleNumberClick}
          arrowControlsStatus={arrowControlsStatus}
          arrowControlsStatusSetter={setArrowControlsStatus}
        />
        <Footer>
          <FractionPagination
            currentPointIndex={currentPointIndex}
            pointsLength={dataset.length}
          />
          <ArrowControls
            controlClickHandler={handleControlClick}
            pointsLength={dataset.length}
            arrowControlsStatus={arrowControlsStatus}
            currentPointIndex={currentPointIndex}
          />
          <Slider sliderData={sliderData} />
        </Footer>
        {/* <FractionPagination
          currentPointIndex={currentPointIndex}
          pointsLength={dataset.length}
        />
        <ArrowControls
          controlClickHandler={handleControlClick}
          pointsLength={dataset.length}
          arrowControlsStatus={arrowControlsStatus}
          currentPointIndex={currentPointIndex}
        />
        <Slider sliderData={sliderData} /> */}
      </div>
    </>
  );
}

export default HistoricalDates;
