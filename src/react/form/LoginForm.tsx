import React, { useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { isHiragana } from "../../toolbox/isHiragana";
import { Membership } from "../../draft/Membership";

const alert = {
  heading: null,
  content: "８月の予定、受付開始",
  variant: "success",
};

const LoginForm = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const [lastNameValid, setLastNameValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [studentFound, setStudentFound] = useState(true);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLastNameValid(isHiragana(lastName));
    setFirstNameValid(isHiragana(firstName));

    if (isHiragana(lastName) && isHiragana(firstName)) {
      setLoading(true);
      setStudentFound(true);
      Membership.findLatest(lastName, firstName, "hiragana")
        .then(latest => {
          console.log(latest);
          setLoading(false);
        })
        .catch(error => {
          setStudentFound(false);
          setLoading(false);
        });
    }
  };

  return (
    <Div>
      <Alert variant={alert.variant} style={alertStyles} hidden>
        {alert.content}
      </Alert>
      <InputForm>
        <FlexColumn>
          <Main>
            <LoginTitle>
              <h1 className="d-inline-block mr-2">Login</h1>
              <div className="text-muted">Student Center</div>
            </LoginTitle>
            <Form onSubmit={handleLogin}>
              <Tips>名前をひらがなで入力してください</Tips>
              <Form.Control
                placeholder="姓（ひらがな）"
                style={inputStyles}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <Validate hidden={lastNameValid}>
                ひらがなで入力されていません
              </Validate>
              <Form.Control
                placeholder="名（ひらがな）"
                style={inputStyles}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <Validate hidden={firstNameValid}>
                ひらがなで入力されていません
              </Validate>
              <FlexRight>
                <Button type="submit" style={buttonStyles} disabled={loading}>
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>ログイン</span>
                  )}
                </Button>
              </FlexRight>
            </Form>
            <NotFound hidden={studentFound}>
              <p>
                アカウントが見つかりませんでした。もう一度入力していただくか、お手数ですがLACOMSまでご連絡ください。
              </p>
              <span className="text-muted">TEL: 03-5351-2205</span>
              <br />
              <span className="text-muted">MAIL: info@lacoms.com</span>
            </NotFound>
          </Main>
          <Logo>LACOMS</Logo>
        </FlexColumn>
      </InputForm>
    </Div>
  );
};

const alertStyles: React.CSSProperties = {
  borderRadius: "0.5rem",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.15)",
};

const inputStyles: React.CSSProperties = {
  marginBottom: "0.7rem",
};

const buttonStyles: React.CSSProperties = {
  marginTop: "0.3rem",
};

const Div = styled.div`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 500px;
`;

const InputForm = styled.div`
  background-color: white;
  margin: auto;
  overflow: auto;
  padding: 2rem;
  height: 100%;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const LoginTitle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FlexColumn = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: space-between;
`;

const Main = styled.div`
  margin-bottom: 2rem;
`;

const Tips = styled.p`
  color: lightgray;
  font-size: 0.85rem;
`;

const Validate = styled.p`
  color: salmon;
`;

const NotFound = styled.div`
  margin-top: 1rem;
  color: salmon;
`;

const Logo = styled.div`
  text-align: center;
  color: lightgray;
  margin-bottom: 0.5rem;
`;

export default LoginForm;
