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
  FormContainer,
  FormInput,
} from "../AddVisitPage/AddVisitPageElements";
import {
  StyledField,
  ErrorText,
} from "../ControlPanelPage/ControlPanelPageElements";

import {
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
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
                    <LoginContainer
                      register
                      initial={{ opacity: 0, scale: 0, rotate: 60 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
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
                      {message && <ErrorText primary>{message}</ErrorText>}
                    </LoginContainer>
                  </FormContainer>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            {message && <ErrorText>{message}</ErrorText>}
            <StyledLink to="/logowanie" onClick={() => dispatch(clearMessage())}>
              Przejdź do logowania!
            </StyledLink>
            </> 
        )}
      </AddVisitContainer>
    </PageWrapper>
  );
};

export default Register;
