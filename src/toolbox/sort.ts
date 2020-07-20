import { Lesson } from "../draft/Lesson";
import { Ticket } from "../draft/Ticket";

export const openFirstRegularsLast = (a: Lesson, b: Lesson) => {
  if (!a.regularsOnly && b.regularsOnly) {
    return -1;
  }
  if (a.regularsOnly && !b.regularsOnly) {
    return 1;
  }
  return 0;
};

export const oldestTicketFirstNewestLast = (a: Ticket, b: Ticket) => {
  if (a.iso8601 < b.iso8601) {
    return -1;
  }
  if (a.iso8601 > b.iso8601) {
    return 1;
  }
  return 0;
};

export const oldestMembershipFirstNewestLast = oldestTicketFirstNewestLast;

export const oldestReservationFirstNewestLast = oldestTicketFirstNewestLast;

export const earliestTimeFirstLateLast = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

export const alphabetAfirstZlast = earliestTimeFirstLateLast;
