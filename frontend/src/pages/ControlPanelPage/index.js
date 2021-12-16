import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'

const ControlPanel = () => {
  const [addNewDoctor, setAddNewDoctor] = useState(false)
  const [updateDoctor, setUpdateDoctor] = useState(false)
  return (
    <PageWrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          backgroundColor: '#ddd',
          alignItems: 'center',
        }}
      >
        <h1>Control Panel</h1>
        <div style={{ display: 'flex' }}>
          <button
            onClick={() => {
              setAddNewDoctor(!addNewDoctor)
              setUpdateDoctor(false)
            }}
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
            onClick={() => {
              setUpdateDoctor(!updateDoctor)
              setAddNewDoctor(false)
            }}
            style={{
              width: '200px',
              height: '40px',
              border: updateDoctor ? 'none' : '2px solid #333',
              backgroundColor: updateDoctor ? '#01D4BF' : 'transparent',
              transition: '.2s',
              cursor: 'pointer',
            }}
          >
            Zmien dane lekarza
          </button>
        </div>
        {addNewDoctor && <h1>Dodaj nowego lekarza do bazy</h1>}
        {updateDoctor && <h1>Zmien dane lekarza</h1>}
      </div>
    </PageWrapper>
  )
}

export default ControlPanel
