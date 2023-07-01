import React, { ReactNode } from 'react';

interface BottomControlsWrapperProps {
  children: ReactNode;
}

function BottomControlsWrapper({ children }: BottomControlsWrapperProps) {
  return (
    <div className="historical-dates__bottom-controls-wrapper">
      {children}
    </div>
  );
}

export default BottomControlsWrapper;
