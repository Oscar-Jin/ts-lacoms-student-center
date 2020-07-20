import React from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Ticket } from "../../draft/Ticket";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
};

const ReservationController: React.FC<Props> = props => {
  const { monthSelect } = props;

  const thisMonthISO = moment().date(1).format("YYYY-MM-DD");
  const nextMonthISO = moment().add(1, "month").date(1).format("YYYY-MM-DD");

  const userTickets = useSelector((state: RootState) => state.tickets);
  const unused = userTickets.filter(T => !T.usedOn);

  switch (monthSelect) {
    case "thisMonth":
      const unusedThisMonth = unused.filter(T => T.iso8601 === thisMonthISO);
      const unusedPrior01 = unused.filter(T => T.iso8601 < thisMonthISO);
      return (
        <ReservationPanel
          monthSelect={monthSelect}
          unused={unusedThisMonth}
          unusedPrior={unusedPrior01}
        />
      );
    case "nextMonth":
      const unusedNextMonth = unused.filter(T => T.iso8601 === nextMonthISO);
      const unusedPrior02 = unused.filter(T => T.iso8601 < nextMonthISO);
      return (
        <ReservationPanel
          monthSelect={monthSelect}
          unused={unusedNextMonth}
          unusedPrior={unusedPrior02}
        />
      );
  }
};

type PanelProps = {
  monthSelect: "thisMonth" | "nextMonth";
  unused: Ticket[];
  unusedPrior: Ticket[];
};

const ReservationPanel: React.FC<PanelProps> = props => {
  const { monthSelect, unused, unusedPrior } = props;

  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-between align-items-center border"
        style={{ borderRadius: "0.5rem" }}
      >
        <h4 className="m-3 p-0">
          {monthSelect === "thisMonth"
            ? moment().month() + 1
            : moment().add(1, "month").month() + 1}
          月：残り{unused.length}コマ
        </h4>
        <div className="ml-auto ">
          <Button
            className="m-3"
            variant="success"
            // onClick={handleUseBundleTicket}
            hidden={unused.length === 0}
            disabled={monthSelect === "nextMonth" && moment().date() < 21}
          >
            予定を追加する
          </Button>
        </div>
      </div>
      <div
        className="d-flex flex-wrap justify-content-between align-items-center border mt-2"
        style={{ borderRadius: "0.5rem" }}
      >
        <h4 className="m-3 p-0">未消化：残り{unusedPrior.length}コマ</h4>
        <div className="ml-auto ">
          <Button
            className="m-3"
            variant="success"
            // onClick={handleUseUnusedTicket}
            disabled={
              unused.length > 0 ||
              (monthSelect === "nextMonth" && moment().date() < 21)
            }
            hidden={unusedPrior.length === 0}
          >
            予定を追加する
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationController;
