import React from 'react'

const OptionsBtn = ({ addDoctor, updateDoctor, onAdd, onUpdate, name }) => {
  const addHandler = () => {
    onAdd(!addDoctor)
    onUpdate(false)
  }

  const updateHandler = () => {
    onUpdate(!updateDoctor)
    onAdd(false)
  }

  return (
    <div style={{ display: 'flex' }}>
      <button
        onClick={addHandler}
        style={{
          width: '200px',
          height: '40px',
          border: addDoctor ? 'none' : '2px solid #333',
          backgroundColor: addDoctor ? '#01D4BF' : 'transparent',
          marginRight: '5px',
          cursor: 'pointer',
          transition: '.2s',
        }}
      >
        Dodaj lekarza
      </button>
      <button
        onClick={updateHandler}
        style={{
          width: '200px',
          height: '40px',
          border: updateDoctor ? 'none' : '2px solid #333',
          backgroundColor: updateDoctor ? '#01D4BF' : 'transparent',
          marginRight: '5px',
          cursor: 'pointer',
          transition: '.2s',
        }}
      >
        Zmien dane lekarza
      </button>
    </div>
  )
}

export default OptionsBtn
