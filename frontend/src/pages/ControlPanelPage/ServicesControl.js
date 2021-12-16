import React, { useState } from 'react'

import NewService from './NewService'
import DeleteService from './DeleteService'

const ServicesControl = () => {
  const [state, setState] = useState({
    addNewService: false,
    deleteService: false,
  })

  const addNewServiceHandler = () => {
    setState({
      addNewService: !state.addNewService,
      deleteService: false,
    })
  }

  const deleteServiceHandler = () => {
    setState({
      addNewService: false,
      deleteService: !state.deleteService,
    })
  }

  const { addNewService, deleteService } = state
  return (
    <>
      <div style={{ display: 'flex' }}>
        <button
          onClick={addNewServiceHandler}
          style={{
            width: '200px',
            height: '40px',
            border: addNewService ? 'none' : '2px solid #333',
            backgroundColor: addNewService ? '#01D4BF' : 'transparent',
            marginRight: '5px',
            cursor: 'pointer',
            transition: '.2s',
          }}
        >
          Dodaj specjalnosc
        </button>
        <button
          onClick={deleteServiceHandler}
          style={{
            width: '200px',
            height: '40px',
            border: deleteService ? 'none' : '2px solid #333',
            backgroundColor: deleteService ? '#01D4BF' : 'transparent',
            marginRight: '5px',
            cursor: 'pointer',
            transition: '.2s',
          }}
        >
          Usun specjalnosc
        </button>
      </div>
      {addNewService && <NewService />}
      {deleteService && <DeleteService />}
    </>
  )
}

export default ServicesControl
