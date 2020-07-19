import * as firebase from "firebase/app";

//  ─────────────────────────────────────────────────────────── PROFILE ───┐
const configuration = {
  apiKey: "AIzaSyBlVpu45rAGyIgDUNhWR7P9JjyrSiGwJN0",
  authDomain: "lacoms-production-database.firebaseapp.com",
  databaseURL: "https://lacoms-production-database.firebaseio.com",
  projectId: "lacoms-production-database",
  storageBucket: "lacoms-production-database.appspot.com",
  messagingSenderId: "218924369933",
  appId: "1:218924369933:web:a01c390f3dcb8f21dced44",
  measurementId: "G-H5G1YKW02Y",
};
// <───────────────────────────────────────────────────────────────────────┘

//  ────────────────────────────────────────────────────────────── INIT ───┐
export const firebaseApp = firebase.initializeApp(configuration);
// <───────────────────────────────────────────────────────────────────────┘
