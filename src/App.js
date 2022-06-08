import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { Registration } from "./components/Registration";
import { useUserContext } from "./context/userContext";
import { PrivateRoute } from "./PrivateRoute";
import { Topic } from "./components/Topic/Topic";
import { Quizzes } from "./components/Quizzes/Quizzes";
import { Quiz } from "./components/Quizzes/Quiz";
import {Profile} from "./components/User/Profile"
import {History} from "./components/History/History"
function App() {
  const { currentUser } = useUserContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/topic/:topicId"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <Topic />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizzes"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:subject"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute redirectPath="/" user={currentUser}>
              <History />
            </PrivateRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;
