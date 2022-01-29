import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import NewDoctor from './NewDoctor'
import UpdateDoctor from "./UpdateMain";
import DeleteDoctor from "./DeleteUser";
import { PageWrapper } from "../../../components/PageWrapper";
import { clearMessage } from "../../../store/actions/message";
import styled from "styled-components";
import {StyledButton, StyledContainer, StyledButtonContainer} from '../ControlPanelPageElements';

const DoctorsControl = () => {
  const [state, setState] = useState({
    // addNewDoctor: false,
    updateDoctor: false,
    deleteDoctor: false,
  });
  const dispatch = useDispatch();

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
    });
    dispatch(clearMessage());
  };

  const deleteDoctorHandler = () => {
    setState({
      // addNewDoctor: false,
      updateDoctor: false,
      deleteDoctor: !state.deleteDoctor,
    });
    dispatch(clearMessage());
  };

  const { updateDoctor, deleteDoctor } = state;
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <StyledButton
          onClick={updateDoctorHandler}
          btnType={updateDoctor}
        >
          Modyfikuj
        </StyledButton>
        <StyledButton
          onClick={deleteDoctorHandler}
          btnType={updateDoctor}
        >
          Usuń
        </StyledButton>
      </StyledButtonContainer>
      {/* {addNewDoctor && <NewDoctor />} */}
      {updateDoctor && <UpdateDoctor />}
      {deleteDoctor && <DeleteDoctor />}
    </StyledContainer>
  );
};

export default DoctorsControl;
