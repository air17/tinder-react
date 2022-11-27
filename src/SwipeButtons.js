import React, { Component } from 'react'
import './SwipeButtons.css'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'

class SwipeButtons extends Component {
  render () {
    return (
      <div className='swipeButtons'>
        <IconButton className='swipeButtons__left' onClick={this.props.left}>
          <CloseIcon fontSize='large' />
        </IconButton>
        <IconButton
          className='swipeButtons__repeat'
          onClick={this.props.middle}
        >
          <ReplayIcon fontSize='large' />
        </IconButton>
        <IconButton className='swipeButtons__right' onClick={this.props.right}>
          <FavoriteIcon fontSize='large' />
        </IconButton>
      </div>
    )
  }
}

export default SwipeButtons
