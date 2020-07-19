import React from "react";
import Container from "react-bootstrap/Container";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import NavBar from "../nav/NavBar";

const StudentPage = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <NavBar />
      <Container>
        <h1>Student Page</h1>
        <hr />
        <p>{user.uid}</p>
      </Container>
    </div>
  );
};

export default StudentPage;
