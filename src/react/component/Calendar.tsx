import React from "react";
import { useEffect } from "react";
import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-day-picker/lib/style.css";
import "moment/locale/ja";
import moment from "moment";

moment.locale("ja");

type Props = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  initialDate: Date;
  flexCenter?: boolean;
};

const Calendar: React.FC<Props> = props => {
  const { date, setDate, initialDate } = props;

  const flexCenter = props.flexCenter ? " d-flex justify-content-center" : "";

  const modifiers = {
    saturdays: { daysOfWeek: [6] },
    sundays: { daysOfWeek: [0] },
  };

  const modifiersStyles = {
    saturdays: { color: "dodgerblue" },
    sundays: { color: "salmon" },
    selected: { color: "white" },
  };

  // const disabledDays = {
  //   daysOfWeek: [0, 6],
  // };

  useEffect(() => {
    console.log(date, "date");
  });

  const handleDayClick = (date: Date, { selected, disabled }: any) => {
    setDate(disabled ? undefined : selected ? undefined : date);
  };

  return (
    <div className={"Calendar " + flexCenter}>
      <div className="d-inline-block border">
        <DayPicker
          locale={"ja"}
          localeUtils={MomentLocaleUtils}
          selectedDays={date}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          initialMonth={initialDate}
          firstDayOfWeek={1}
          canChangeMonth={false}
          onDayClick={handleDayClick}
        />
        <p className="text-center">
          {date ? moment(date).format("M月D日(dd)") : "日付を選択してください"}
        </p>
      </div>
    </div>
  );
};

export default Calendar;
