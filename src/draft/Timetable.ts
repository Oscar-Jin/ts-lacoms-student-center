import { Schedule } from "./Schedule";
import { Firestore } from "../firebase/firestore";
import { store } from "../redux/store";
import { Action } from "../redux/reducer";

//  ────────────────────────────────────────────────────────────── ENUM ───┐
export enum LessonName {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  GHI = "GHI",

  L1 = "L1",
  L2 = "L2",
  L3 = "L3",
  L4 = "L4",
  L5 = "L5",

  ONLINE = "ONLINE",
  ONLINE_E = "ONLINE_E",
  ONLINE_F = "ONLINE_F",
  ONLINE_GHI = "ONLINE_GHI",
  ONLINE_L1 = "ONLINE_L1",

  自習 = "自習",
}

export enum InstructorName {
  水野 = "水野",
  高嶋 = "高嶋",
  向井 = "向井",
  金村 = "金村",
  遠藤 = "遠藤",
  呉 = "呉",
  坂井 = "坂井",
  神崎 = "神崎",
  赤嶺 = "赤嶺",
  金丸 = "金丸",
  日永 = "日永",
  鈴木 = "鈴木",
  金ちゃん = "金ちゃん",
  未定 = "未定",
}

export enum DaysOfWeek {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}

export enum TimeString {
  s09_00 = "09:00",
  s10_30 = "10:30",
  s11_00 = "11:00",
  s13_00 = "13:00",
  s15_00 = "15:00",
  s17_00 = "17:00",
  s17_30 = "17:30",
  s19_00 = "19:00",
  s19_30 = "19:30",
}
// <───────────────────────────────────────────────────────────────────────┘

export class Timetable {
  constructor(
    public year: number,
    public month: number,
    public iso8601: string,

    public monday: Schedule[],
    public tuesday: Schedule[],
    public wednesday: Schedule[],
    public thursday: Schedule[],
    public friday: Schedule[],
    public saturday: Schedule[],
    public sunday: Schedule[],

    public excludes: object[],
    public isGenerated: boolean,

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: "timetable",
    public id: string
  ) {}

  static load(timetable: Timetable) {
    return new Timetable(
      timetable.year,
      timetable.month,
      timetable.iso8601,
      timetable.monday,
      timetable.tuesday,
      timetable.wednesday,
      timetable.thursday,
      timetable.friday,
      timetable.saturday,
      timetable.sunday,
      timetable.excludes,
      timetable.isGenerated,
      timetable.createdOn,
      timetable.updatedOn,
      timetable.createdBy,
      timetable.updatedBy,
      timetable.doctype,
      timetable.id
    );
  }

  static cloudSync() {
    Firestore.timetables
      .orderBy("iso8601", "asc")
      .get()
      .then(qs => {
        const timetables: Timetable[] = [];
        qs.forEach(doc =>
          timetables.push(Timetable.load(doc.data() as Timetable))
        );
        store.dispatch({
          type: Action.SYNC_TIMETABLES,
          payload: timetables,
        });
      });
  }
}
