import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {url} from "./App";

function Login () {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.replace("/")
        }
    }, [])

    const login = () => {
        const loginData = {
            "username": username,
            "password": password,
        }
        fetch(url + "/login/",
          {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json"
              },
            })
        .then(response => {
        if (response.ok) {
            response.json().then(
                data => {
                    localStorage.setItem("token", data.access);
                    localStorage.setItem("refreshToken", data.refresh);
                    window.location.replace("/");
                }
            )
        } else {
            response.text().then(text => console.log(text))
            alert("Error")
        }
        })
        .catch((err) => {console.log(err)})
    }

    return (
          <div style={
              {
                  margin: "3vw",
                  textAlign: "center",
              }}>
              <h1>
                  Tinder
              </h1>
              <form>
                <TextField
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                  color="secondary"
                  margin="normal"
                  autoComplete="username"
                />
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  color="secondary"
                  margin="normal"
                  autoComplete="current-password"
                />
                <Button
                    variant="contained"
                    onClick = {login}
                    color="secondary"
                    style={{
                        width: "-webkit-fill-available",
                        height: "5vh",
                        marginBottom: "2vh",
                        marginTop: "3vh"
                }}>
                  Login
                </Button>
                  <Link to="/register">
                    <Button
                        variant="outlined"
                        color="secondary"
                        style={{
                        width: "-webkit-fill-available",
                        height: "5vh",
                    }}>
                      Register
                    </Button>
                  </Link>
              </form>
          </div>
        );
    }

export default Login;
