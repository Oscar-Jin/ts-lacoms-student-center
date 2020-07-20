import { Lesson } from "../draft/Lesson";

export const extractTimeFrom = (lessons: Lesson[]) => {
  const container: any = {};
  lessons.forEach(lesson => (container[lesson.timeString] = lesson.timeString));

  return Object.keys(container);
};

export const extractLessonNamesFrom = (lessons: Lesson[]) => {
  const container: any = [];
  lessons.forEach(lesson => (container[lesson.lessonName] = lesson.lessonName));

  return Object.keys(container);
};
