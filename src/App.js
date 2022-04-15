import {Routes, Route} from "react-router-dom"
import{ Registration} from "./components/Registration"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
