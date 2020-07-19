import { createStore, combineReducers } from "redux";
import {
  lessons,
  memberships,
  reservations,
  tickets,
  timetables,
  user,
} from "./reducer";
import { Membership } from "../draft/Membership";
import { Lesson } from "../draft/Lesson";
import { Reservation } from "../draft/Reservation";
import { Ticket } from "../draft/Ticket";
import { Timetable } from "../draft/Timetable";

export interface RootState {
  lessons: Lesson[];
  memberships: Membership[];
  reservations: Reservation[];
  tickets: Ticket[];
  timetables: Timetable[];
  // local
  user: {
    uid: string;
  };
}

export const store = createStore(
  combineReducers({
    lessons,
    memberships,
    reservations,
    tickets,
    timetables,
    // local
    user,
  })
);
