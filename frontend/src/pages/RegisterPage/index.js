import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageWrapper } from "../../components/PageWrapper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../store/actions/auth";
import { signupValidationSchema } from "../../utils/validationSchemas";
import { clearMessage } from "../../store/actions/message";

import {
  Title,
  FormButton,
  FormColumn,
  FormContainer,
  FormError,
  FormInput,
} from "../AddVisitPage/AddVisitPageElements";
import {
  UserText,
  StyledField,
  ErrorText,
  StyledButton,
} from "../ControlPanelPage/ControlPanelPageElements";
import {
  ModalShadow,
  ModalContainer as MC,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../VisitPage/VisitPageElements";
import styled from "styled-components";
import {
  LoginButton,
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  FieldContainer,
  TextContainer,
  StyledLink,
} from "../LoginPage/LoginPageElements";

const MyStyledInput = FormInput.withComponent("input");
const MyStyledButton = FormButton.withComponent("button");

const Register = () => {
  const initialValues = {
    imie: "",
    nazwisko: "",
    telefon: "",
    miasto: "",
    ulica: "",
    kodPocztowy: "",
    email: "",
    password: "",
  };
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const handleRegister = (values, actions) => {
    const {
      imie,
      nazwisko,
      telefon,
      miasto,
      ulica,
      kodPocztowy,
      email,
      password,
    } = values;

    dispatch(
      register(
        imie,
        nazwisko,
        telefon,
        miasto,
        ulica,
        kodPocztowy,
        email,
        password
      )
    )
      .then(() => {
        setSuccessful(true);
        actions.resetForm();
        // navigate('/login')
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <PageWrapper>
      <AddVisitContainer>
        {!successful ? (
          <>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                handleRegister(values, actions);
              }}
              validationSchema={signupValidationSchema}
            >
              {({ values, errors, touched, handleBlur }) => (
                <Form>
                  <FormContainer>
                  <LoginContainer register
                  initial={{ opacity: 0, scale: 0, rotate: 60 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{duration: .5}}
                >
                      <TitleContainer>
                        <Title>Zarejestruj</Title>
                        <Title primary>się</Title>
                      </TitleContainer>
                      
                        <StyledField
                          type="text"
                          name="imie"
                          placeholder="Imię"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="imie">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="text"
                          name="nazwisko"
                          placeholder="Nazwisko"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="nazwisko">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="number"
                          name="telefon"
                          placeholder="Telefon"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="telefon">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="text"
                          name="miasto"
                          placeholder="Miasto"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="miasto">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="text"
                          name="ulica"
                          placeholder="Ulica"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="ulica">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="number"
                          name="kodPocztowy"
                          placeholder="Kod-pocztowy"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="kodPocztowy">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="text"
                          name="email"
                          placeholder="E-mail"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                        <StyledField
                          type="password"
                          name="password"
                          placeholder="Haslo"
                          onBlur={handleBlur}
                        />
                        <ErrorMessage name="password">
                          {(msg) => (
                            <ErrorText primary panel>
                              {msg}
                            </ErrorText>
                          )}
                        </ErrorMessage>
                      
                      <FormButton type="submit">Zarejestruj się</FormButton>
                      <FormButton type="reset">Wyczyść pola</FormButton>
                      {message && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {message}
                        </p>
                      )}
                    </LoginContainer>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#333",
            }}
          >
            {message && (
              <p style={{ color: "red", textAlign: "center" }}>{message}</p>
            )}
            <Link
              style={{ textDecoration: "none", color: "#01D4BF" }}
              to="/login"
              onClick={() => dispatch(clearMessage())}
            >
              Przejdź do logowania!
            </Link>
          </div>
        )}
      </AddVisitContainer>
    </PageWrapper>
  );
};

export default Register;
