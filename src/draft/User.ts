import { store } from "../redux/store";
import { Action } from "../redux/reducer";

export class User {
  constructor(public uid?: string) {}

  static load(user: User) {
    return new User(user.uid);
  }

  static update(user: User) {
    store.dispatch({
      type: Action.UPDATE_USER,
      payload: user,
    });
  }
}
