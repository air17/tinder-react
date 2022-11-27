import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'
import { getHeaders, url } from './App'

function TinderCards () {
  const [people, setPeople] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.replace('/login')
    }

    fetch(url + '/users/', { headers: getHeaders() })
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((data) => setPeople(data))
        } else {
          resp.text().then((reason) => console.log(reason))
        }
      })
      .catch((reason) => console.log(reason))
  }, [])

  // const swipe = async (dir="right") => {
  //     // await childRefs[currentIndex].current.swipe(dir)
  //     console.log("yes " + dir)
  // }
  //
  // const goBack = async () => {
  //     // await childRefs[newIndex].current.restoreCard()
  //     console.log("back")
  // }

  const swiped = (direction, id) => {
    if (direction === 'right') {
      fetch(url + `/users/${id}/like/`, {
        method: 'PUT',
        headers: getHeaders()
      }).catch(() => {})
    } else {
      fetch(url + `/users/${id}/dislike/`, {
        method: 'PUT',
        headers: getHeaders()
      }).catch(() => {})
    }
  }

  return (
    <div>
      <div className='tinderCards__cardContainer'>
        {people.map((person, index) => (
          <TinderCard
            className='swipe'
            key={person.id}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.id)}
          >
            <div
              style={{
                backgroundImage: `url(${person.avatar})`,
                textShadow:
                  '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
              }}
              className='card'
            >
              <h3>{person.full_name}</h3>
              <h4 style={{ color: 'white' }}>{person.distance} km</h4>
            </div>
          </TinderCard>
        ))}
      </div>
      {/* <SwipeButtons right={swipe} left={swipe} middle={goBack}/> */}
    </div>
  )
}

export default TinderCards
