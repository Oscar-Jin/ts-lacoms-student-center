import React from "react";
import moment from "moment";
import ReservationCard from "../card/ReservationCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReservationState } from "../../draft/Reservation";
import { showModal } from "../module/ReservationModule";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
  show: showModal;
  setShow: React.Dispatch<React.SetStateAction<showModal>>;
};

const CardController: React.FC<Props> = props => {
  const { monthSelect, show, setShow } = props;
  const { uid } = useParams();

  const thisYear = moment("2020-08-31").year();
  const thisMomth = moment("2020-08-31").month() + 1;

  const nextYear = moment("2020-08-31").add(1, "month").year();
  const nextMonth = moment("2020-08-31").add(1, "month").month() + 1;

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
              show={show}
              setShow={setShow}
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
              show={show}
              setShow={setShow}
            />
          ))}
        </div>
      );
  }
};

export default CardController;
