// const createReservationWith = payloads => {
//   const { ticket, lesson, isRegulars, memberships, reservations } = payloads;
//   checkit(ticket, lesson, isRegulars, memberships, reservations);

//   const {
//     lastName_hiragana,
//     firstName_hiragana,
//     lastName_kanji,
//     firstName_kanji,
//     uid,
//     id: ticketID,
//   } = ticket;
//   const {
//     lessonName,
//     instructorName,
//     iso8601,
//     timeString,
//     id: lessonID,
//   } = lesson;

//   const { isNewStudent, isFirstLesson } = checkIsNewStudentIsFirstLessonFrom(
//     memberships.filter(MEMBERSHIP => MEMBERSHIP.uid === uid),
//     reservations.filter(RESERVATION => RESERVATION.uid === uid)
//   );
//   checkit(isNewStudent, isFirstLesson);

//   const timeAndDate = moment(iso8601 + " " + timeString);

//   return {
//     lastName_hiragana,
//     firstName_hiragana,
//     lastName_kanji,
//     firstName_kanji,
//     uid,
//     ticketID,
//     lessonID,

//     year: moment(timeAndDate).year(),
//     month: moment(timeAndDate).month() + 1,
//     date: moment(timeAndDate).date(),
//     hour: moment(timeAndDate).hour(),
//     minute: moment(timeAndDate).minute(),
//     iso8601,
//     timeString,

//     lessonName,
//     instructorName,

//     isNewStudent,
//     isFirstLesson,
//     isRegulars,

//     state: $state.reserved,
//     note: "",

//     createdOn: new Date().toISOString(),
//     updatedOn: new Date().toISOString(),
//     createdBy: "student",
//     updatedBy: "student",
//     doctype: "reservation",
//     id: short.generate(),
//   };
// };
