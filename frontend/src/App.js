import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import SignUp from "./pages/SignUp.js";
import Navbar from "./components/Navbar.js";
import SignIn from "./pages/SignIn.js";
import About from "./pages/About.js";
import Event from "./pages/Event.js";
import ProtectedRoute from "./auth/ProtectedRoute.js";
import Players from "./pages/Players.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signUp" element={<SignUp />}></Route>
          <Route exact path="/signIn" element={<SignIn />}></Route>
          <Route
            exact
            path="/about"
            element={
              <ProtectedRoute allowedRoles="USER">
                <About />
              </ProtectedRoute>
            }
          ></Route>
          <Route exatc path="/eventInfo/:id" element={<Event />}></Route>
          <Route exatc path="/players" element={<Players />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
