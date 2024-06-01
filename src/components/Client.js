import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
  return (
    <div className="Client">
        <Avatar name={username} size="60" round={true} />
        <span className="userName">{username}</span>
    </div>
  )
}

export default Client