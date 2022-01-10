import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import NewService from './Create'
import DeleteService from './Delete'
import UpdateService from './Update'
import { clearMessage } from '../../../store/actions/message'

const ServicesControl = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    addNewService: false,
    deleteService: false,
    updateService: false,
  })

  const addNewServiceHandler = () => {
    setState({
      addNewService: !state.addNewService,
      deleteService: false,
      updateService: false,
    })
    dispatch(clearMessage())
  }

  const deleteServiceHandler = () => {
    setState({
      addNewService: false,
      deleteService: !state.deleteService,
      updateService: false,
    })
    dispatch(clearMessage())
  }

  const updateServiceHandler = () => {
    setState({
      addNewService: false,
      deleteService: false,
      updateService: !state.updateService,
    })
    dispatch(clearMessage())
  }

  const { addNewService, deleteService, updateService } = state
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
          Utworz
        </button>
        <button
          onClick={updateServiceHandler}
          style={{
            width: '200px',
            height: '40px',
            border: updateService ? 'none' : '2px solid #333',
            backgroundColor: updateService ? '#01D4BF' : 'transparent',
            marginRight: '5px',
            cursor: 'pointer',
            transition: '.2s',
          }}
        >
          Aktualizuj
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
          Usun
        </button>
      </div>
      {addNewService && <NewService />}
      {updateService && <UpdateService />}
      {deleteService && <DeleteService />}
    </>
  )
}

export default ServicesControl
