import React from "react";
import moment from "moment";
import ReservationCard from "../card/ReservationCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReservationState } from "../../draft/Reservation";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
};

const CardController: React.FC<Props> = props => {
  const { monthSelect } = props;
  const { uid } = useParams();

  const thisYear = moment().year();
  const thisMomth = moment().month() + 1;

  const nextYear = moment().add(1, "month").year();
  const nextMonth = moment().add(1, "month").month() + 1;

  const allReservations = useSelector((state: RootState) => state.reservations);
  const filtered = allReservations.filter(
    R => R.uid === uid && R.state !== ReservationState.cancelled
  );

  switch (monthSelect) {
    case "thisMonth":
      const thisMonthsReservations = filtered.filter(
        R => R.year === thisYear && R.month === thisMomth
      );
      return (
        <div>
          {thisMonthsReservations.map(reservation => (
            <ReservationCard
              reservation={reservation}
              monthSelect={monthSelect}
              key={reservation.id}
            />
          ))}
        </div>
      );
    case "nextMonth":
      const nextMonthsReservations = filtered.filter(
        R => R.year === nextYear && R.month === nextMonth
      );
      return (
        <div>
          {nextMonthsReservations.map(reservation => (
            <ReservationCard
              reservation={reservation}
              monthSelect={monthSelect}
              key={reservation.id}
            />
          ))}
        </div>
      );
  }
};

export default CardController;
