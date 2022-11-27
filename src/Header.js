import React from 'react'
import './Header.css'
import PersonIcon from '@material-ui/icons/Person'
import ForumIcon from '@material-ui/icons/Forum'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { Link, useHistory } from 'react-router-dom'
import LoyaltyIcon from '@material-ui/icons/Loyalty'

function Header ({ backButton }) {
  const history = useHistory()
  return (
    <div className='header'>
      {backButton
        ? (
          <IconButton onClick={() => history.replace(backButton)}>
            <ArrowBackIosIcon className='header__icon' fontSize='large' />
          </IconButton>
          )
        : (
          <IconButton
            onClick={() => {
              localStorage.clear()
              window.location.replace('/login')
            }}
          >
            <PersonIcon className='header__icon' fontSize='large' />
          </IconButton>
          )}
      <Link to='/'>
        <img
          className='header__logo'
          src='https://w7.pngwing.com/pngs/698/493/png-transparent-tinder-hd-logo-thumbnail.png'
          alt='tinder logo'
        />
      </Link>
      {backButton
        ? (
          <IconButton style={{ opacity: '0' }}>
            <ForumIcon className='header__icon' fontSize='large' />
          </IconButton>
          )
        : (
          <Link to='/matches'>
            <IconButton>
              <LoyaltyIcon className='header__icon' fontSize='large' />
            </IconButton>
          </Link>
          )}
    </div>
  )
}

export default Header
