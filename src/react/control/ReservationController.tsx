import React, { useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Ticket } from "../../draft/Ticket";
import ReservationModal from "../modal/ReservationModal";
import { showModal } from "../module/ReservationModule";

type Props = {
  monthSelect: "thisMonth" | "nextMonth";
  show: showModal;
  setShow: React.Dispatch<React.SetStateAction<showModal>>;
};

const ReservationController: React.FC<Props> = props => {
  const { monthSelect, show, setShow } = props;

  const thisMonthISO = moment("2020-08-31").date(1).format("YYYY-MM-DD");
  const nextMonthISO = moment("2020-08-31")
    .add(1, "month")
    .date(1)
    .format("YYYY-MM-DD");

  const userTickets = useSelector((state: RootState) => state.tickets);
  const unused = userTickets.filter(T => !T.usedOn);

  const [ticket, setTicket] = useState<Ticket | undefined>();

  switch (monthSelect) {
    case "thisMonth":
      const unusedThisMonth = unused.filter(T => T.iso8601 === thisMonthISO);
      const unusedPrior01 = unused.filter(T => T.iso8601 < thisMonthISO);
      return (
        <div>
          <ReservationPanel
            monthSelect={monthSelect}
            unused={unusedThisMonth}
            unusedPrior={unusedPrior01}
            setShow={setShow}
            setTicket={setTicket}
          />
          <ReservationModal
            show={show}
            setShow={setShow}
            targetMonth={thisMonthISO}
            ticket={ticket!}
          />
        </div>
      );
    case "nextMonth":
      const unusedNextMonth = unused.filter(T => T.iso8601 === nextMonthISO);
      const unusedPrior02 = unused.filter(T => T.iso8601 < nextMonthISO);
      return (
        <div>
          <ReservationPanel
            monthSelect={monthSelect}
            unused={unusedNextMonth}
            unusedPrior={unusedPrior02}
            setShow={setShow}
            setTicket={setTicket}
          />
          <ReservationModal
            show={show}
            setShow={setShow}
            targetMonth={nextMonthISO}
            ticket={ticket!}
          />
        </div>
      );
  }
};

type PanelProps = {
  monthSelect: "thisMonth" | "nextMonth";
  unused: Ticket[];
  unusedPrior: Ticket[];
  setShow: React.Dispatch<React.SetStateAction<showModal>>;
  setTicket: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
};

const ReservationPanel: React.FC<PanelProps> = props => {
  const { monthSelect, unused, unusedPrior, setShow, setTicket } = props;

  const useBundleTicket = () => {
    setTicket(unused[0]);
    setShow({
      reservationModal: true,
      cancellationModal: false,
      reservationID: "",
    });
  };

  const usePriorTicket = () => {
    setTicket(unusedPrior[0]);
    setShow({
      reservationModal: true,
      cancellationModal: false,
      reservationID: "",
    });
  };

  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-between align-items-center shadow-sm"
        style={{ borderRadius: "0.5rem" }}
      >
        <h4 className="m-3 p-0 text-muted">
          {monthSelect === "thisMonth"
            ? moment("2020-08-31").month() + 1
            : moment("2020-08-31").add(1, "month").month() + 1}
          月：残り{unused.length}コマ
        </h4>
        <div className="ml-auto ">
          <Button
            className="m-3"
            variant="primary"
            onClick={useBundleTicket}
            hidden={unused.length === 0}
            disabled={
              monthSelect === "nextMonth" && moment("2020-08-31").date() < 20
            }
          >
            予定を追加する
          </Button>
        </div>
      </div>
      <div
        className="d-flex flex-wrap justify-content-between align-items-center shadow-sm  mt-2"
        style={{ borderRadius: "0.5rem" }}
      >
        <h4 className="m-3 p-0 text-muted">
          未消化：残り{unusedPrior.length}コマ
        </h4>
        <div className="ml-auto ">
          <Button
            className="m-3"
            variant="primary"
            onClick={usePriorTicket}
            disabled={
              unused.length > 0 ||
              (monthSelect === "nextMonth" && moment("2020-08-31").date() < 21)
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
