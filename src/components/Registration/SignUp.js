import React, { useState } from "react";
import {
  Button,
  Form,
  Header,
  Image,
  Loader,
  Dimmer,
  Message,
  Segment,
  Check,
  Checkbox,
} from "semantic-ui-react";
import AgoraLogo from "../../images/logo3.png";
import { useUserContext } from "../../context/userContext";
import { addDoc, collection, setDoc, doc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase-config";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "student",
  birthdate: "",
  address: "",
};

const setUpUserRoleOnSignUp = async ( userId, email, userName, phoneNumber, address, birthDate, strole ) => {
  console.log( "AAA" + userId );
  try {
    const userCollRef = doc( db, "users", userId );
    console.log( strole );
    await setDoc( userCollRef, {
      role: strole,
      uid: userId,
      uname: userName,
      email: email,
      address: address,
      birthdate: birthDate,
      phone: phoneNumber,
      birthdate: birthDate,
      approval: "No",
      history: arrayRemove(),
    } );
  } catch ( err ) {
    console.log( err );
  }
};

export const SignUp = () => {
  const [ formState, setFormState ] = useState( initialState );
  const { signUp, currentUser } = useUserContext();
  const [ passValid, setPassValid ] = useState( true );
  const [ passAndConfirmPass, setPassAndConfirmPass ] = useState( true );
  const handleChange = ( ev ) => {
    setFormState( ( prev ) => ( { ...prev, [ ev.target.id ]: ev.target.value } ) );
  };
  const handleChangeTeacher = ( ev ) => {
    setFormState( ( prev ) => ( { ...prev, [ ev.target.id ]: ev.target.checked == 0 ? "student" : "teacher" } ) );
  };
  const [ isSignUpInProgress, setIsSignUpInProgress ] = useState( false );
  const [ isSuccess, setIsSuccess ] = useState( false );
  const [ emailError, setEmailError ] = useState( false );
  const handleSignUp = async ( ev ) => {
    ev.preventDefault();

    console.log( formState.isTeacher );
    if (
      formState.firstName == "" ||
      formState.lastName == "" ||
      formState.email === "" ||
      formState.phoneNumber == "" ||
      formState.password === "" ||
      formState.confirmPassword === ""
    ) {
      return;
    }
    if ( formState.confirmPassword !== formState.password ) {
      setPassAndConfirmPass( false );
      return;
    }

    if (
      !formState.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g
      )
    ) {
      setPassValid( false );
      return;
    }

    try {
      setIsSignUpInProgress( true );
      const { user } = await signUp( formState.email, formState.password );
      console.log( "KKK" );
      //userId, email ,userName,phoneNumber, address, birthDate,strole
      await setUpUserRoleOnSignUp( user.uid, formState.email, formState.firstName + " " + formState.lastName, formState.phoneNumber,
        formState.address, formState.birthdate, formState.role );
      setFormState( initialState );
      setIsSignUpInProgress( false );
      setIsSuccess( true );
    } catch {
      setEmailError( true );
      setIsSuccess( false );
      setIsSignUpInProgress( false );
    }
  };
  return (
    <>
      { emailError && (
        <Message
          error
          header="Email is already taken! 
          
          
          
          "
        />
      ) }
      { !passAndConfirmPass && passValid && (
        <Message error header="Your password dont match. Please try again!" />
      ) }
      { !passValid && (
        <Message
          error
          header="Your password doesn't meet the requirement"
          content="It must contain a minimum 8 characters, one uppercase, one lowercase, one digit and a special character"
        />
      ) }
      <Image src={AgoraLogo} />

      { isSuccess && (
        <Message
          success
          header="Your user registration was successful"
          content="You may now log-in with the username you have chosen"
        />
      ) }

      <Form size="large" onSubmit={ handleSignUp }>
        <Segment stacked>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First name"
              id="firstName"
              onChange={ handleChange }
            />
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="Last Name"
              id="lastName"
              onChange={ handleChange }
            />
          </Form.Group>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="E-mail address"
            id="email"
            onChange={ handleChange }
          />
          <Form.Input
            fluid
            icon="phone"
            iconPosition="left"
            placeholder="Phone Number"
            type="tel"
            onChange={ handleChange }
            id="phoneNumber"
            onKeyPress={ ( event ) => {
              if ( !/[0-9]/.test( event.key ) ) {
                event.preventDefault();
              }
            } }
          />
          <Form.Input
            fluid
            icon="address card"
            iconPosition="left"
            id="address"
            type="address"
            placeholder="Address"
            onChange={ handleChange }
          />
          <Form.Input
            fluid
            icon="calendar"
            iconPosition="left"
            id="birthdate"
            type="date"
            onChange={ handleChange }
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={ handleChange }
            type="password"
            id="password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            onChange={ handleChange }
            type="password"
            id="confirmPassword"
          />
          <Form.Checkbox
            label="Teacher"
            id="role"
            onChange={ handleChangeTeacher }
          />
          <Button color="teal" fluid size="large" type="submit">
            { isSignUpInProgress ? (
              <Dimmer active>
                <Loader size="mini">Loading</Loader>
              </Dimmer>
            ) : (
              "Sign up"
            ) }
          </Button>
        </Segment>
      </Form>
    </>
  );
};
