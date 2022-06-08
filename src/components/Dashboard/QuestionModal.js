//import { ArrayBuffer } from "firebase/firestore-types";
import {
  doc,
  getDoc,
  serverTimestamp,
  arrayRemove,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Modal,
  Select,
  Form,
  Dimmer,
  Input,
  TextArea,
  Loader,
  MenuItem,
  Menu,
} from "semantic-ui-react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { useUserContext } from "../../context/userContext";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const initialState = {
  topicTitle: "",
  topicSubject: "",
  topicDescription: "",
};
export function QuestionModal({ subjectOptions }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useUserContext();

  const [formState, setFormState] = useState(initialState);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleTopicSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (
        formState.topicDescription === "" ||
        formState.topicSubject === "" ||
        formState.topicTitle === ""
      ) {
        return;
      }
      setLoading(true);
      console.log(selectedFile);
      var topId = uuidv4();

      if (selectedFile) {
        const storageRef = ref(storage, `images/${formState.topicSubject}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

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
                const topicCollDoc = doc(db, "topics", topId);
                await setDoc(topicCollDoc, {
                  ...formState,
                  user: currentUser.displayname,
                  topicId: topId,
                  topicImage: downloadURL,
                  createdAt: serverTimestamp(),
                  likeId: arrayRemove(""),
                  dislikeId: arrayRemove(""),
                  comment: 0,
                  topicDescription: formState.topicDescription,
                  haspinned: false,
                });
                setOpen(false);
                setFormState(initialState);
                setLoading(false);
              }
            );
          }
        );
      } else {
        const topicCollRef = collection(db, "topics");
        const topicDoc = doc(db, "topics", topId);
        await setDoc(topicDoc, {
          ...formState,
          user: currentUser.displayname,
          topicId: topId,
          createdAt: serverTimestamp(),
          likeId: arrayRemove(""),
          dislikeId: arrayRemove(""),
          comment: 0,
          topicDescription: formState.topicDescription,
          haspinned: false,
        });
        setOpen(false);
        setFormState(initialState);
        setLoading(false);
      }
      const userDoc = doc(db, "users", currentUser.uid);
      const current = new Date();
      const curdate = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      updateDoc(userDoc, {
        history: arrayUnion(
          "Topic^Create^" +
            curdate +
            "^" +
            "<a href ='/topic/" +
            topId +
            "' >" +
            formState.topicTitle +
            "</a>"
        ),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item>Create a Discussion Topic</Menu.Item>}
    >
      {loading && (
        <Dimmer active>
          <Loader size="mini">Submitting your question....</Loader>
        </Dimmer>
      )}
      <Modal.Header>Topic</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Add a Discussion Topic</Header>
          <Form onSubmit={handleTopicSubmit}>
            <Form.Group>
              <Form.Field
                control={Input}
                label="Topic title"
                placeholder="Add a topic"
                id="topicTitle"
                value={formState.topicTitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Field
              control={Select}
              label="Topic Subject"
              options={subjectOptions}
              placeholder="Subject"
              id="topicSubject"
              onChange={(ev, data) => {
                setFormState((prev) => ({ ...prev, topicSubject: data.value }));
              }}
              value={formState.topicSubject}
            />
            <Form.Field
              control={TextArea}
              label="Topic Description"
              id="topicDescription"
              placeholder="Add a topic description"
              onChange={handleChange}
              value={formState.topicDescription}
            />
            
            <input
              type="file"
              label="Image"
              onChange={(ev) => setSelectedFile(ev.target.files[0])}
            />
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
