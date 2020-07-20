import { Firestore } from "../firebase/firestore";
import { store } from "../redux/store";
import { Action } from "../redux/reducer";

export enum TicketType {
  singlePurchase = "singlePurchase",
  subscriptionBundle = "subscriptionBundle",
  pastUnused = "pastUnused",
}

export class Ticket {
  constructor(
    public lastName_hiragana: string,
    public firstName_hiragana: string,
    public lastName_kanji: string,
    public firstName_kanji: string,
    public uid: string,

    public year: number,
    public month: number,
    public iso8601: string,
    public type: TicketType,

    public willExpire: boolean,
    public expirationDate: string,

    public usedOn: string, // => reservation.id

    public createdOn: string,
    public updatedOn: string,
    public createdBy: string,
    public updatedBy: string,
    public doctype: "ticket",
    public id: string
  ) {}

  static load(ticket: Ticket) {
    return new Ticket(
      ticket.lastName_hiragana,
      ticket.firstName_hiragana,
      ticket.lastName_kanji,
      ticket.firstName_kanji,
      ticket.uid,
      ticket.year,
      ticket.month,
      ticket.iso8601,
      ticket.type,
      ticket.willExpire,
      ticket.expirationDate,
      ticket.usedOn,
      ticket.createdOn,
      ticket.updatedOn,
      ticket.createdBy,
      ticket.updatedBy,
      ticket.doctype,
      ticket.id
    );
  }

  static cloudSyncSelect(uid: string) {
    Firestore.tickets
      .where("uid", "==", uid)
      .orderBy("iso8601", "asc")
      .onSnapshot(qs => {
        const tickets: Ticket[] = [];
        qs.forEach(doc => tickets.push(Ticket.load(doc.data() as Ticket)));
        store.dispatch({
          type: Action.SYNC_TICKETS,
          payload: tickets,
        });
      });
  }
}
