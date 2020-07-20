import React from "react";
import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../img/mortar-board.svg";
import { Path } from "../App";

const NavBar = () => {
  return (
    <Navbar bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand href={Path.home}>
          <img src={logo} width="29" height="29" alt="logo" />
          <LogoTitle>LACOMS Student Center</LogoTitle>
        </Navbar.Brand>
        <DevBadge>開発中</DevBadge>
      </Container>
    </Navbar>
  );
};

const LogoTitle = styled.span`
  margin-left: 0.4rem;
`;

const DevBadge = styled.div`
  overflow: hidden;
  word-break: keep-all;
`;

export default NavBar;
