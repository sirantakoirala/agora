import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { useUserContext } from "../../context/userContext";
import AgoraLogo from "../../images/logo.png";

export const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { signIn } = useUserContext();
  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleLogin = () => {
    if (formState.email === "" || formState.password === "") return;
    signIn(formState.email, formState.password);
  };

  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        <Image src={AgoraLogo} />
        Agora
      </Header>
      <Form size="large" onSubmit={handleLogin}>
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
            id="password"
            onChange={handleChange}
          />

          <Button color="teal" fluid size="large" type="submit">
            Login
          </Button>
        </Segment>
      </Form>
    </>
  );
};
