import React, { useState } from "react";
import {
  Button,
  Form,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import AgoraLogo from "../../images/logo.png";
import { useUserContext } from "../../context/userContext";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignUp = () => {
  const [formState, setFormState] = useState(initialState);
  const { signUp } = useUserContext();
  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };
  const [isSignUpInProgress, setIsSignUpInProgress] = useState(false);
  const handleSignUp = async (ev) => {
    ev.preventDefault();
    if (
      formState.email === "" ||
      formState.password === "" ||
      formState.confirmPassword === ""
    ) {
      return;
    }
    if (formState.confirmPassword !== formState.password) {
      return;
    }
    setIsSignUpInProgress(true);
    await signUp(formState.email, formState.password);
    setFormState(initialState);
    setIsSignUpInProgress(false);
  };
  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        <Image src={AgoraLogo} />
        Agora
      </Header>
      <Form size="large" onSubmit={handleSignUp}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            id="email"
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            id="password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            onChange={handleChange}
            type="password"
            id="confirmPassword"
          />

          <Button color="teal" fluid size="large" type="submit">
            Sign up
          </Button>
        </Segment>
      </Form>
    </>
  );
};
