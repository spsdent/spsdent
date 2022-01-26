import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import NewDoctor from './NewDoctor'
import UpdateDoctor from './UpdateMain'
import DeleteDoctor from './DeleteUser'
import { PageWrapper } from '../../../components/PageWrapper'
import { clearMessage } from '../../../store/actions/message'
import styled from 'styled-components'
const StyledContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`

const StyledButton = styled.button`
  padding: 0.35rem 1rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #01d4bf;
    border: none;
  }
`

const StyledButtonUpdate = styled(StyledButton)`
  border: ${({ btnType }) => (btnType ? 'none' : '2px solid #333')};
  background-color: ${({ btnType }) => (btnType ? '#01D4BF' : 'transparent')};
`
const StyledButtonDelete = styled(StyledButton)`
  border: ${({ btnType }) =>
    btnType === 'service' ? 'none' : '2px solid #333'};
  background-color: ${({ btnType }) =>
    btnType === 'service' ? '#01D4BF' : 'transparent'};
`

const DoctorsControl = () => {
  const [state, setState] = useState({
    // addNewDoctor: false,
    updateDoctor: false,
    deleteDoctor: false,
  })
  const dispatch = useDispatch()

  // const addNewDoctorHandler = () => {
  //   setState({
  //     addNewDoctor: !state.addNewDoctor,
  //     updateDoctor: false,
  //     deleteDoctor: false,
  //   })
  // }

  const updateDoctorHandler = () => {
    setState({
      // addNewDoctor: false,
      updateDoctor: !state.updateDoctor,
      deleteDoctor: false,
    })
    dispatch(clearMessage())
  }

  const deleteDoctorHandler = () => {
    setState({
      // addNewDoctor: false,
      updateDoctor: false,
      deleteDoctor: !state.deleteDoctor,
    })
    dispatch(clearMessage())
  }

  const { updateDoctor, deleteDoctor } = state
  return (
    <PageWrapper>
      <StyledContainer>
        <StyledButtonContainer>
          <StyledButtonUpdate
            onClick={updateDoctorHandler}
            btnType={updateDoctor}
          >
            Modyfikuj
          </StyledButtonUpdate>
          <StyledButtonDelete
            onClick={deleteDoctorHandler}
            btnType={updateDoctor}
          >
            Usun
          </StyledButtonDelete>
        </StyledButtonContainer>
        {/* {addNewDoctor && <NewDoctor />} */}
        {updateDoctor && <UpdateDoctor />}
        {deleteDoctor && <DeleteDoctor />}
      </StyledContainer>
    </PageWrapper>
  )
}

export default DoctorsControl
