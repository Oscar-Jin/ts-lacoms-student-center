//  ──────────────────────────────────────────────────────────── ACTION ───┐
export enum Action {
  SYNC_LESSONS = "SYNC_LESSONS",
  SYNC_MEMBERSHIPS = "SYNC_MEMBERSHIPS",
  SYNC_RESERVATIONS = "SYNC_RESERVATIONS",
  SYNC_TICKETS = "SYNC_TICKETS",
  SYNC_TIMETABLES = "SYNC_TIMETABLES",
  UPDATE_USER = "UPDATE_USER",
}

export interface ActionArgs {
  type: Action;
  payload: any;
}
// <───────────────────────────────────────────────────────────────────────┘

//  ─────────────────────────────────────────────────────────── REDUCER ───┐
// all
export const lessons = (state = [], action: ActionArgs) => {
  switch (action.type) {
    case Action.SYNC_LESSONS:
      return [...action.payload];
    default:
      return state;
  }
};

// student only
export const memberships = (state = [], action: ActionArgs) => {
  switch (action.type) {
    case Action.SYNC_MEMBERSHIPS:
      return [...action.payload];
    default:
      return state;
  }
};

// all
export const reservations = (state = [], action: ActionArgs) => {
  switch (action.type) {
    case Action.SYNC_RESERVATIONS:
      return [...action.payload];
    default:
      return state;
  }
};

// student only
export const tickets = (state = [], action: ActionArgs) => {
  switch (action.type) {
    case Action.SYNC_TICKETS:
      return [...action.payload];
    default:
      return state;
  }
};

// all
export const timetables = (state = [], action: ActionArgs) => {
  switch (action.type) {
    case Action.SYNC_TIMETABLES:
      return [...action.payload];
    default:
      return state;
  }
};

// <───────────────────────────────────────────────────────────────────────┘

//  ────────────────────────────────────────────────────────────── USER ───┐
export const user = (state = {}, action: ActionArgs) => {
  console.log(action);
  switch (action.type) {
    case Action.UPDATE_USER:
      return action.payload;
    default:
      return state;
  }
};
// <───────────────────────────────────────────────────────────────────────┘
