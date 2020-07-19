import last from "lodash/last";
import { Firestore } from "../firebase/firestore";

export enum MembershipsStatus {
  active = "active",
  paused = "paused",
  cancelled = "cancelled",
}

export class Membership {
  constructor(
    public lastName_hiragana: string,
    public firstName_hiragana: string,
    public lastName_kanji: string,
    public firstName_kanji: string,
    public uid: string,

    public year: number,
    public month: number,
    public iso8601: string,
    public status: MembershipsStatus,
    public isInitial: boolean,

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: "membership",
    public id: string
  ) {}

  static load(membership: Membership) {
    return new Membership(
      membership.lastName_hiragana,
      membership.firstName_hiragana,
      membership.lastName_kanji,
      membership.firstName_kanji,
      membership.uid,
      membership.year,
      membership.month,
      membership.iso8601,
      membership.status,
      membership.isInitial,
      membership.createdOn,
      membership.updatedOn,
      membership.createdBy,
      membership.updatedBy,
      membership.doctype,
      membership.id
    );
  }

  static findLatest(
    lastName: string,
    firstName: string,
    queryType: "hiragana" | "kanji" | "uid"
  ) {
    return new Promise((resolve, reject) => {
      switch (queryType) {
        case "hiragana":
          Firestore.memberships
            .where("lastName_hiragana", "==", lastName)
            .where("firstName_hiragana", "==", firstName)
            .orderBy("iso8601", "asc")
            .get()
            .then(qs => getLatest(qs, resolve, reject));
          break;
        case "kanji":
          Firestore.memberships
            .where("lastName_kanji", "==", lastName)
            .where("firstName_kanji", "==", firstName)
            .orderBy("iso8601", "asc")
            .get()
            .then(qs => getLatest(qs, resolve, reject));
          break;
        case "uid":
          Firestore.memberships
            .where("uid", "==", lastName)
            .orderBy("iso8601", "asc")
            .get()
            .then(qs => getLatest(qs, resolve, reject));
          break;
      }
    });
  }
}

//  ─────────────────────────────────────────────────────────── PRIVATE ───┐
function getLatest(
  qs: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  resolve: (value?: unknown) => void,
  reject: (reason?: any) => void
) {
  const documents: any[] = [];
  qs.forEach(doc => documents.push(doc.data()));

  const latest = last(documents);
  if (latest) {
    resolve(Membership.load(latest as Membership));
  } else {
    reject("unable to find matching memberships");
  }
}
// <───────────────────────────────────────────────────────────────────────┘
