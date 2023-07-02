import React from 'react';

interface FractionPaginationProps {
  currentPointIndex: number;
  pointsLength: number;
}

function FractionPagination({currentPointIndex, pointsLength}: FractionPaginationProps) {
  return (
    <span className="historical-dates__pagination-fraction">{`0${currentPointIndex}/0${pointsLength}`}</span>
  );
}

export default FractionPagination;
