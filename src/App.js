import "./App.css";
import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import MyNotebooks from "./Components/MyNotebooks/MyNotebooks";
import Todo from "./Components/Todo/Todo";
import LandingPage from "./Components/LandingPage/LandingPage";
import Loader from "./Components/Loader/Loader";


const App = () => {

  //------------------------ STATES ----------------------------------
  const [user, setUser] = useState({});
  const [route, setRoute] = useState("landing");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [subRoute, setSubRoute] = useState('');
  const [loading, setLoading] = useState(false);

  

//------------------------- SETTING STATES --------------------------------
  const onRouteChange = (routeReceived) => {
    if (routeReceived === "signout") {
      setIsSignedIn(false);
    } else if (routeReceived === "home") {
      setIsSignedIn(true);
      setSubRoute("Notebooks");
      setRoute("home");
    }
    setRoute(routeReceived);
  };

  const onSetLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const loadUser = (receivedUser) => {
    setUser(receivedUser);
  };

 //------------------------------------- RETURN --------------------------------------------
  return (
    <div className="container">
      {loading && <Loader />}

      <div className="navigation">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={onRouteChange}
          setSubRoute={setSubRoute}
          subRoute={subRoute}
        />
      </div>
      <div className="main">
        {route === "landing" ? (
          <LandingPage onRouteChange={onRouteChange} />
        ) : route === "home" ? (
          subRoute === "Notebooks" ? (
            <MyNotebooks
              where={subRoute}
              user={user}
              onSetLoading={onSetLoading}
            />
          ) : (
            <Todo where={subRoute} user={user} onSetLoading={onSetLoading} />
          )
        ) : (
          <div>
            {route === "signin" ? (
              <SignIn
                onRouteChange={onRouteChange}
                loadUser={loadUser}
                onSetLoading={onSetLoading}
              />
            ) : (
              <Register
                onRouteChange={onRouteChange}
                loadUser={loadUser}
                route={route}
                onSetLoading={onSetLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
