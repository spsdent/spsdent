import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import UpdateDoctor from './UpdateMain'
import DeleteDoctor from './DeleteUser'
import { clearMessage } from '../../../store/actions/message'
import {
  StyledButton,
  StyledContainer,
  StyledButtonContainer,
} from '../ControlPanelPageElements'

// tutaj jest glowny komponent odpowiedzialny za wyswietlanie mozliwosci 
// jesli wybralismy w pierwszym kroku zarzadzanie uzytkownikiem
// i tutaj na bazie tego co wybralismy wyswietlane sa kolejne mozliwosci albo modyfikowania albo usuwania

const DoctorsControl = () => {
  const [state, setState] = useState({
    updateDoctor: false,
    deleteDoctor: false,
  })
  const dispatch = useDispatch()

  const updateDoctorHandler = () => {
    setState({
      updateDoctor: !state.updateDoctor,
      deleteDoctor: false,
    })
    dispatch(clearMessage())
  }

  const deleteDoctorHandler = () => {
    setState({
      updateDoctor: false,
      deleteDoctor: !state.deleteDoctor,
    })
    dispatch(clearMessage())
  }

  const { updateDoctor, deleteDoctor } = state
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <StyledButton onClick={updateDoctorHandler} btnType={updateDoctor}>
          Modyfikuj
        </StyledButton>
        <StyledButton onClick={deleteDoctorHandler} btnType={updateDoctor}>
          Usuń
        </StyledButton>
      </StyledButtonContainer>
      {updateDoctor && <UpdateDoctor />}
      {deleteDoctor && <DeleteDoctor />}
    </StyledContainer>
  )
}

export default DoctorsControl
