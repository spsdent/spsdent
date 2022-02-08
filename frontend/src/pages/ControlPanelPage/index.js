import React, { useState } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import DoctorsControl from './User'
import ServicesControl from './Service'
import {
  StyledButton,
  StyledContainer,
  StyledHeading,
  StyledButtonContainer,
} from './ControlPanelPageElements'

// jest to glowny komponent wyswietlajacy przyciski zarzadzaj uzytkownikami i specjalizacjami
// na podstawie kliknietego przycisku zmienia sie wartosc stanu btnType na podstawie ktorego sa wyswietlane dalsze
// mozliwosci zarzadzania


const ControlPanel = () => {
  const [btnType, setBtnType] = useState('')
  return (
    <PageWrapper>
      <StyledContainer>
        <StyledHeading>Panel zarządzania</StyledHeading>
        <StyledButtonContainer>
          <StyledButton
            btnType={btnType}
            onClick={() => {
              if (btnType === 'doctor') {
                setBtnType('')
              } else {
                setBtnType('doctor')
              }
            }}
          >
            Zarządzaj użytkownikami
          </StyledButton>
          <StyledButton
            btnType={btnType}
            onClick={() => {
              if (btnType === 'service') {
                setBtnType('')
              } else {
                setBtnType('service')
              }
            }}
          >
            Zarządzaj specjalizacjami
          </StyledButton>
        </StyledButtonContainer>
        {btnType === 'doctor' && <DoctorsControl btnType={btnType} />}
        {btnType === 'service' && <ServicesControl btnType={btnType} />}
      </StyledContainer>
    </PageWrapper>
  )
}

export default ControlPanel
