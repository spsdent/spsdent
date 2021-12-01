import React, { useState, useEffect } from 'react'

import UserService from '../services/user'

const BoardSpec = () => {
  const [content, setContent] = useState('')

  useEffect(() => {
    UserService.getSpecBoard().then(
      (response) => {
        setContent(response.data)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setContent(_content)
      }
    )
  }, [])

  return (
    <div>
      <header>
        <h3>{content}</h3>
      </header>
    </div>
  )
}

export default BoardSpec
