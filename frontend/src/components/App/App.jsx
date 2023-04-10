import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CurrentUserContext } from "../../context/CurrentUserContext";
import { api } from "../../utils/Api";

import Login from "../Login/Login";
import Register from "../Register/Register";
import PrivateLayout from "../PrivateLayout/PrivateLayout";
import Main from "../Main/Main";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUserInformation()
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
        localStorage.clear();
      });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInformation().then((user) => setCurrentUser(user));
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [loggedIn]);

  function handleRegistration(data) {
    api.registration(data).then((res) => {
      if (res.ok) {
        navigate("/signin");
      }
    });
  }
  function handleLogin({ email, password }) {
    api.authorization({ email, password }).then(() => setLoggedIn(true));
  }
  function handleLogout() {
    api.logout().then(() => {
      setCurrentUser(null);
      setLoggedIn(false);
      navigate("/signin");
      localStorage.clear();
    });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {!loggedIn ? (
            <>
              <Route
                path="/signup"
                element={
                  <Register onSubmit={handleRegistration} loggedIn={loggedIn} />
                }
              />
              <Route
                path="/signin"
                element={<Login onSubmit={handleLogin} loggedIn={loggedIn} />}
              />
            </>
          ) : null}

          <Route element={<PrivateLayout loggedIn={loggedIn} />}>
            <Route path="/" element={<Main onLogout={handleLogout} />} />
          </Route>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
