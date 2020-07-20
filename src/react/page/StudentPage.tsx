import React, { useEffect } from "react";
import moment from "moment";
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

  useEffect(() => {
    if (!userUID) {
      history.push("/redirect/" + uid);
    }
  }, [userUID, history, uid]);

  const userMemberships = useSelector((state: RootState) => state.memberships);
  const latest = last(userMemberships);

  return (
    <div>
      <NavBar />
      <Container className="py-4">
        <Name>{latest?.lastName_kanji}</Name>
        <Name>{latest?.firstName_kanji}</Name>
        {display(latest?.status)}
        <div className="p-2" />
        <Tabs defaultActiveKey="thisMonth">
          <Tab eventKey="thisMonth" title="今月">
            <ReservationModule monthSelect="thisMonth" />
          </Tab>
          <Tab eventKey="nextMonth" title="来月">
            <ReservationModule monthSelect="nextMonth" />
          </Tab>
        </Tabs>
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
