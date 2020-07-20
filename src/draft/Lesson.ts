import { Firestore } from "../firebase/firestore";
import { store } from "../redux/store";
import { Action } from "../redux/reducer";
import { LessonName, InstructorName, TimeString } from "./Timetable";

export class Lesson {
  constructor(
    public year: number,
    public month: number,
    public date: number,
    public hour: number,
    public minute: number,

    public iso8601: string,
    public timeString: TimeString,

    public lessonName: LessonName,
    public instructorName: InstructorName,
    public capacity: number,
    public regularsOnly: boolean,

    // public reservedBy: any[], <- this one is deprecated

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: "lesson",
    public id: string
  ) {}

  static load(lesson: Lesson) {
    return new Lesson(
      lesson.year,
      lesson.month,
      lesson.date,
      lesson.hour,
      lesson.minute,
      lesson.iso8601,
      lesson.timeString,
      lesson.lessonName,
      lesson.instructorName,
      lesson.capacity,
      lesson.regularsOnly,
      lesson.createdOn,
      lesson.updatedOn,
      lesson.createdBy,
      lesson.updatedBy,
      lesson.doctype,
      lesson.id
    );
  }

  static cloudSync() {
    Firestore.lessons
      .orderBy("iso8601", "asc")
      .orderBy("timeString", "asc")
      .onSnapshot(qs => {
        const lessons: Lesson[] = [];
        qs.forEach(doc => lessons.push(Lesson.load(doc.data() as Lesson)));
        store.dispatch({
          type: Action.SYNC_LESSONS,
          payload: lessons,
        });
      });
  }
}
