import React, { useState, useEffect } from "react";
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
  Icon,
  Container,
} from "semantic-ui-react";
import { Sidebar } from "../Dashboard/Sidebar";
import AgoraLogo from "../../images/logo.png";
import { useUserContext } from "../../context/userContext";
import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
export const Profile = () => {
  const initialState = {
    userName: "",
    email: "",
    address: "",
    birthdate: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
    avatarUrl: "https://react.semantic-ui.com/images/wireframe/image.png",
    avatar: null,
  };
  const initalChangeState = {
    userName: false,
    email: false,
    address: false,
    birthdate: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
    role: false,
    avatarUrl: false,
    avatar: false,
  };

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState(initialState);
  const [formChangeState, setChangeState] = useState(initalChangeState);
  const [isUpdateInProgress, setUpdateInProgress] = useState(false);
  const { updateUserPassword, currentUser } = useUserContext();
  const [isSuccess, setIsSuccess] = useState(false);
  const [passAndConfirmPass, setPassAndConfirmPass] = useState(true);
  const [passValid, setPassValid] = useState(true);
  useEffect(() => {
    const getProfile = async () => {
      try {
        setFormState((prev) => ({
          ...prev,
          role: currentUser.role,
          email: currentUser.email,
          phoneNumber: currentUser.phone,
          address: currentUser.address,
          birthdate: currentUser.birthdate,
          avatarUrl:
            currentUser.avatar == undefined
              ? "/images/uicon.png"
              : currentUser.avatar,
          userName: currentUser.uname,
        }));
        console.log(formState);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
    //console.log(currentUser.role);
  }, []);
  const handleUpdate = async () => {
    console.log(formState);
    console.log(formChangeState);
    console.log(formState.isTeacher);

    // if (
    //   formState.userName == ""||
    //   formState.email === "" ||
    //   formState.phoneNumber == ""||
    //   formState.password === "" ||
    //   formState.confirmPassword === "" ||
    //   formState.avatar === null
    // )
    // {
    //     return;
    // }
    if (formState.confirmPassword !== formState.password) {
      setPassAndConfirmPass(false);
      return;
    }

    // if (
    //   !formState.password.match(
    //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g
    //   )
    // ) {
    //   setPassValid(false);
    //   return;
    // }

    try {
      setUpdateInProgress(true);
      //if(formChangeState.email == true)
      //const { user } = await updateUserPassword(formState.password);
      if (formChangeState.avatar) {
        const storageRef = ref(storage, `images/${formState.topicSubject}`);
        const uploadTask = uploadBytesResumable(storageRef, formState.avatar);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                const userCollDoc = doc(db, "users", currentUser.uid);
                await updateDoc(userCollDoc, {
                  avatar: downloadURL,
                });
                setLoading(false);
                setUpdateInProgress(false);
              }
            );
          }
        );
      }
      console.log(currentUser.uid);
      const userDoc = doc(db, "users", currentUser.uid);
      await updateDoc(userDoc, {
        address: formState.address,
        phone: formState.phoneNumber,
        birthdate: formState.birthdate,
      });
      setIsSuccess(true);
      setLoading(false);
      setUpdateInProgress(false);
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
      setUpdateInProgress(false);
    }
  };
  const handleImageChange = (ev) => {
    console.log("AA" + URL.createObjectURL(ev.target.files[0]));
    setFormState((prev) => ({
      ...prev,
      avatarUrl: URL.createObjectURL(ev.target.files[0]),
      [ev.target.id]: ev.target.files[0],
    }));
    setChangeState((prev) => ({ ...prev, avatarUrl: true, avatar: true }));
  };
  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
    setChangeState((prev) => ({ ...prev, [ev.target.id]: true }));
  };
  const handleChangeTeacher = (ev) => {
    setFormState((prev) => ({
      ...prev,
      [ev.target.id]: ev.target.checked == 0 ? "student" : "teacher",
    }));
  };
  return (
    <Sidebar>
      {loading && (
        <Dimmer active>
          <Loader size="mini">Submitting your question....</Loader>
        </Dimmer>
      )}
      <Form size="large" onSubmit={handleUpdate}>
        <Segment stacked>
          <Form.Input
            label={
              <Image
                label="Profile Image"
                src={formState.avatarUrl}
                size="medium"
              />
            }
            placeholder=""
            onChange={handleImageChange}
            type="file"
            id="avatar"
            size="small"
          />

          <Form.Input
            fluid
            label="UserName"
            icon="user"
            iconPosition="left"
            id="userName"
            onChange={handleChange}
            defaultValue={formState.userName}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Email Address"
              icon="mail"
              iconPosition="left"
              id="email"
              onChange={handleChange}
              defaultValue={formState.email}
            />
            <Form.Input
              fluid
              label="Phone Number"
              icon="phone"
              iconPosition="left"
              type="tel"
              onChange={handleChange}
              id="phoneNumber"
              defaultValue={formState.phoneNumber}
              onKeyPress={(event) => {
                //if (!/[0-9]/.test(event.key)) {
                //  event.preventDefault();
                //}
              }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Address"
              icon="address card"
              iconPosition="left"
              id="address"
              type="address"
              defaultValue={formState.address}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              label="DOB"
              icon="calendar"
              iconPosition="left"
              id="birthdate"
              type="date"
              defaultValue={formState.birthdate}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Input
            fluid
            label="Old Password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={handleChange}
            type="password"
            id="oldPassword"
          /> */}
          {/* <Form.Input
            fluid
            label="New Password"
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            onChange={ handleChange }
            type="password"
            id="password"
          />
          <Form.Input
            fluid
            label="Confirm New Password"
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            onChange={ handleChange }
            type="password"
            id="confirmPassword"
          />
          <h1 style={{textTransform :'uppercase'}}>{currentUser.role}</h1> */}
          <Button color="teal" fluid size="large" type="submit">
            {isUpdateInProgress ? (
              <Dimmer active>
                <Loader size="mini">Loading</Loader>
              </Dimmer>
            ) : (
              "Update"
            )}
          </Button>
        </Segment>
      </Form>
    </Sidebar>
  );
};
