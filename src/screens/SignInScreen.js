import React from "react";
import { useState, useRef } from "react";
import { login, register } from "../api/Authentication";
import { useRequestSender } from "../Hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredentials } from "../redux/accountSlice";
import { Form, Input, ButtonToolbar, Button, Schema, InputGroup } from "rsuite";
import { Link } from "react-router-dom";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import DynamicLink from "../DynamicLink";
import PageTitle from "../components/PageTitle";
import Logo from "../components/Logo";

const model = Schema.Model({
  firstName: Schema.Types.StringType().isRequired("This field is required"),
  lastName: Schema.Types.StringType().isRequired("This field is required"),
  email: Schema.Types.StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required")
    .addRule((value, data) => {
      return !data.emailConflict;
    }, "There is already an account with this e-mail. Please log in."),
  password: Schema.Types.StringType().isRequired("This field is required"),
  verifyPassword: Schema.Types.StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }

      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required."),
});

function TextField(props) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
}

function PasswordField(props) {
  const { name, label, accepter, visible, setVisible, ...rest } = props;

  return (
    <Form.Group controlId={`${name}-3`}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <InputGroup inside>
        <Form.Control
          name={name}
          accepter={accepter}
          type={visible ? "text" : "password"}
          {...rest}
        />
        <InputGroup.Button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? <EyeIcon /> : <EyeSlashIcon />}
        </InputGroup.Button>
      </InputGroup>
    </Form.Group>
  );
}

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  if (
    useSelector((state) => {
      return state.account.isLoggedIn;
    })
  ) {
    navigate("/");
  }

  const [emailConflict, setEmailConflict] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  async function handleSubmit() {
    setIsLoading(true);
    setEmailConflict(false);
    if (formRef.current.check()) {
      const result = await register(formValue);
      if (!result) {
        setEmailConflict(true);
      }
    }
    setIsLoading(false);
  }

  PageTitle("Sign in");
  return (
    <div className="d-flex flex-column  my-5 container align-items-center">
      <Logo></Logo>
      <Form
        model={model}
        ref={formRef}
        onChange={setFormValue}
        formValue={{ ...formValue, emailConflict }}
      >
        <TextField name="firstName" label="First Name" />
        <TextField name="lastName" label="Last Name" />
        <TextField name="email" label="Email" />
        <PasswordField
          name="password"
          label="Password"
          visible={isPasswordVisible}
          setVisible={setIsPasswordVisible}
        ></PasswordField>
        <PasswordField
          name="verifyPassword"
          label="Confirm Password"
          visible={isPasswordVisible}
          setVisible={setIsPasswordVisible}
        ></PasswordField>
        <ButtonToolbar className="d-flex justify-content-center">
          <Button
            className="px-3"
            appearance="primary"
            onClick={handleSubmit}
            loading={isLoading}
          >
            Sign in
          </Button>
        </ButtonToolbar>
      </Form>
      <span className="mt-3">
        Already have an account ?{" "}
        <Link to={DynamicLink("log-in")}>Log in.</Link>
      </span>
    </div>
  );
};

export default SignInScreen;
