import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../nav/NavBar";
import last from "lodash/last";
import { MembershipsStatus } from "../../draft/Membership";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ReservationModule from "../module/ReservationModule";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TimeTableView from "../component/TimeTableView";

const Name = styled.h1`
  display: inline-block;
  color: #6c757d;
  margin-right: 1rem;
`;

const Message = styled.p`
  display: inline-block;
  margin: 0;
`;

const StudentPage = () => {
  const { uid } = useParams();
  const history = useHistory();
  const userUID = useSelector((state: RootState) => state.user.uid);

  const [monthSelect, setMonthSelect] = useState("thisMonth");

  useEffect(() => {
    if (!userUID) {
      history.push("/redirect/" + uid);
    }
  }, [userUID, history, uid]);

  const userMemberships = useSelector((state: RootState) => state.memberships);
  const latest = last(userMemberships);

  return (
    <div className="sky-dive" style={{ minHeight: "100%" }}>
      <NavBar />
      <Container className="pt-4 pb-5 mt-4 bg-white shadow">
        <Name>{latest?.lastName_kanji}</Name>
        <Name>{latest?.firstName_kanji}</Name>
        {display(latest?.status)}
        <div className="p-2 mt-3" />
        <Tabs
          defaultActiveKey="thisMonth"
          onSelect={eventKey => {
            setMonthSelect(eventKey!);
          }}
        >
          <Tab eventKey="thisMonth" title="今月">
            <ReservationModule monthSelect="thisMonth" />
          </Tab>
          <Tab eventKey="nextMonth" title="来月">
            <ReservationModule monthSelect="nextMonth" />
          </Tab>
        </Tabs>
      </Container>
      <Container className=" py-5 px-3 ">
        <TimeTableView monthSelect={monthSelect} />
      </Container>
    </div>
  );
};

const display = (status: MembershipsStatus | undefined) => {
  switch (status) {
    case MembershipsStatus.active:
      return <Message>Welcome back!</Message>;
    case MembershipsStatus.paused:
      return (
        <Message className="text-warning">
          休会中の生徒様は未消化が０コマになっている場合がございます。恐れ入りますが、再開される際はLACOMSにご連絡ください。
        </Message>
      );
    case MembershipsStatus.cancelled:
      return (
        <Message className="text-secondary">
          これまでLACOMSご利用いただきまして、誠にありがとうございました。
        </Message>
      );
    default:
      return <div></div>;
  }
};

export default StudentPage;
