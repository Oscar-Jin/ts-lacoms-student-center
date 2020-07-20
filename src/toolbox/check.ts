import { Membership } from "../draft/Membership";
import { Reservation, ReservationState } from "../draft/Reservation";

export const isNewStudentOrIsFirstLesson = (
  memberships: Membership[],
  studentReservations: Reservation[]
) => {
  // student enrolled within 30 days will be regarded as new student
  const lastest = memberships[memberships.length - 1] || {};
  const previous = memberships[memberships.length - 2] || {};

  let isNewStudent = false;

  if (lastest.isInitial || previous.isInitial) {
    const validReservations = studentReservations.filter(RESERVATION => {
      const { state } = RESERVATION;

      if (
        state === ReservationState.attended ||
        state === ReservationState.reserved
      ) {
        return true;
      } else {
        return false;
      }
    });

    isNewStudent = validReservations.length < 4 ? true : false;
  }

  let isFirstLesson = false;

  const firstLesson = studentReservations.find(RESERVATION => {
    const { state, isFirstLesson } = RESERVATION;

    if (isFirstLesson) {
      if (
        state === ReservationState.attended ||
        state === ReservationState.reserved
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  if (isNewStudent && !firstLesson) {
    isFirstLesson = true;
  } else {
    isFirstLesson = false;
  }

  // console.log("isNewStudent", isNewStudent);
  // console.log("isFirstLesson", isFirstLesson);

  return { isNewStudent, isFirstLesson };
};
