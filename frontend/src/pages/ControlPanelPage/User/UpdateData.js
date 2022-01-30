import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../../services/user";

import { updateUserDataValidationSchema } from "../../../utils/validationSchemas";
import { clearMessage } from "../../../store/actions/message";
import { SET_MESSAGE } from "../../../store/actions/types";

import styled from "styled-components";
import {
  UserText,
  StyledField,
  ErrorText,
  StyledButton,
} from "../ControlPanelPageElements";
const StyledFormik = styled(Formik)`
  width: 100%;
  height: 100%;
`;

const UpdateUser = ({ setBtnType, selectedUser }) => {
  let initialState = {
    userId: "",
    imie: "",
    nazwisko: "",
    telefon: "",
    email: "",
    miasto: "",
    ulica: "",
    kodPocztowy: "",
  };
  const [user, setUser] = useState(initialState);
  const [userOld, setUserOld] = useState("");
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getAll()
      .then((response) => {
        const selectedUserData = response.data.filter(
          (user) => user._id === selectedUser
        )[0];
        const { imie, nazwisko, kodPocztowy, email, ulica, miasto, telefon } =
          selectedUserData;
        const obj = {
          imie,
          nazwisko,
          kodPocztowy,
          email,
          ulica,
          miasto,
          telefon,
        };
        setUser(obj);
        setUserOld(obj);
      })
      .catch((e) => console.log(e));
  }, [selectedUser]);

  const updateUser = (values) => {
    const { imie, nazwisko, email, telefon, kodPocztowy, miasto, ulica } =
      values;
    let userObj = {
      imie,
      nazwisko,
      telefon,
      email,
      kodPocztowy,
      miasto,
      ulica,
    };
    const equals = (a, b) => {
      if (a === b) return true;
      if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
      if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
        return a === b;
      if (a.prototype !== b.prototype) return false;
      const keys = Object.keys(a);
      if (keys.length !== Object.keys(b).length) return false;
      return keys.every((k) => equals(a[k], b[k]));
    };
    if (equals(userObj, userOld)) {
      dispatch({
        type: SET_MESSAGE,
        payload: "Musisz wprowadzic jakies zmiany",
      });
    } else {
      dispatch(clearMessage());
      UserService.updateUser(selectedUser, userObj)
        .then((response) => {
          setBtnType("");
          setUser({
            roles: [{}],
          });
          dispatch({
            type: SET_MESSAGE,
            payload: "Dane użytkownika zostały zaktualizowane!",
          });
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      {selectedUser && (
        <StyledFormik
          enableReinitialize={true}
          initialValues={user}
          validationSchema={updateUserDataValidationSchema}
          onSubmit={(values) => {
            updateUser(values);
          }}
        >
          {({ errors, touched, values, setValues }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <>
                <UserText title>Imię</UserText>
                <StyledField name="imie" placeholder="Imię" type="text" />
                {errors.imie && touched.imie ? (
                  <ErrorText>{errors.imie}</ErrorText>
                ) : null}
                <UserText title>Nazwisko</UserText>
                <StyledField
                  name="nazwisko"
                  type="text"
                  placeholder="Nazwisko"
                />
                {errors.nazwisko && touched.nazwisko ? (
                  <ErrorText>{errors.nazwisko}</ErrorText>
                ) : null}
                <UserText title>E-mail</UserText>
                <StyledField name="email" type="email" placeholder="E-mail" />
                {errors.email && touched.email ? (
                  <ErrorText>{errors.email}</ErrorText>
                ) : null}
                <UserText title>Telefon</UserText>
                <StyledField name="telefon" type="text" placeholder="Telefon" />
                {errors.telefon && touched.telefon ? (
                  <ErrorText>{errors.telefon}</ErrorText>
                ) : null}
                <UserText title>Miasto</UserText>
                <StyledField name="miasto" type="text" placeholder="Miasto" />
                {errors.miasto && touched.miasto ? (
                  <ErrorText>{errors.miasto}</ErrorText>
                ) : null}
                <UserText title>Ulica</UserText>
                <StyledField name="ulica" type="text" placeholder="Ulica" />
                {errors.ulica && touched.ulica ? (
                  <ErrorText>{errors.ulica}</ErrorText>
                ) : null}
                <UserText title>Kod pocztowy</UserText>
                <StyledField
                  name="kodPocztowy"
                  type="text"
                  placeholder="Kod pocztowy"
                />
                {errors.kodPocztowy && touched.kodPocztowy ? (
                  <ErrorText>{errors.kodPocztowy}</ErrorText>
                ) : null}
                <StyledButton type="submit">Aktualizuj dane</StyledButton>
              </>
            </Form>
          )}
        </StyledFormik>
      )}
    </>
  );
};

export default UpdateUser;
