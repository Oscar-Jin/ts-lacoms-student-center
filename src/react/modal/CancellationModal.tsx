import React from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ReservationState, Reservation } from "../../draft/Reservation";
import { showModal } from "../module/ReservationModule";

type Props = {
  show: showModal;
  setShow: React.Dispatch<React.SetStateAction<showModal>>;
};

const CancellationModal: React.FC<Props> = props => {
  const { show, setShow } = props;

  const reservations = useSelector((state: RootState) => state.reservations);
  const reservation =
    reservations.find(resv => resv.id === show.reservationID) ||
    ({} as Reservation);

  const tickets = useSelector((state: RootState) => state.tickets);
  const ticket = tickets.find(ticket => ticket.usedOn === reservation.id);

  const handleClose = () => {
    setShow({
      reservationModal: false,
      cancellationModal: false,
      reservationID: "",
    });
  };

  const handleCancel = () => {
    const policy = checkPolicy(reservation.iso8601);

    if (policy === ReservationState.cancelled) {
      ticket?.cloudUpdateUsedOn(null);
      reservation?.cloudUpdate(ReservationState.cancelled);
    } else if (policy === ReservationState.cancelledWithPenalty) {
      reservation?.cloudUpdate(ReservationState.cancelledWithPenalty);
    }

    handleClose();
  };

  const display = generateMessage(reservation);

  if (reservation.id) {
    return (
      <Modal
        className="CancellationModal"
        show={show.cancellationModal}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>予定のキャンセル</Modal.Title>
        </Modal.Header>
        <Modal.Body>{display}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            いいえ
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            はい
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};

export default CancellationModal;

const generateMessage = (reservation: Reservation) => {
  const { iso8601, timeString, lessonName } = reservation;
  const policy = checkPolicy(iso8601);

  switch (policy) {
    case ReservationState.cancelled:
      return (
        <div>
          <h4>
            {iso8601} {timeString} {lessonName}
          </h4>
          <p>この予定をキャンセルします。本当によろしいですか？</p>
          <p className="">
            ペナルティはありません(前日の21時まで)。キャンセル後に再度予約が可能です。
          </p>
        </div>
      );
    case ReservationState.cancelledWithPenalty:
      return (
        <div>
          <h4>
            {iso8601} {timeString} {lessonName}
          </h4>
          <p>当日キャンセルをします。本当によろしいですか？</p>
          <p className="text-danger">
            このキャンセルにペナルティがあります。当日キャンセルは振替できません。（前日の21時を過ぎた場合も当日キャンセルとみなします）
          </p>
        </div>
      );
    default:
      return <div> </div>;
  }
};

const checkPolicy = (iso8601: string) => {
  if (moment(iso8601).diff(moment(), "hours") < 3) {
    return ReservationState.cancelledWithPenalty;
  } else {
    return ReservationState.cancelled;
  }
};
