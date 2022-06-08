import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { useUserContext } from "../../context/userContext";
import AgoraLogo from "../../images/logo3.png";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const { signIn } = useUserContext();
  const [isLogInInProgress, setIsLogInInProgress] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      setLogin(true);
      console.log("LOGIN");
      setIsLogInInProgress(true);
      if (formState.email === "" || formState.password === "") return;
      await signIn(formState.email, formState.password);
      setLogin(false);
      navigate("/dashboard");
      //setIsLogInInProgress(false);
    } catch (err) {
      console.log(err);
      setIsLogInInProgress(false);
      setLogin(true);
    }
  };

  return (
    <>
      <Image src={AgoraLogo} />
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
            {isLogInInProgress ? (
              <Dimmer active>
                <Loader size="mini">Loading</Loader>
              </Dimmer>
            ) : (
              "Log In"
            )}
          </Button>
        </Segment>
      </Form>
    </>
  );
};
