import React from "react";
import moment from "moment";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { ReservationState, Reservation } from "../../draft/Reservation";

type Props = {
  reservation: Reservation;
  monthSelect: "thisMonth" | "nextMonth";
};

const ReservationCard: React.FC<Props> = props => {
  const { reservation, monthSelect } = props;

  return (
    <Card
      style={
        monthSelect === "thisMonth"
          ? {
              backgroundImage:
                "linear-gradient(30deg, #045de9 0%, #00adff 74%)",
            }
          : {
              backgroundImage:
                "linear-gradient(30deg, #7fdb2e 0%, #01BAEF 74%)",
            }
      }
      className={
        moment().format("YYYY-MM-DD") > reservation.iso8601 ? "translucent" : ""
      }
    >
      <FlexNoWrap>
        <FlexBox>
          <Date>{moment(reservation.iso8601).format("M月D日(ddd)")}</Date>
          <Item>{reservation.timeString}</Item>
          <Item>{reservation.lessonName}</Item>
          <Item>{reservation.instructorName}</Item>
          <Item>{localize(reservation.state)}</Item>
        </FlexBox>
        <Button
          variant="light"
          size="sm"
          className="shadow-sm"
          hidden={reservation.state !== ReservationState.reserved}
        >
          <small
            style={{
              wordBreak: "keep-all",
              color: "darkgray",
              fontWeight: "bold",
            }}
          >
            キャンセル
          </small>
        </Button>
      </FlexNoWrap>
    </Card>
  );
};

export const localize = (state: ReservationState) => {
  switch (state) {
    case ReservationState.reserved:
      return "出席予定";
    case ReservationState.attended:
      return "出席";
    case ReservationState.cancelled:
      return "キャンセル";
    case ReservationState.cancelledWithPenalty:
      return "当日キャンセル";
    case ReservationState.cancelledWithPenaltyButRefundedAnyways:
      return "ターム内1回目の当日キャンセルにき、振替可能と見なします";
    case ReservationState.noShow:
      return "無断欠席";
  }
};

const Card = styled.div`
  margin-top: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  display: flex;
  flex-wrap: wrap;
  color: white;
`;

const FlexNoWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
`;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Date = styled.div`
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
`;

const Item = styled.div`
  padding: 0.3rem 0.5rem;
`;

export default ReservationCard;
