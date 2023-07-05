import React, { MouseEvent, useState } from 'react';
import ArrowControls from '@/components/historicalDates/ArrowControls';
import FractionPagination from '@/components/historicalDates/FractionPagination';
import Slider from '@/components/historicalDates/Slider';
import Title from '@/components/historicalDates/Title';
import TimeIntervals from '@/components/historicalDates/timeIntervals';
import capitalizeString from '@/utils/capitalizeString';
import BulletsPagination from './BulletsPagination';
import ControlsWrapper from './ControlsWrapper';

type Dataset = {
  id: string;
  index: number;
  label: string;
  yearsInterval: {
    start: number;
    last: number;
  };
  details: {
    year: number;
    description: string;
  }[];
}[];

interface HistoricalDatesProps {
  dataset: Dataset;
}

function HistoricalDates({ dataset }: HistoricalDatesProps) {
  if (dataset.length < 2 || dataset.length > 6) {
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
  const [updatingYears, setUpdatingYears] = useState<boolean>(false);
  const pointsData = dataset.map(({ id, index, label }) => ({
    id,
    index,
    label: capitalizeString(label),
  }));
  const sliderData = dataset[currentPointIndex - 1].details;
  const rotationDuration = 1;
  const isMobileScreen = window.innerWidth <= 768;

  const updateYears = (newIndex: number) => {
    setUpdatingYears(true);

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
        setUpdatingYears(false);
      }
    }, delay);
  };

  const handleBulletClick = (index: number) => {
    if (updatingYears) {
      return;
    }

    updateYears(index);

    setCurrentPointIndex(index);
  };

  const handleControlClick = (e: MouseEvent, castNumber: number) => {
    if (
      updatingYears ||
      e.currentTarget.classList.contains(
        'arrow-controls__arrow-left_disabled',
      ) ||
      e.currentTarget.classList.contains('arrow-controls__arrow-right_disabled')
    ) {
      return;
    }

    if (isMobileScreen) {
      updateYears(currentPointIndex + castNumber);
      setCurrentPointIndex((prevIndex) => prevIndex + castNumber);
    } else {
      setArrowControlsStatus(castNumber < 0 ? 'left' : 'right');
      setCurrentPointIndex((prevIndex) => prevIndex + castNumber);
    }
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
          bulletClickHandler={handleBulletClick}
          arrowControlsStatus={arrowControlsStatus}
          arrowControlsStatusSetter={setArrowControlsStatus}
        />
        <hr className="historical-dates__delimiter" />
        <ControlsWrapper>
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
        </ControlsWrapper>
        <Slider sliderData={sliderData} isMobileScreen={isMobileScreen} />
        <BulletsPagination
          currentPointIndex={currentPointIndex}
          pointsLength={dataset.length}
          bulletClickHandler={handleBulletClick}
        />
      </div>
    </>
  );
}

export default HistoricalDates;
