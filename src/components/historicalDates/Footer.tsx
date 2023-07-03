import React, { ReactNode } from 'react';

interface FooterProps {
  children: ReactNode;
}

function Footer({ children }: FooterProps) {
  return (
    <div className="historical-dates__footer">
      {children}
    </div>
  );
}

export default Footer;
