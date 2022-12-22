import React from "react";
import { useState, useRef, useEffect } from "react";
import { login } from "../api/Authentication";
import { useRequestSender } from "../Hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../redux/accountSlice";
import { Form, Input, ButtonToolbar, Button, Schema, InputGroup } from "rsuite";
import { Link } from "react-router-dom";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { Row, Col } from "rsuite";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import DynamicLink from "../DynamicLink";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";

const model = Schema.Model({
  email: Schema.Types.StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required"),
  password: Schema.Types.StringType().isRequired("This field is required"),
});

const errorStyles = (errorVisible) => {
  return {
    display: errorVisible ? "block" : "none",
    color: "red",
    marginTop: 6,
  };
};

const LogInScreen = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });
  const [isValidationErrorActive, setIsValidationErrorActive] = useState(false);

  const formRef = useRef();

  const accountState = useSelector((state) => {
    return state.account;
  });

  if (accountState.isLoggedIn == true) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  async function handleSubmit() {
    if (formRef.current.check()) {
      setIsLoading(true);
      const res = await login(formValue);
      if (!res) {
        setIsValidationErrorActive(true);
        setIsLoading(false);
      }
    }
  }

  PageTitle("Login");
  return (
    <div className="d-flex flex-column align-items-center  my-5 container justify-content-center">
      <Logo></Logo>
      <Form
        ref={formRef}
        model={model}
        onSubmit={handleSubmit}
        onChange={setFormValue}
      >
        <div style={errorStyles(isValidationErrorActive)}>
          Wrong email or password.
        </div>
        <Form.Group controlId="email-6">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="email" />
        </Form.Group>
        <Form.Group controlId={`password-6`}>
          <Form.ControlLabel>Password</Form.ControlLabel>
          <InputGroup inside>
            <Form.Control
              name="password"
              type={isPasswordVisible ? "text" : "password"}
            />
            <InputGroup.Button
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
            >
              {isPasswordVisible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <ButtonToolbar className="d-flex justify-content-center">
            <Button
              className="px-4"
              type="submit"
              appearance="primary"
              loading={isLoading}
            >
              Login
            </Button>
          </ButtonToolbar>
        </Form.Group>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={DynamicLink("sign-in")}>Sign in.</Link>
        </p>
      </Form>
      <Row className="text-center mt-3">
        <span>- or -</span>
        <Row>
          <GoogleLogin
            className="mt-3"
            clientId={clientId}
            buttonText="Log in with Google"
            onSuccess={(data) => {}}
            onFailure={(data) => {}}
            cookiePolicy={"single_host_origin"}
          />
        </Row>
      </Row>
    </div>
  );
};

export default LogInScreen;
