import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import NewService from './Create'
import DeleteService from './Delete'
import UpdateService from './Update'
import { clearMessage } from '../../../store/actions/message'
import styled from 'styled-components'
import {
  StyledButton,
  StyledContainer,
  StyledButtonContainer,
} from '../ControlPanelPageElements'

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
    <StyledContainer>
      <StyledButtonContainer>
        <StyledButton
          onClick={addNewServiceHandler}
          addNewService={addNewService}
        >
          Utwórz
        </StyledButton>
        <StyledButton
          onClick={updateServiceHandler}
          updateService={updateService}
        >
          Aktualizuj
        </StyledButton>
        <StyledButton
          onClick={deleteServiceHandler}
          deleteService={deleteService}
        >
          Usuń
        </StyledButton>
      </StyledButtonContainer>
      {addNewService && <NewService />}
      {updateService && <UpdateService />}
      {deleteService && <DeleteService />}
    </StyledContainer>
  )
}

export default ServicesControl
