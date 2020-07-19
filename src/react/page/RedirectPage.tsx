import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { User } from "../../draft/User";
import { Membership } from "../../draft/Membership";
import { Ticket } from "../../draft/Ticket";
import { Lesson } from "../../draft/Lesson";
import { Reservation } from "../../draft/Reservation";
import { Timetable } from "../../draft/Timetable";
import { Path } from "../App";

const RedirectPage = () => {
  const { uid } = useParams();
  const history = useHistory();

  Membership.findLatest(uid, "", "uid")
    .then(latest => {
      // cloud sync
      Membership.cloudSyncSelect(latest.uid);
      Ticket.cloudSyncSelect(latest.uid);
      Lesson.cloudSync();
      Reservation.cloudSync();
      Timetable.cloudSync();
      //
      User.update(new User(latest.uid));
      history.push("/student/" + latest.uid);
    })
    .catch(error => {
      User.update(new User());
      history.push(Path.login);
    });

  return <div></div>;
};

export default RedirectPage;
