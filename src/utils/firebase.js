import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase, ref, set, onValue,
} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCEk-bTYvQ_6gK4SGPtLWOf8yPifqzVzmo',
  authDomain: 'maya-5ecfb.firebaseapp.com',
  projectId: 'maya-5ecfb',
  storageBucket: 'maya-5ecfb.appspot.com',
  messagingSenderId: '466261072640',
  appId: '1:466261072640:web:54c53ba9f5dfe796caf1e5',
  measurementId: 'G-CYT12ZDTZ9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const readData = (field, id) => new Promise((res) => {
  const db = getDatabase();
  const starCountRef = ref(db, `${field}/${id}`);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    res(data);
  });
});

export const writeData = (field, id, payload) => {
  // eslint-disable-next-line no-param-reassign
  payload.updateAt = Date.now();
  const db = getDatabase();
  set(ref(db, `${field}/${id}`), payload);
};
