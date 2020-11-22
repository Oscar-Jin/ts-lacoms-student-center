import React, { useState } from "react";
import moment from "moment";
import CardController from "../control/CardController";
import ReservationController from "../control/ReservationController";
import CancellationModal from "../modal/CancellationModal";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
};

const ReservationModule: React.FC<Props> = props => {
  const { monthSelect } = props;
  const target =
    monthSelect === "thisMonth"
      ? moment("2020-07-15")
      : moment("2020-07-15").add(1, "month");

  const [show, setShow] = useState<showModal>({
    reservationModal: false,
    cancellationModal: false,
    reservationID: "",
  });

  return (
    <div>
      <p className="m-0 mt-4 mr-2 d-inline-block">
        {target.month() + 1 + "月の予定："}
      </p>
      <span className="text-muted" hidden={monthSelect === "thisMonth"}>
        {"(予定の入力は" +
          `${moment("2020-07-15").month() + 1}` +
          "月20日から可能となります）"}
      </span>
      <CardController monthSelect={monthSelect} show={show} setShow={setShow} />
      <div className="p-3"></div>
      <ReservationController
        monthSelect={monthSelect}
        show={show}
        setShow={setShow}
      />

      <CancellationModal show={show} setShow={setShow} />
    </div>
  );
};

export interface showModal {
  reservationModal: boolean;
  cancellationModal: boolean;
  reservationID: string;
}

export default ReservationModule;
