export class Lesson {
  constructor(
    public year: number,
    public month: number,
    public date: number,
    public hour: number,
    public minute: number,

    public iso8601: string,
    public timeString: string,

    public lessonName: string,
    public instructorName: string,
    public capacity: number,
    public regularsOnly: boolean,

    // public reservedBy: any[], <- this one is deprecated

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: string,
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
}

export const sampleLesson = new Lesson(
  2020,
  7,
  18,
  13,
  0,
  "2020-07-18",
  "13:00",
  "GHI",
  "神崎",
  3,
  false,
  new Date().toISOString(),
  new Date().toISOString(),
  "lacoms",
  "lacoms",
  "lesson",
  "randomID"
);
