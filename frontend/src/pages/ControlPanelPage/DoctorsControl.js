import React, { useState } from 'react'
import NewDoctor from './NewDoctor'
import UpdateDoctor from './UpdateDoctor'
import DeleteDoctor from './DeleteDoctor'

const DoctorsControl = () => {
  const [state, setState] = useState({
    addNewDoctor: false,
    updateDoctor: false,
    deleteDoctor: false,
  })

  const addNewDoctorHandler = () => {
    setState({
      addNewDoctor: !state.addNewDoctor,
      updateDoctor: false,
      deleteDoctor: false,
    })
  }

  const updateDoctorHandler = () => {
    setState({
      addNewDoctor: false,
      updateDoctor: !state.updateDoctor,
      deleteDoctor: false,
    })
  }

  const deleteDoctorHandler = () => {
    setState({
      addNewDoctor: false,
      updateDoctor: false,
      deleteDoctor: !state.deleteDoctor,
    })
  }

  const { addNewDoctor, updateDoctor, deleteDoctor } = state
  return (
    <>
      <div style={{ display: 'flex' }}>
        <button
          onClick={addNewDoctorHandler}
          style={{
            width: '200px',
            height: '40px',
            border: addNewDoctor ? 'none' : '2px solid #333',
            backgroundColor: addNewDoctor ? '#01D4BF' : 'transparent',
            marginRight: '5px',
            cursor: 'pointer',
            transition: '.2s',
          }}
        >
          Dodaj lekarza
        </button>
        <button
          onClick={updateDoctorHandler}
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
        <button
          onClick={deleteDoctorHandler}
          style={{
            width: '200px',
            height: '40px',
            border: deleteDoctor ? 'none' : '2px solid #333',
            backgroundColor: deleteDoctor ? '#01D4BF' : 'transparent',
            marginRight: '5px',
            cursor: 'pointer',
            transition: '.2s',
          }}
        >
          Usun lekarza
        </button>
      </div>
      {addNewDoctor && <NewDoctor />}
      {updateDoctor && <UpdateDoctor />}
      {deleteDoctor && <DeleteDoctor />}
    </>
  )
}

export default DoctorsControl
