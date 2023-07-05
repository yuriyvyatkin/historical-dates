import React from 'react';
import HistoricalDates from "@/components/historicalDates";
import dataset from '@/assets/dataset';

function App() {
  return (
    <div className="App">
      <HistoricalDates dataset={dataset} />
    </div>
  );
}

export default App;
