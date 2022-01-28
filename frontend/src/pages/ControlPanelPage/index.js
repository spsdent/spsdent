import React, { useState } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import DoctorsControl from './User'
import ServicesControl from './Service'
import styled from 'styled-components'
import {
  StyledButton,
  StyledContainer,
  StyledHeading,
  StyledButtonContainer,
} from './ControlPanelPageElements'

const StyledButtonDoctor = styled(StyledButton)`
  /* border: ${({ btnType }) =>
    btnType === 'doctor' ? 'none' : '2px solid #333'};
  background-color: ${({ btnType }) =>
    btnType === 'doctor' ? '#01D4BF' : 'transparent'}; */
`
const StyledButtonService = styled(StyledButton)`
  /* border: ${({ btnType }) =>
    btnType === 'service' ? 'none' : '2px solid #333'};
  background-color: ${({ btnType }) =>
    btnType === 'service' ? '#01D4BF' : 'transparent'}; */
`

const ControlPanel = () => {
  const [btnType, setBtnType] = useState('')
  return (
    <PageWrapper>
      <StyledContainer>
        <StyledHeading>Panel zarządzania</StyledHeading>
        <StyledButtonContainer>
          <StyledButtonDoctor
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
          </StyledButtonDoctor>
          <StyledButtonService
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
          </StyledButtonService>
        </StyledButtonContainer>
        {btnType === 'doctor' && <DoctorsControl btnType={btnType} />}
        {btnType === 'service' && <ServicesControl btnType={btnType} />}
      </StyledContainer>
    </PageWrapper>
  )
}

export default ControlPanel
