import React, { useState } from "react";
import {
  Button,
  Header,
  Modal,
  Form,
  Input,
  TextArea,
  Dimmer,
  Loader,
  Link,
} from "semantic-ui-react";
import { useUserContext } from "../../context/userContext";
import { db, storage } from "../../firebase-config";

import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  arrayRemove,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export function PostModal({ topicId, curComment }) {
  const [open, setOpen] = React.useState(false);
  const [post, setPost] = useState("");

  const { currentUser } = useUserContext();
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleSubject = async (ev) => {
    try {
      if (post === "") {
        return;
      }
      setLoading(true);
      console.log(selectedFile);
      const poId = uuidv4();
      const postCollDoc = doc(db, "posts", poId);
      console.log("he1re");
      console.log(currentUser.displayname + "KKKKK");

      if (selectedFile) {
        const storageRef = ref(storage, `images/${poId}`);
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
                await setDoc(postCollDoc, {
                  postTitle: post,
                  user: currentUser.displayname,
                  uid: currentUser.uid,
                  topicId: topicId,
                  postId: poId,
                  postImage: downloadURL,
                  createdAt: serverTimestamp(),
                  likeId: arrayRemove(""),
                  dislikeId: arrayRemove(""),
                  pinned: false,
                });
                setOpen(false);
                //                setFormState(initialState);
                setLoading(false);
              }
            );
          }
        );
      } else {
        await setDoc(postCollDoc, {
          postTitle: post,
          user: currentUser.displayname,
          uid: currentUser.uid,
          topicId: topicId,
          postId: poId,
          createdAt: serverTimestamp(),
          likeId: arrayRemove(""),
          dislikeId: arrayRemove(""),
          pinned: false,
        });
        const topicDoc = doc(db, "topics", topicId);
        updateDoc(topicDoc, {
          comment: curComment + 1,
        });

        const q = query(
          collection(db, "topics"),
          where("topicId", "==", topicId)
        );

        const querySnapshot = await getDocs(q);
        const [topic] = querySnapshot.docs.map((post) => post.data());

        const userDoc = doc(db, "users", currentUser.uid);
        const current = new Date();
        const curdate = `${current.getDate()}/${
          current.getMonth() + 1
        }/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
        updateDoc(userDoc, {
          history: arrayUnion(
            "Post^Create^" +
              curdate +
              "^" +
              "<a href ='/topic/" +
              topicId +
              "' >" +
              topic.topicTitle +
              "</a>"
          ),
        });

        setOpen(false);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Post a New Answer</Button>}
    >
      {loading && (
        <Dimmer active>
          <Loader size="mini">Submitting your answer....</Loader>
        </Dimmer>
      )}
      <Modal.Header>Post</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Post a New Answer</Header>
          <Form onSubmit={handleSubject}>
            <Form.Group widths="equal">
              <Form.Field
                control={TextArea}
                label="Post Content"
                placeholder="Answer to the discussion topic."
                onChange={(ev) => setPost(ev.target.value)}
                value={post}
              />
            </Form.Group>
            <input
              type="file"
              label="Image"
              onChange={(ev) => setSelectedFile(ev.target.files[0])}
            />
            <Form.Field control={Button} type="submit">
              Submit
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
