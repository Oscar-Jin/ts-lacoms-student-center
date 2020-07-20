import React from "react";
import moment from "moment";
import CardController from "../control/CardController";
import ReservationController from "../control/ReservationController";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
};

const ReservationModule: React.FC<Props> = props => {
  const { monthSelect } = props;
  const target =
    monthSelect === "thisMonth" ? moment() : moment().add(1, "month");

  return (
    <div>
      <p className="m-0 mt-4 mr-2 d-inline-block">
        {target.month() + 1 + "月の予定："}
      </p>
      <small className="text-muted" hidden={monthSelect === "thisMonth"}>
        {"(予定の入力は" +
          `${moment().month() + 1}` +
          "月20日から可能となります）"}
      </small>
      <CardController monthSelect={monthSelect} />
      <div className="p-3"></div>
      <ReservationController monthSelect={monthSelect} />
    </div>
  );
};

export default ReservationModule;
