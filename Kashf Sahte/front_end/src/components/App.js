import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import Detection from "./Detection";
import Subscription from "./Sub";
import Navbar from "./Navbar_Original.jsx";
import PrivateRoute from "./PrivateRoute";
import LocateSource from "./LocateSource.jsx"
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import DetectionVideo from "./DetectionVideo";
import Success from "./SuccessPage";
import Converter from "./Converter.jsx"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Switch,
  Navigate,
} from "react-router-dom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const user = localStorage.getItem("token");

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <div>
        <Routes>
          {user && <Route path="/" exact element={<Home />} />}
          {user && <Route path="/audioConverter" exact element={<Converter />} />}
          {user && <Route path="/detection" exact element={<Detection/>} />}
          {user && (
            <Route path="/detection_video" exact element={<DetectionVideo />} />
          )}
          {user && <Route path="/about" exact element={<About />} />}
          {user && <Route path="/success" exact element={<Success />} />}
          {user && <Route path="/locatesource" exact element={<LocateSource/>}></Route>}
          {user && <Route path="/home" exact element={<Home />} />}
          {user && (
            <Route path="/subscription" exact element={<Subscription />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/detection" element={<Detection />} /> */}

          {/* <PrivateRoute
            path="/detection"
            authenticated={user}
            element={<Detection />}
          />

  <Route exact path='/detection' element={<PrivateRoute/>}>
        <Route exact path='/' element={<Detection/>}/>
  </Route>

          <PrivateRoute
            path="/subscription"
            authenticated={user}
            element={<Subscription />}
          />
          <PrivateRoute path="/about" authenticated={user} element={<About />} /> */}
          {/* 
          <Route path="/subscription" element={<Subscription />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/" element={<Navigate replace to="/Login" />} />
          <Route path="/audioCoverter" element={<Navigate replace to="/Login" />} />
          <Route path="/detection" element={<Navigate replace to="/Login" />} />
          <Route
            path="/detection_video"
            element={<Navigate replace to="/Login" />}
          />
          <Route path="/home" element={<Navigate replace to="/Login" />} />
          <Route path="/about" element={<Navigate replace to="/Login" />} />
          <Route path="/success" element={<Navigate replace to="/Login" />} />
          <Route
            path="/subscription"
            element={<Navigate replace to="/Login" />}
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
