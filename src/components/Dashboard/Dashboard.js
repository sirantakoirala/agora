import React, { useEffect, useState } from "react";
import { QuestionModal } from "./QuestionModal";
import { SubjectModal } from "./SubjectModal";
import "../components/IconButton.css";

import {
  Message,
  Card,
  Icon,
  Grid,
  Button,
  Label,
  Menu,
  Image,
  Container,
} from "semantic-ui-react";
import { Sidebar } from "./Sidebar";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  updateDoc,
  arrayUnion,
  where,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import QuizModal from "./QuizModal";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { findByLabelText } from "@testing-library/react";

const menuStyle = {
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "0em",
  display: "flex",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};
const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const { currentUser } = useUserContext();
  const [subjectOptions, setSubjectOptions] = useState([]);
  const isNotStudentRole = currentUser.role !== "student";
  const isNotAccpeted = currentUser.approval === "No";
  useEffect(() => {
    if (isNotAccpeted == true && isNotStudentRole == true) {
      alert("Please wait Administrator's Approval");
      signOut(auth);
    }
    async function getTopics() {
      try {
        const q = query(collection(db, "topics"), orderBy("createdAt", "desc"));

        const unsub = await onSnapshot(q, (querySnapshot) => {
          const topics = querySnapshot.docs.map((topic) => topic.data());
          setTopics(topics);
          {
            topics.map((topic) => {
              if (topic.likeId != null)
                topic.likeIdCount = Object.keys(topic.likeId).length;
              else topic.likeIdCount = 0;
              if (topic.dislikeId != null)
                topic.dislikeIdCount = Object.keys(topic.dislikeId).length;
              else topic.dislikeIdCount = 0;
            });
          }
        });

        return unsub;
      } catch (err) {
        console.log(err);
      }
    }
    return getTopics();
  }, []);

  useEffect(() => {
    async function getSubjects() {
      const q = query(collection(db, "subject"));

      const querySnapshot = await getDocs(q);
      const subjects = querySnapshot.docs.map((doc, id) => ({
        value: doc.data().title,
        key: id,
        text: doc.data().title,
      }));
      setSubjectOptions(subjects);
    }
    getSubjects();
  }, []);

  const handleLikeClick = async (ev, tid) => {
    ev.preventDefault();
    {
      topics.map(async (topic) => {
        if (topic.topicId == tid) {
          if (
            topic.likeId.includes(currentUser.uid) == false &&
            topic.dislikeId.includes(currentUser.uid) == false
          ) {
            const topicDoc = doc(db, "topics", tid);
            await updateDoc(topicDoc, {
              likeId: arrayUnion(currentUser.uid),
            });
            topic.likeIdCount++;
            topic.likeId.push(currentUser.uid);
            setTopics((arr) => [...topics]);
          }
        }
      });
    }
  };
  const handledisLikeClick = async (ev, tid) => {
    ev.preventDefault();

    // if(currentUser.role != "teacher") return ;
    {
      topics.map(async (topic) => {
        if (topic.topicId == tid) {
          if (
            topic.likeId.includes(currentUser.uid) == false &&
            topic.dislikeId.includes(currentUser.uid) == false
          ) {
            const topicDoc = doc(db, "topics", tid);
            await updateDoc(topicDoc, {
              dislikeId: arrayUnion(currentUser.uid),
            });
            topic.dislikeIdCount++;
            setTopics((arr) => [...topics]);
          }
        }
      });
    }
  };
  const checkIsTeacher = () => {
    if (currentUser.role === "teacher") {
      return false;
    } else return true;
  };
  const setIconColor = (likeId, uId) => {
    if (likeId != null && likeId.includes(uId) == true) return "green";
    return "black";
  };
  const setUserIconColor = (user) => {
    if (currentUser.displayname == user) return "red";
    return "black";
  };
  return (
    <>
      <Sidebar>
        <h1 style={{ textAlign: "center" }}>
          Dashboard
                  <Menu style={{ padding: "10px 0" }}>
            {isNotStudentRole && (
              <QuizModal
                subjectOptions={subjectOptions}
                currentUser={currentUser}
              />
            )}
            {isNotStudentRole && <SubjectModal />}
            <QuestionModal subjectOptions={subjectOptions} />
          </Menu>
        </h1>

        <div>
          <Grid columns="three">
            {topics.map((topic) => {
              return (
                <Grid.Column key={topic.topicId}>
                  <Card
                    as={Link}
                    style={{ width: "99%" }}
                    to={`/topic/${topic.topicId}`}
                    header={
                      <>
                        <h2>
                          {topic.topicTitle}
                          {topic.haspinned == true && (
                            <Icon
                              name="check"
                              color="green"
                              style={{ display: "flex", float: "right" }}
                            />
                          )}
                        </h2>
                      </>
                    }
                    meta={topic.topicSubject}
                    extra={
                      <div>
                        <div>
                          <Icon
                            color={setUserIconColor(topic.user)}
                            name="user"
                          />
                          {topic.user}
                        </div>
                        <div>
                          <Button
                            onClick={(e) => handleLikeClick(e, topic.topicId)}
                          >
                            <Icon
                              color={setIconColor(
                                topic.likeId,
                                currentUser.uid
                              )}
                              name="thumbs up"
                            />
                            {topic.likeIdCount}
                          </Button>
                          <Button
                            onClick={(e) =>
                              handledisLikeClick(e, topic.topicId)
                            }
                          >
                            <Icon
                              color={setIconColor(
                                topic.dislikeId,
                                currentUser.uid
                              )}
                              name="thumbs down"
                            />
                            {topic.dislikeIdCount}
                          </Button>
                          <Button>
                            <Icon color="black" name="comment" />
                            {topic.comment}
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </Grid.Column>
              );
            })}
          </Grid>
        </div>
      </Sidebar>
    </>
  );
};

export default Dashboard;
