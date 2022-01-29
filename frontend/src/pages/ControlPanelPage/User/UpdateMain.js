import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import DoctorService from "../../../services/doctor";
import UserService from "../../../services/user";
import RoleService from "../../../services/role";
import ServiceData from "../../../services/service";
import UpdatePermissions from "./UpdatePermissions";
import UpdateData from "./UpdateData";
import { clearMessage } from "../../../store/actions/message";
import styled from "styled-components";
import {
  StyledButton,
  StyledContainer,
  StyledButtonContainer,
  SubTitle,
  ErrorText,
} from "..//ControlPanelPageElements";

const StyledSelect = styled(Select)`
  width: 100%;
`;

const UpdateUser = (props) => {
  let initialState = {
    userId: "",
    imie: "",
    nazwisko: "",
    telefon: "",
    email: "",
    miasto: "",
    ulica: "",
    kodPocztowy: "",
    roles: [{}],
    doctorId: "",
    specjalnosci: [],
    godzinyStart: "",
    godzinyKoniec: "",
  };
  const [doctorsArr, setDoctorsArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [rolesArr, setRolesArr] = useState([]);
  const [specsArr, setSpecsArr] = useState([]);
  const [btnType, setBtnType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { isRefresh } = useSelector((state) => state.refresh);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveUsers();
    retrieveDoctors();
    retrieveRoles();
    retrieveSpecs();
  }, [isRefresh]);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsersArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const retrieveDoctors = () => {
    DoctorService.getAll()
      .then((response) => {
        setDoctorsArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const retrieveRoles = () => {
    RoleService.getAll()
      .then((response) => {
        setRolesArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const retrieveSpecs = () => {
    ServiceData.getAll()
      .then((response) => {
        setSpecsArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const onDataChange = (type, userInfo) => {
    if (btnType === type) {
      setBtnType("");
    } else {
      setBtnType(type);
    }
  };

  return (
    <StyledContainer>
      <SubTitle>Wybierz użytkownika</SubTitle>
      <StyledSelect
        isClearable
        defaultValue={selectedUser}
        onChange={(value) => {
          setSelectedUser(value);
          if (!value) {
            setBtnType("");
          }
        }}
        options={usersArr.map((user) => ({
          value: user._id,
          label: `${user.imie} ${user.nazwisko}`,
        }))}
      />
      {selectedUser && (
        <StyledButtonContainer>
          <StyledButton
            btnType={btnType}
            onClick={() => {
              dispatch(clearMessage());
              onDataChange("dane");
            }}
          >
            Zmień dane
          </StyledButton>
          <StyledButton
            btnType={btnType}
            onClick={() => {
              dispatch(clearMessage());
              onDataChange("uprawnienia");
            }}
          >
            Zmień uprawnienia
          </StyledButton>
        </StyledButtonContainer>
      )}
      {message && <ErrorText>{message}</ErrorText>}
      {btnType === "dane" && (
        <UpdateData
          setBtnType={setBtnType}
          selectedUser={selectedUser && selectedUser.value}
        />
      )}
      {btnType === "uprawnienia" && (
        <UpdatePermissions
          setBtnType={setBtnType}
          selectedUser={selectedUser && selectedUser.value}
        />
      )}
    </StyledContainer>
  );
};

export default UpdateUser;
