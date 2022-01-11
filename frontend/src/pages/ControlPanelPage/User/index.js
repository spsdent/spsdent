import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import NewDoctor from './NewDoctor'
import UpdateDoctor from './UpdateMain'
import DeleteDoctor from './DeleteUser'
import { PageWrapper } from '../../../components/PageWrapper'
import { Container } from '../../ProfilePage/ProfilePageElements'
import { clearMessage } from '../../../store/actions/message'

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
      <Container>
        <div style={{ display: 'flex' }}>
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
            Modyfikuj
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
            Usun
          </button>
        </div>
        {/* {addNewDoctor && <NewDoctor />} */}
        {updateDoctor && <UpdateDoctor />}
        {deleteDoctor && <DeleteDoctor />}
      </Container>
    </PageWrapper>
  )
}

export default DoctorsControl
