import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { getHeaders, url } from './App'

const Matches = () => {
  const [people, setPeople] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.replace('/login/')
    }

    fetch(url + '/users/matches/', { headers: getHeaders() })
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((peopleData) => setPeople(peopleData))
        } else {
          resp.text().then((reason) => console.log(reason))
        }
      })
      .catch((reason) => console.log(reason))
  }, [])
  return (
    <div className='chats'>
      {people.map((person) => (
        <Chat
          key={person.id}
          name={person.full_name}
          contact={person.contact}
          distance={person.distance}
          profilePic={person.avatar}
        />
      ))}
    </div>
  )
}

export default Matches
