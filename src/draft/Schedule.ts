import { TimeString, LessonName, InstructorName } from "./Timetable";

export class Schedule {
  constructor(
    public hour: number,
    public minute: number,
    public timeString: TimeString,

    public lessonName: LessonName,
    public instructorName: InstructorName,
    public capacity: number,
    public regularsOnly: boolean,

    public id: string
  ) {}
}
