import React, { RefObject } from 'react';

interface PointProps {
  index: number;
  label: string;
  prevPointRef?: RefObject<HTMLDivElement>;
  prevPointNumberRef?: RefObject<HTMLSpanElement>;
  numberClickHandler: (id: number) => void;
}

function Point({
  index,
  label,
  prevPointRef,
  prevPointNumberRef,
  numberClickHandler: handleNumberClick,
}: PointProps) {
  return (
    <div className={`time-intervals__point point${index}`} ref={prevPointRef}>
      <span
        className="point-number"
        ref={prevPointNumberRef}
        onClick={() => handleNumberClick(index)}
      >
        {index}
      </span>
      <span className="point-label">{label}</span>
    </div>
  );
}

export default Point;
