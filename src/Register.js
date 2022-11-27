import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import {url} from "./App";

function Register () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [locationData, setLocation] = useState(null);
    const [fullName, setFullName] = useState("");
    const [avatarLink, setAvatarLink] = useState("");
    const [contact, setContact] = useState("");

    const saveLocation = (pos) => {
        setLocation({
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
        })
    }

    const getUserLocation = useCallback(() => {
        navigator.geolocation.getCurrentPosition(saveLocation, console.log)
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.replace("/")
        }

        getUserLocation()

    }, [getUserLocation])

    const registration = () => {
        const profileData = {
            username,
            password,
            full_name: fullName,
            avatar: avatarLink,
            contact,
        }
        fetch(url + "/register/",
            {
                method: "POST",
                body: JSON.stringify({...profileData, ...locationData}),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then(response => {
              if (response.ok) {
                response.json()
                    .then(
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
              margin="normal"
              autoComplete="current-password"
          />
            <TextField
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                color="secondary"
                margin="normal"
                autoComplete="name"
            />
            <TextField
                id="contact"
                type="text"
                name="contact"
                placeholder="Enter your contact (e.g.: inst: @tinder)"
                onChange={(e) => setContact(e.target.value)}
                fullWidth
                color="secondary"
                margin="normal"
                autoComplete="off"
            />
            <TextField
                id="avatar"
                type="text"
                name="avatar"
                placeholder="Enter your photo URL"
                onChange={(e) => setAvatarLink(e.target.value)}
                fullWidth
                color="secondary"
                margin="normal"
                autoComplete="url"
            />
            <TextField
                id="locationText"
                type="text"
                name="location"
                placeholder="Your location"
                fullWidth
                color="secondary"
                margin="normal"
                disabled
                value={locationData ? `${locationData.latitude}, ${locationData.longitude}` : "Click here to get location"}
                onClick={getUserLocation}
            />
          <Button
              variant="contained"
              onClick = {registration}
              color="secondary"
              fullWidth
              style={{
                height: "5vh",
                marginBottom: "2vh",
                marginTop: "3vh"
              }}>
            Register
          </Button>
          <Link to="/login">
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                style={{
                  height: "5vh",
                }}>
              Login
            </Button>
          </Link>
        </form>
      </div>
  );
}

export default Register;
