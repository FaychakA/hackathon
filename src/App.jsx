import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readData } from './utils/firebase';

import { loginUserThunk } from './redux/slices/users/assyncThunks';

import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    readData('users', 'pokhylko').then((res) => console.log(res));
    dispatch(loginUserThunk({
      login: 'pokhylko',
      password: 123456,
    })).then((res) => console.log(res));

    dispatch(loginUserThunk()).then((res) => console.log(res));
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
