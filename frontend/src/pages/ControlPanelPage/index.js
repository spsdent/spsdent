import React, { useState } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import DoctorsControl from './DoctorsControl'
import ServicesControl from './ServicesControl'

const ControlPanel = () => {
  const [btnType, setBtnType] = useState('')
  return (
    <PageWrapper>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Panel zarzadzania</h1>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <button
            onClick={() => {
              if (btnType === 'doctor') {
                setBtnType('')
              } else {
                setBtnType('doctor')
              }
            }}
            style={{
              width: '200px',
              height: '40px',
              border: btnType === 'doctor' ? 'none' : '2px solid #333',
              backgroundColor: btnType === 'doctor' ? '#01D4BF' : 'transparent',
              marginRight: '5px',
              cursor: 'pointer',
              transition: '.2s',
            }}
          >
            Zarzadzaj uzytkownikami
          </button>
          <button
            onClick={() => {
              if (btnType === 'service') {
                setBtnType('')
              } else {
                setBtnType('service')
              }
            }}
            style={{
              width: '200px',
              height: '40px',
              border: btnType === 'service' ? 'none' : '2px solid #333',
              backgroundColor:
                btnType === 'service' ? '#01D4BF' : 'transparent',
              marginRight: '5px',
              cursor: 'pointer',
              transition: '.2s',
            }}
          >
            Zarzadzaj specjalizacjami
          </button>
        </div>
        {btnType === 'doctor' && <DoctorsControl btnType={btnType} />}
        {btnType === 'service' && <ServicesControl btnType={btnType} />}
      </div>
    </PageWrapper>
  )
}

export default ControlPanel
