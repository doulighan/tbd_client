import React from 'react'

const Message = ({message}) => {
  return (
    <div>
      <h4>{message.player}</h4>
      <p>   {message.message}</p>
    </div>
  )
}

export default Message