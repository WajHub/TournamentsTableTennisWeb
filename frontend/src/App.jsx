import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import SignIn from "./components/sign-in/SignIn.jsx";
import About from "./components/about/About.jsx";
import Event from "./components/event/Event.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Players from "./components/players/Players.jsx";
import TournamentsInEventProvider from "./providers/TournamentsInEventProvider.jsx";
import PageNotFound from "./components/pageNotFound/pageNotFound.jsx";
import ConfirmEmail from "./components/confirmEmail/ConfirmEmail.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";

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
          <Route exact path="/confirm_email" element={<ConfirmEmail />}></Route>
          <Route exact path="/reset_password" element={<ResetPassword />}></Route>
          <Route exatc path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
