import React, { useState } from "react";
import { Button, Header, Modal, Form, Input, Menu } from "semantic-ui-react";
import { useUserContext } from "../../context/userContext";
import { db } from "../../firebase-config";

import { collection, addDoc,updateDoc,arrayUnion,doc } from "firebase/firestore";

export function SubjectModal() {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = useState("");
  const [courseId, setCourseId] = useState("");
  const { currentUser } = useUserContext();
  const handleSubject = async (ev) => {
    ev.preventDefault();
    try {
      if (!subject) return;
      const subjectCollRef = collection(db, "subject");
      await addDoc(subjectCollRef, {
        title: subject,
        courseId:courseId,
        user: currentUser.uid,
      });
      
      const userDoc = doc(db, "users", currentUser.uid);
      const current = new Date();
      const curdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      updateDoc(userDoc,
        {
          history: arrayUnion("Subject^Create^"+curdate+"^"+"SubjectTitle:"+subject),
        });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal 
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item> Create a Subject</Menu.Item>}
    >
      <Modal.Header>Subject</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Add a Subject</Header>
          <Form onSubmit={handleSubject}>
            <Form.Group>
              <Form.Field
                control={Input}
                label="Subject Name"
                placeholder="Name of New Subject"
                onChange={(ev) => setSubject(ev.target.value)}
                value={subject}
              />
            </Form.Group>
            <Form.Group>
              <Form.Field
                
                  control={Input}
                  label="Course Code"
                  placeholder="Course Code"
                  onChange={(ev) => setCourseId(ev.target.value)}
                  value={courseId}
              />
            </Form.Group>
            <Form.Field control={Button} type="submit">
              Submit
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
