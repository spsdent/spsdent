import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserService from "../../../services/user";
import UpdatePermissions from "./UpdatePermissions";
import UpdateData from "./UpdateData";
import { clearMessage } from "../../../store/actions/message";

import {
  StyledButton,
  StyledContainer,
  StyledButtonContainer,
  SubTitle,
  ErrorText,
  StyledSelect
} from "..//ControlPanelPageElements";

// tutaj jest komponent ktory wyswietla fomularz do wyboru uzytkownika i po wyborze uzytkownika
// daje dwa kolejne przyciski do wyboru albo modyfikacji danych albo zmiany uprawnien

const UpdateUser = (props) => {
  const [usersArr, setUsersArr] = useState([]);
  const [btnType, setBtnType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const { isRefresh } = useSelector((state) => state.refresh);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveUsers();
  }, [isRefresh]);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsersArr(response.data);
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
        placeholder="Wybierz"
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
        <StyledButtonContainer primary>
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
