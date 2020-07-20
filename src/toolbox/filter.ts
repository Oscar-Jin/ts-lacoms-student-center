import moment from "moment";
import { Lesson } from "../draft/Lesson";
import { Reservation, ReservationState } from "../draft/Reservation";
import { openFirstRegularsLast } from "./sort";

export const filterLessonsByDate = (
  lessons: Lesson[],
  date: Date | undefined
) => {
  return lessons.filter(
    lesson => lesson.iso8601 === moment(date).format("YYYY-MM-DD")
  );
};

export const filterLessonsByTime = (lessons: Lesson[], timeString: string) => {
  return lessons.filter(lesson => lesson.timeString === timeString);
};

export const filterLessonsByDateAndTime = (
  lessons: Lesson[],
  date: Date | undefined,
  timeString: string
) => {
  const firstFilterd = filterLessonsByDate(lessons, date);
  const secondFilterd = filterLessonsByTime(firstFilterd, timeString);

  return secondFilterd;
};

export const findAvailableLessonBy = (
  lessons: Lesson[],
  date: Date | undefined,
  timeString: string,
  lessonName: string,
  reservations: Reservation[]
) => {
  const firstFiltered = filterLessonsByDateAndTime(lessons, date, timeString);
  const secondFiltered = firstFiltered.filter(
    LESSON => LESSON.lessonName === lessonName
  );

  const availableLessons = secondFiltered.filter(LESSON => {
    const { count } = reservationPackage(reservations, LESSON.id);
    // console.log(count, "count availableLessons");
    return count < LESSON.capacity;
  });

  availableLessons.sort(openFirstRegularsLast);

  // console.log("availableLessons", availableLessons);

  return availableLessons[0];
};

// ───────────────────────────────────────────────── reservationPackage ───┐
export const reservationPackage = (
  reservations: Reservation[],
  lessonID: string
) => {
  const firstFilter = reservations.filter(
    RESERVATION => RESERVATION.lessonID === lessonID
  );

  const filtered = firstFilter.filter(RESERVATION => {
    switch (RESERVATION.state) {
      case ReservationState.attended:
        return true;
      case ReservationState.reserved:
        return true;
      case ReservationState.noShow:
        return true;
      default:
        return false;
    }
  });

  return {
    filtered,
    count: filtered ? filtered.length : 0,
  };
};
// ────────────────────────────────────────────────────────────────────────┘
