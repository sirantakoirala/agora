import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Modal,
  TextArea,
  Menu,
} from "semantic-ui-react";
import { collection, query, where, getDocs, addDoc, setDoc,doc,updateDoc,arrayUnion } from "firebase/firestore";
import { db } from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";

const QuizModal = ({ subjectOptions, currentUser }) => {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    question: "",
    subject: "",
    correctAnswer: "",
  });

  const handleChange = (ev) => {
    setFormState((prev) => ({ ...prev, [ev.target.id]: ev.target.value }));
  };

  const handleQuiz = async (ev) => {
    try {
      ev.preventDefault();
      const isEmpty = Object.values(formState).some((val) => val === "");
      if (isEmpty) {
        return;
      }
      const quizid = uuidv4();
      const quizzesCollDoc = doc(db, "quizzes", quizid);
      await setDoc(quizzesCollDoc, {
        ...formState,
        correctAnswer: formState[formState.correctAnswer],
        user: currentUser.email,
        uid: currentUser.uid,
        quizId: quizid,
      });
      const userDoc = doc(db, "users", currentUser.uid);
      const current = new Date();
      const curdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
      updateDoc(userDoc,
        {
// history: arrayUnion("Post^Create^"+curdate+"^"+"<a href ='/quiz/"+topicId+"' >"+topic.topicTitle+"</a>"),

      history: arrayUnion("Post^Create^"+curdate+"^"+"<a href ='/quiz/"+formState.subject+"' >"+formState.question+"</a>"),
        });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const options = [
    { key: "1", text: "Answer 1", value: "answer1" },
    { key: "2", text: "Answer 2", value: "answer2" },
    { key: "3", text: "Answer 3", value: "answer3" },
    { key: "4", text: "Answer 4", value: "answer4" },
  ];

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Menu.Item header style={{marginLeft:'1em'}}>Add a Quiz Question</Menu.Item>}
    >
      <Modal.Header>Question</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleQuiz}>
            <Form.Field
              control={TextArea}
              label="Question"
              value={formState.question}
              id="question"
              onChange={handleChange}
            />
            <Form.Field
              control={Select}
              label="Topic Subject"
              options={subjectOptions}
              placeholder="Subject"
              id="topicSubject"
              value={formState.subject}
              onChange={(ev, data) => {
                setFormState((prev) => ({ ...prev, subject: data.value }));
              }}
            />
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Answer 1"
                id="answer1"
                value={formState.answer1}
                onChange={handleChange}
              />
              <Form.Field
                control={Input}
                label="Answer 2"
                id="answer2"
                value={formState.answer2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Answer 3"
                id="answer3"
                value={formState.answer3}
                onChange={handleChange}
              />
              <Form.Field
                control={Input}
                label="Answer 4"
                value={formState.answer4}
                id="answer4"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Field
              control={Select}
              label="Correct Answer"
              value={formState.correctAnswer}
              onChange={(ev, data) => {
                setFormState((prev) => ({
                  ...prev,
                  correctAnswer: data.value,
                }));
              }}
              options={options}
            />
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default QuizModal;
