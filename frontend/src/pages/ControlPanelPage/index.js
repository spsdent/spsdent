import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'

import OptionsBtn from './OptionsBtn'
import NewDoctor from './NewDoctor'
import UpdateDoctor from './UpdateDoctor'

const ControlPanel = () => {
  const [addNewDoctor, setAddNewDoctor] = useState(false)
  const [updateDoctor, setUpdateDoctor] = useState(false)
  const [btnName, setBtnName] = useState('')
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
        <OptionsBtn
          addDoctor={addNewDoctor}
          updateDoctor={updateDoctor}
          onAdd={setAddNewDoctor}
          onUpdate={setUpdateDoctor}
        />
        {addNewDoctor && <NewDoctor />}
        {updateDoctor && <UpdateDoctor />}
      </div>
    </PageWrapper>
  )
}

export default ControlPanel
