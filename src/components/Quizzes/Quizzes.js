import { useUserContext } from "../../context/userContext";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Card } from "semantic-ui-react";
import { Sidebar } from "../Dashboard/Sidebar";
import { Link } from "react-router-dom";
export const Quizzes = () => {
  const [ subjectQuizzes, setSubjectQuizzes ] = useState( [] );
  useEffect( () => {
    async function getSubjects() {
      const q = query( collection( db, "subject" ) );

      const querySnapshot = await getDocs( q );
      const subjects = querySnapshot.docs.map( ( doc ) => doc.data() );

      setSubjectQuizzes( subjects );
    }
    getSubjects();
  }, [] );
  return (
    <Sidebar>
      <h1 style={{textAlign:'center'}}>Quiz Questions by Subject</h1>
      <Card.Group>
        { subjectQuizzes.map( ( quiz ) => {
          return (
            <Card
              color="red"
              as={ Link }
              to={ `/quiz/${ quiz.title }` }
              style={ {
                height: 150,
                fontSize: 32,
                fontWeight: "bold",
                paddingTop: 20,
                paddingLeft: 20,
              } }
            >
              <h1>
              { quiz.title }
              </h1>
              <h2>
              {quiz.courseId}
              </h2>
            </Card>
          );
        } ) }
      </Card.Group>
    </Sidebar>
  );
};
