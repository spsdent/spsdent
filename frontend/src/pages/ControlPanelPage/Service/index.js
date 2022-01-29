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

const StyledButtonNew = styled(StyledButton)`
  
  background-color: ${({ addNewService }) =>
    addNewService ? '#01D4BF' : 'transparent'};
`
const StyledButtonUpdate = styled(StyledButton)`
  
  background-color: ${({ updateService }) =>
    updateService ? '#01D4BF' : 'transparent'};
`

const StyledButtonDelete = styled(StyledButton)`
  
  background-color: ${({ deleteService }) =>
    deleteService ? '#01D4BF' : 'transparent'};
`

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
        <StyledButtonNew
          onClick={addNewServiceHandler}
          addNewService={addNewService}
        >
          Utwórz
        </StyledButtonNew>
        <StyledButtonUpdate
          onClick={updateServiceHandler}
          updateService={updateService}
        >
          Aktualizuj
        </StyledButtonUpdate>
        <StyledButtonDelete
          onClick={deleteServiceHandler}
          deleteService={deleteService}
        >
          Usuń
        </StyledButtonDelete>
      </StyledButtonContainer>
      {addNewService && <NewService />}
      {updateService && <UpdateService />}
      {deleteService && <DeleteService />}
    </StyledContainer>
  )
}

export default ServicesControl
