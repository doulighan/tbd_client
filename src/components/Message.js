import React from 'react'

const Message = ({message}) => {
  return (
    <div>
      <p> {message.message}</p>
    </div>
  )
}

export default Message