import React from "react";
import moment from "moment";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Calendar from "../component/Calendar";
import { Ticket } from "../../draft/Ticket";
import { RootState } from "../../redux/store";
import { Reservation, ReservationState } from "../../draft/Reservation";
import { isNewStudentOrIsFirstLesson } from "../../toolbox/check";
import { Lesson } from "../../draft/Lesson";
import {
  findAvailableLessonBy,
  reservationPackage,
  filterLessonsByDate,
  filterLessonsByDateAndTime,
} from "../../toolbox/filter";
import { extractTimeFrom, extractLessonNamesFrom } from "../../toolbox/extract";
import {
  earliestTimeFirstLateLast,
  alphabetAfirstZlast,
} from "../../toolbox/sort";

export const style = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  thisMonth: string;
  ticket: Ticket;
};

const ReservationModal: React.FC<Props> = props => {
  const { uid } = useParams();
  const { showModal, setShowModal, thisMonth, ticket } = props;

  const memberships = useSelector((state: RootState) => state.memberships);
  const reservations = useSelector((state: RootState) => state.reservations);
  const myReservations = reservations.filter(resv => resv.uid === uid) || [];

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeString, setTimeString] = useState("");
  const [lessonName, setLessonName] = useState("");

  const [isSeatAvailable, setIsSeatAvailable] = useState(false);
  const [isRegulars, setIsRegulars] = useState(false);

  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    setTimeString("");
    setLessonName("");
    setIsRegulars(false);
    setLesson(null);
  }, [date]);

  useEffect(() => {
    setLessonName("");
    setIsRegulars(false);
    setLesson(null);
  }, [timeString]);

  const handleClose = () => {
    setDate(undefined);
    setTimeString("");
    setLessonName("");
    setIsRegulars(false);
    setIsSeatAvailable(false);
    setLesson(null);

    setShowModal(false);
  };

  const handleAdd = () => {
    const { isNewStudent, isFirstLesson } = isNewStudentOrIsFirstLesson(
      memberships,
      myReservations
    );
    Reservation.cloudCreate(
      ticket,
      lesson!,
      "",
      isRegulars,
      isNewStudent,
      isFirstLesson
    );

    handleClose();
  };

  return (
    <Modal
      className="ReservationModal"
      show={showModal}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>予定の追加</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Calendar
              date={date}
              setDate={setDate}
              initialDate={moment(thisMonth).toDate()}
              flexCenter={true}
            />
          </Form.Group>
          <Form.Group>
            <FormTimeSelect
              date={date}
              timeString={timeString}
              setTimeString={setTimeString}
            />
          </Form.Group>
          <Form.Group>
            <FormLessonSelect
              date={date}
              timeString={timeString}
              lessonName={lessonName}
              setLessonName={setLessonName}
            />
          </Form.Group>
          <Form.Group>
            <FormSeatsAvailability
              date={date}
              timeString={timeString}
              lessonName={lessonName}
              isRegulars={isRegulars}
              setLesson={setLesson}
              setIsSeatAvailable={setIsSeatAvailable}
            />
          </Form.Group>
          <Form.Group>
            <FormCheckIsRegular
              date={date}
              timeString={timeString}
              lessonName={lessonName}
              isRegulars={isRegulars}
              setIsRegulars={setIsRegulars}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          キャンセル
        </Button>
        <Button
          variant="success"
          onClick={handleAdd}
          disabled={!date || !timeString || !lessonName || !isSeatAvailable}
        >
          追加する
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;

// ─────────────────────────────────────────────────────── options ───┐

type IsRegularProps = {
  date: Date | undefined;
  timeString: string;
  lessonName: string;
  isRegulars: boolean;
  setIsRegulars: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormCheckIsRegular: React.FC<IsRegularProps> = props => {
  const { date, timeString, lessonName, isRegulars, setIsRegulars } = props;

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRegulars(event.target.checked);
    console.log(event.target.checked);
    console.log(typeof event.target.checked);
  };

  return (
    <div hidden={!date || !timeString || !lessonName}>
      <div className="FormCheckIsRegular d-flex justify-content-end">
        <div className="text-muted flex-shrink-1 m-1 mr-2">
          <small>
            毎週同じ時間に受講する生徒をLACOMSではレギュラーと呼びます。
          </small>
        </div>
        <div className="p-2 px-3 border rounded flex-shrink-0 is-regular">
          <div className="d-flex align-items-center h-100">
            <Form.Check
              type="checkbox"
              label="レギュラーの生徒です"
              checked={isRegulars}
              onChange={handleCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type SeatsAvailabilityProps = {
  date: Date | undefined;
  timeString: string;
  lessonName: string;
  isRegulars: boolean;
  setLesson: React.Dispatch<React.SetStateAction<Lesson | null>>;
  setIsSeatAvailable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormSeatsAvailability: React.FC<SeatsAvailabilityProps> = props => {
  const {
    date,
    timeString,
    lessonName,
    isRegulars,
    setLesson,
    setIsSeatAvailable,
  } = props;

  const { uid } = useParams();
  const lessons = useSelector((state: RootState) => state.lessons);
  const reservations = useSelector((state: RootState) => state.reservations);
  const myReservations = reservations.filter(resv => resv.uid === uid) || [];

  const availableLesson = findAvailableLessonBy(
    lessons,
    date,
    timeString,
    lessonName,
    reservations
  );

  let isAvailable = false;
  let MessageToDisplay = null;

  if (availableLesson) {
    const { regularsOnly, id, capacity, instructorName } = availableLesson;
    const { count } = reservationPackage(reservations, id);

    console.log(id, "id");
    console.log(count, "people reserved");

    const remainingSeats = capacity - count;

    // 重複
    if (
      myReservations.find(
        resv =>
          resv.lessonID === id && resv.state !== ReservationState.cancelled
      )
    ) {
      MessageToDisplay = (
        <div>
          <h4 className="text-secondary d-inline-block">※既に予約しています</h4>
          <span className="ml-1 mr-1">
            このクラスを既に予約してあります。登録済みの予定をご確認ください。
          </span>
        </div>
      );
    } else {
      // -- has vacant seats
      if (regularsOnly) {
        isAvailable = isRegulars;
        MessageToDisplay = isRegulars ? (
          <div>
            <h4 className="text-success d-inline-block">空席あり</h4>
            <span className="ml-1 mr-1">
              {remainingSeats > 500 ? "" : `残り${remainingSeats}席`}
            </span>
            <span className="mr-1">({instructorName})</span>
          </div>
        ) : (
          <div>
            <h4 className="text-warning">レギュラーのみ予約可能</h4>
            <span className="">
              こちらは特別開講クラスです。レギュラーではない生徒は予約できません。
            </span>
          </div>
        );
      }
      if (!regularsOnly) {
        isAvailable = true;
        MessageToDisplay = (
          <div>
            <h4 className="text-success d-inline-block">空席あり</h4>
            {remainingSeats > 500 ? "" : `残り${remainingSeats}席`}
            <span className="mr-1">({instructorName})</span>
          </div>
        );
      }
      // -- has vacant seats
    }
  } else {
    isAvailable = false;
    MessageToDisplay = (
      <div>
        <h4 className="text-danger d-inline-block">満席</h4>
        <span className="ml-1">
          この時間帯のレギュラーの生徒でしょうか？お手数ですがLACOMSまでご連絡ください。
        </span>
      </div>
    );
  }

  setTimeout(() => {
    isAvailable && setLesson(availableLesson);
    setIsSeatAvailable(isAvailable);
  }, 200);

  return (
    <div
      className="FormSeatsAvailability"
      hidden={!date || !timeString || !lessonName}
    >
      {MessageToDisplay}
    </div>
  );
};

type TimeSelectProps = {
  date: Date | undefined;
  timeString: string;
  setTimeString: React.Dispatch<React.SetStateAction<string>>;
};

export const FormTimeSelect: React.FC<TimeSelectProps> = props => {
  const { date, timeString, setTimeString } = props;

  const lessons = useSelector((state: RootState) => state.lessons);
  const availableLessons = filterLessonsByDate(lessons, date);
  const availableTimes = extractTimeFrom(availableLessons);

  availableTimes.sort(earliestTimeFirstLateLast);

  console.log(availableLessons);
  console.log(availableTimes);

  return (
    <Form.Control
      as="select"
      value={timeString}
      onChange={e => setTimeString(e.target.value)}
      hidden={!date}
      className="FormTimeSelect"
    >
      <option value="" disabled>
        時間を選択してください
      </option>
      {availableTimes.length ? (
        availableTimes.map(string => (
          <option key={string} value={string}>
            {string}
          </option>
        ))
      ) : (
        <option disabled>（選択できる時間がありません）</option>
      )}
    </Form.Control>
  );
};

type LessonSelectProps = {
  date: Date | undefined;
  timeString: string;
  lessonName: string;
  setLessonName: React.Dispatch<React.SetStateAction<string>>;
};

export const FormLessonSelect: React.FC<LessonSelectProps> = props => {
  const { date, timeString, lessonName, setLessonName } = props;

  const lessons = useSelector((state: RootState) => state.lessons);
  const availableLessons = filterLessonsByDateAndTime(
    lessons,
    date,
    timeString
  );
  const availableLessonNames = extractLessonNamesFrom(availableLessons);
  availableLessonNames.sort(alphabetAfirstZlast);

  return (
    <Form.Control
      as="select"
      value={lessonName}
      hidden={!date || !timeString}
      onChange={e => setLessonName(e.target.value)}
      className="FormLessonSelect"
    >
      <option value="" disabled>
        クラスを選択してください
      </option>
      {availableLessonNames.length ? (
        availableLessonNames.map(string => (
          <option key={string} value={string}>
            {string}
          </option>
        ))
      ) : (
        <option disabled>（選択できるクラスがありません）</option>
      )}
    </Form.Control>
  );
};

// ────────────────────────────────────────────────────────────────────────┘
