import React, { useEffect } from 'react';
import { readData } from './utils/firebase';

import './App.scss';

export const App = () => {
  useEffect(() => {
    readData('users', 'pokhylko').then((res) => console.log(res));
  }, []);

  return (
    <div className="App">
      hackathon
      <ul>
        <li>Maria</li>
        <li>Anatolii</li>
        <li>Yaroslav</li>
        <li>Andrii</li>
      </ul>
    </div>
  );
};
