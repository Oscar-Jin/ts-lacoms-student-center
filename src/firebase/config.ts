import * as firebase from "firebase/app";
import config from "./config.json";

//  ─────────────────────────────────────────────────────────── PROFILE ───┐
const configuration = config;
// <───────────────────────────────────────────────────────────────────────┘

//  ────────────────────────────────────────────────────────────── INIT ───┐
export const firebaseApp = firebase.initializeApp(configuration);
// <───────────────────────────────────────────────────────────────────────┘
