import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import SignIn from "./components/sign-in/SignIn.jsx";
import About from "./components/about/About.jsx";
import Event from "./components/event/Event.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Players from "./components/players/Players.jsx";
import TournamentsInEventProvider from "./providers/TournamentsInEventProvider.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signUp" element={<SignUp />}></Route>
          <Route exact path="/signIn" element={<SignIn />}></Route>
          <Route exatc path="/players" element={<Players />}></Route>
          <Route exact path="/eventInfo/:id"
            element={
                <TournamentsInEventProvider>
                    <Event />
                </TournamentsInEventProvider>
            }
          ></Route>
          <Route
            exact
            path="/about"
            element={
              <ProtectedRoute allowedRoles="USER">
                <About />
              </ProtectedRoute>
            }
          ></Route>
            // TODO: PAGE NOT FOUND
          <Route exatc path="/*" ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
