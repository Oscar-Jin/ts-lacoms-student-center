import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import LoginForm from "../form/LoginForm";

const LoginPage = () => {
  return (
    <div className="beach-sdie h-100">
      <Container className="h-100 dev-blue">
        <FlexCenter>
          <LoginForm />
        </FlexCenter>
      </Container>
    </div>
  );
};

const FlexCenter = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default LoginPage;
