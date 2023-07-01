import React from 'react';
import TimeIntervals from "@/components/historicalDates/timeIntervals/TimeIntervals";
import Title from "@/components/historicalDates/Title";
import ArrowControls from "@/components/historicalDates/ArrowControls";
import PaginationFraction from "@/components/historicalDates/FractionPagination";
import BottomControlsWrapper from "./BottomControlsWrapper";

function HistoricalDates() {

  return (
    <>
      <div className="historical-dates">
        <Title />
        <TimeIntervals />
        <BottomControlsWrapper>
          <PaginationFraction />
          <ArrowControls />
        </BottomControlsWrapper>
      </div>
    </>
  );
}

export default HistoricalDates;
