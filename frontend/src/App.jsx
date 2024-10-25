import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Other/Navbar.jsx";
import SignIn from "./pages/SignIn.jsx";
import About from "./pages/About.jsx";
import Event from "./pages/Event.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Players from "./pages/Players.jsx";

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
