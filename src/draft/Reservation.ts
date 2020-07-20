import short from "short-uuid";
import moment from "moment";
import { Firestore } from "../firebase/firestore";
import { store } from "../redux/store";
import { Action } from "../redux/reducer";
import { TimeString, InstructorName, LessonName } from "./Timetable";
import { Ticket } from "./Ticket";
import { Lesson } from "./Lesson";

export enum ReservationState {
  reserved = "reserved",
  attended = "attended",
  cancelled = "cancelled",
  cancelledWithPenalty = "cancelledWithPenalty",
  cancelledWithPenaltyButRefundedAnyways = "cancelledWithPenaltyButRefundedAnyways",
  noShow = "noShow",
}

export class Reservation {
  constructor(
    public lastName_hiragana: string,
    public firstName_hiragana: string,
    public lastName_kanji: string,
    public firstName_kanji: string,
    public uid: string,
    public lessonID: string, // => lesson.id

    public year: number,
    public month: number,
    public date: number,
    public hour: number,
    public minute: number,
    public iso8601: string,
    public timeString: TimeString,

    public lessonName: LessonName,
    public instructorName: InstructorName,

    public isNewStudent: boolean,
    public isFirstLesson: boolean,
    public isRegulars: boolean,

    public state: ReservationState,
    public note: string,

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: "reservation",
    public id: string
  ) {}

  static load(reservation: Reservation) {
    return new Reservation(
      reservation.lastName_hiragana,
      reservation.firstName_hiragana,
      reservation.lastName_kanji,
      reservation.firstName_kanji,
      reservation.uid,
      reservation.lessonID,
      reservation.year,
      reservation.month,
      reservation.date,
      reservation.hour,
      reservation.minute,
      reservation.iso8601,
      reservation.timeString,
      reservation.lessonName,
      reservation.instructorName,
      reservation.isNewStudent,
      reservation.isFirstLesson,
      reservation.isRegulars,
      reservation.state,
      reservation.note,
      reservation.createdOn,
      reservation.updatedOn,
      reservation.createdBy,
      reservation.updatedBy,
      reservation.doctype,
      reservation.id
    );
  }

  static cloudSync() {
    Firestore.reservations
      .orderBy("iso8601", "asc")
      .orderBy("timeString", "asc")
      .onSnapshot(qs => {
        const reservations: Reservation[] = [];
        qs.forEach(doc =>
          reservations.push(Reservation.load(doc.data() as Reservation))
        );
        store.dispatch({
          type: Action.SYNC_RESERVATIONS,
          payload: reservations,
        });
      });
  }

  static cloudCreate(
    ticket: Ticket,
    lesson: Lesson,
    note: string,
    isRegulars: boolean,
    isNewStudent: boolean,
    isFirstLesson: boolean
  ) {
    const {
      lastName_hiragana,
      firstName_hiragana,
      lastName_kanji,
      firstName_kanji,
      uid,
    } = ticket;
    const {
      lessonName,
      instructorName,
      iso8601,
      timeString,
      id: lessonID,
    } = lesson;

    const targetDate = moment(iso8601 + " " + timeString);

    const reservation = new Reservation(
      lastName_hiragana,
      firstName_hiragana,
      lastName_kanji,
      firstName_kanji,
      uid,
      lessonID,
      targetDate.year(),
      targetDate.month() + 1,
      targetDate.date(),
      targetDate.hour(),
      targetDate.minute(),
      iso8601,
      timeString,
      lessonName,
      instructorName,
      isNewStudent,
      isFirstLesson,
      isRegulars,
      ReservationState.reserved,
      note,
      new Date().toISOString(),
      new Date().toISOString(),
      "student",
      "student",
      "reservation",
      short.generate()
    );

    Firestore.reservations.doc(reservation.id).set(reservation.toObject());
    // update ticked used on as well
    ticket.cloudUpdateUsedOn(reservation.id);
  }

  public toObject() {
    return {
      lastName_hiragana: this.lastName_hiragana,
      firstName_hiragana: this.firstName_hiragana,
      lastName_kanji: this.lastName_kanji,
      firstName_kanji: this.firstName_kanji,
      uid: this.uid,
      lessonID: this.lessonID,
      year: this.year,
      month: this.month,
      date: this.date,
      hour: this.hour,
      minute: this.minute,
      iso8601: this.iso8601,
      timeString: this.timeString,
      lessonName: this.lessonName,
      instructorName: this.instructorName,
      isNewStudent: this.isNewStudent,
      isFirstLesson: this.isFirstLesson,
      isRegulars: this.isRegulars,
      state: this.state,
      note: this.note,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy,
      doctype: this.doctype,
      id: this.id,
    };
  }
}
