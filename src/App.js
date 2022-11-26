import React from "react";
import Header from "./Header";
import TinderCards from "./TinderCards";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Matches from "./Chats";
import Login from "./Login";
import Register from "./Register";

const url = "http://127.0.0.1:8000/api"
const getHeaders = () => {
    const token = localStorage.getItem("token")
    if (!token) {window.location.replace("/login/")}
    return new Headers({
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
}
export {url, getHeaders}

function App() {
  const saveLocation = (pos) => {
    const data = {
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    }
    fetch(url + "/set-location/",
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: getHeaders(),
        }).catch(() => {})
  }

  const getLocation = () => {
    if (localStorage.getItem("token")) {
      navigator.geolocation.getCurrentPosition(saveLocation, console.log)
    }
  }
  getLocation()
  setInterval(getLocation, 60000)

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/matches">
            <Header backButton="/" />
            <Matches />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Header />
            <TinderCards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
