import React, { useState, useEffect, MouseEvent } from 'react';
import TimeIntervals from '@/components/historicalDates/timeIntervals';
import Title from '@/components/historicalDates/Title';
import ArrowControls from '@/components/historicalDates/ArrowControls';
import FractionPagination from '@/components/historicalDates/FractionPagination';
import BottomControlsWrapper from './BottomControlsWrapper';
import { data } from '@/data/data';
import capitalizeString from '@/utils/capitalizeString';
import Slider from '@/components/historicalDates/Slider';

function HistoricalDates() {
  if (data.length < 2) {
    return;
  }
  const [currentPointIndex, setCurrentPointIndex] = useState<number>(
    data[0].index,
  );
  const [startYear, setStartYear] = useState<number>(
    data[0].yearsInterval.start,
  );
  const [lastYear, setLastYear] = useState<number>(data[0].yearsInterval.last);
  const [arrowControlsStatus, setArrowControlsStatus] = useState<null | 'left' | 'right'>(null);
  const pointsData = data.map(({ id, index, label }) => ({
    id,
    index,
    label: capitalizeString(label),
  }));
  const rotationDuration = 1;

  const updateYears = (newIndex: number) => {
    const newYearsInterval = data[newIndex - 1].yearsInterval;

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
        <BottomControlsWrapper>
          <FractionPagination
            currentPointIndex={currentPointIndex}
            pointsLength={data.length}
          />
          <ArrowControls
            controlClickHandler={handleControlClick}
            pointsLength={data.length}
            arrowControlsStatus={arrowControlsStatus}
            currentPointIndex={currentPointIndex}
          />
        </BottomControlsWrapper>
        {/* <Slider /> */}
      </div>
    </>
  );
}

export default HistoricalDates;
