import "firebase/firestore";
import { firebaseApp } from "./config";

const firestore = firebaseApp.firestore();

//  ────────────────────────────────────────────────────────────── PATH ───┐
export enum CollectionPaths {
  memberships = "memberships",
  lessons = "lessons",
  tickets = "tickets",
  reservations = "reservations",
  timetables = "timetables",
}

export const Firestore = {
  memberships: firestore.collection(CollectionPaths.memberships),
  lessons: firestore.collection(CollectionPaths.lessons),
  tickets: firestore.collection(CollectionPaths.tickets),
  reservations: firestore.collection(CollectionPaths.reservations),
  timetables: firestore.collection(CollectionPaths.timetables),
};
// <───────────────────────────────────────────────────────────────────────┘

//  ──────────────────────────────────────────────────────────── SERVER ───┐
// function activateServer() {
//   Firestore.memberships.onSnapshot
// }
// <───────────────────────────────────────────────────────────────────────┘
