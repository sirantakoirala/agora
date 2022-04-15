import React, { useState } from "react";

import { Login } from "./Registration/Login";
import { SignUp } from "./Registration/SignUp";
import { Grid, Message } from "semantic-ui-react";

const spanStyle = {
  color: "purple",
  textDecoration: "underline",
  paddingLeft: 4,
  cursor: "pointer",
};
export const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {isLogin ? <Login /> : <SignUp />}
        <Message>
          {isLogin ? (
            <p>
              New to us?
              <span style={spanStyle} onClick={() => setIsLogin(false)}>
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already registered?
              <span style={spanStyle} onClick={() => setIsLogin(true)}>
                Log in
              </span>
            </p>
          )}
        </Message>
      </Grid.Column>
    </Grid>
  );
};
