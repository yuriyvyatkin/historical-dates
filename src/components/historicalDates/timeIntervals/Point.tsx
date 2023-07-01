import React, { RefObject } from 'react';

interface PointProps {
  index: number;
  label: string;
  prevPointRef?: RefObject<HTMLDivElement>;
  prevPointNumberRef?: RefObject<HTMLSpanElement>;
}

function Point({ index, label, prevPointRef, prevPointNumberRef }: PointProps) {
  return (
    <div className={`time-intervals__point point${index}`} ref={prevPointRef}>
      <span className="point-number" ref={prevPointNumberRef}>
        {index}
      </span>
      <span className="point-label">{label}</span>
    </div>
  );
}

export default Point;
