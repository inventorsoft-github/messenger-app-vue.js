import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCYfnMBExq0GaWYZg0w_bGaWMapOFAKUIs',
  authDomain: 'messenger-755b1.firebaseapp.com',
  projectId: 'messenger-755b1',
  storageBucket: 'messenger-755b1.appspot.com',
  messagingSenderId: '678096775857',
  appId: '1:678096775857:web:eb4fc6668573685677d090',
};
const apps = getApps();
let firebaseApp = null;
if (!apps.length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = apps[0];
}
const db = getFirestore(firebaseApp, {});
export { db };
