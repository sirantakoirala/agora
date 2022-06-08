import { useUserContext } from "../../context/userContext";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, query, getDocs, where,doc,updateDoc,arrayUnion} from "firebase/firestore";
import { Sidebar } from "../Dashboard/Sidebar";
import { useParams } from "react-router-dom";
import { Menu,Button, Card, Image, Form, Radio, Message } from "semantic-ui-react";
import QuizModal from "../Dashboard/QuizModal";

export const Quiz = () => {
  const { subject } = useParams();
  const { currentUser } = useUserContext();
  const isNotStudentRole = currentUser.role !== "student";
  const [formState, setFormState] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  console.log(formState);

  const [subjectQuizzes, setSubjectQuizzes] = useState([]);
  useEffect(() => {
    async function getSubjects() {
      const q = query(
        collection(db, "quizzes"),
        where("subject", "==", subject)
      );

      const querySnapshot = await getDocs(q);
      const quizzes = querySnapshot.docs.map((doc) => doc.data());

      setSubjectQuizzes(quizzes);
    }
    getSubjects();
  }, []);
  const handleChange = (e,{value}) => {
//    console.log(name);
    console.log(value +"A" + e.target.outerText);
    formState[value]=e.target.outerText;
    console.log(formState);
    setFormState(arr=>[...formState]);
  };

  const handleScore = (ev) => {
    ev.preventDefault();
    console.log(subjectQuizzes);
    const score = subjectQuizzes.filter(
      (quiz,index) => formState[index] === quiz.correctAnswer
    ).length;
    setScore(score);
    setSubmitted(true);
    console.log(score);
    const userDoc = doc(db, "users", currentUser.uid);
    const current = new Date();
    const curdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    updateDoc(userDoc,
      {
        history: arrayUnion("Quiz^Test^"+curdate+"^"+"Score:"+score+"/"+Object.keys(subjectQuizzes).length),
      });
  };
  const options = [{ key: "1", text: subject, value: subject }];
  if (subjectQuizzes.length === 0) {
    return (
      <Sidebar>
        <h1>Subject: {subject}</h1>

        {submitted && (
          <Message
            success
            header="Your current score is"
            content={`${score}/${subjectQuizzes.length}`}
          />
        )}

        <Menu style={{ padding: "20px 0" }}>
          {isNotStudentRole && (
            <QuizModal subjectOptions={options} currentUser={currentUser} />
          )}
        </Menu>

        <Message>
          <Message.Header>No quizzes found</Message.Header>
          <p>Currently no quizzes is available for this particular subject</p>
        </Message>
      </Sidebar>
    );
  }
  return (
    <Sidebar>
      <h1>Quiz - {subject}</h1>

      {submitted && (
        <Message
          success
          header="Your current score is"
          content={`${score}/${subjectQuizzes.length}`}
        />
      )}

      <Menu style={{ padding: "20px 0" }}>
        {isNotStudentRole && (
          <QuizModal subjectOptions={options} currentUser={currentUser} />
        )}
      </Menu>

        {subjectQuizzes.map((quiz, index) => {
          return (
            
            <Card style={{ width: "100%" }} key={quiz.quizId}>
              <Card.Content>
                <Card.Header>{quiz.question}</Card.Header>
                <Card.Description></Card.Description>
              </Card.Content>
              <Card.Content extra>
              <Form >
                <Form.Field>
                  <Radio
                    label={quiz.answer1}
                    name={index}
                    value={index}
                    onChange={handleChange}
                    checked={formState[index] === quiz.answer1}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                      label={quiz.answer2}
                      name={index}
                      value={index}
                      onChange={handleChange}
                      checked={formState[index] === quiz.answer2}
                    />

                </Form.Field>
                <Form.Field>
                  <Radio
                    label={quiz.answer3}
                    name={index}
                    value={index}
                    onChange={handleChange}
                    checked={formState[index] === quiz.answer3}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={quiz.answer4}
                    name={index}
                    value={index}
                    onChange={handleChange}
                    checked={formState[index] === quiz.answer4}
                  />
                </Form.Field>
            </Form>
              </Card.Content>
            </Card>

          );
        })}
        <Button color="violet" onClick={handleScore}>
          Submit
        </Button>
    </Sidebar>
  );
};
