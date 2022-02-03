import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { login } from "../../store/actions/auth";
import { PageWrapper } from "../../components/PageWrapper";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginValidationSchema } from "../../utils/validationSchemas";
import { AnimatePresence, motion } from "framer-motion";
import { clearMessage } from "../../store/actions/message";
import {
  Title,
  FormButton,
  FormColumn,
  FormContainer,
  FormInput,
  FormError,
} from "../AddVisitPage/AddVisitPageElements";
import {
  UserText,
  StyledField,
  ErrorText,
  StyledButton,
} from "../ControlPanelPage/ControlPanelPageElements";
import {
  LoginButton,
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  FieldContainer,
  TextContainer,
  StyledLink,
} from "./LoginPageElements";
const MyStyledInput = FormInput.withComponent("input");

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = (values) => {
    const { email, password } = values;

    dispatch(login(email, password))
      .then(() => {
        dispatch(clearMessage());
        navigate("/settings");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/settings" />;
  }

  return (
    <PageWrapper>
      <AddVisitContainer>
        <Formik
          onSubmit={(values) => handleLogin(values)}
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
        >
          {({ errors, values, touched, handleBlur }) => (
            <Form>
              <FormContainer>
                <LoginContainer
                  initial={{ opacity: 0, scale: 0, rotate: 60 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TitleContainer>
                    <Title>Zaloguj</Title>
                    <Title primary>się</Title>
                  </TitleContainer>
                  <FieldContainer>
                    <StyledField
                      type="email"
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
                  </FieldContainer>
                  <FieldContainer>
                    <StyledField
                      type="password"
                      name="password"
                      placeholder="Hasło"
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="password">
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>
                  </FieldContainer>
                  <LoginButton>Zaloguj się</LoginButton>

                  {message && <ErrorText primary>{message}</ErrorText>}
                  <TextContainer>
                    <UserText>Chcesz utworzyć konto?</UserText>
                    <StyledLink to="/register">Kliknij tutaj!</StyledLink>
                  </TextContainer>
                  <TextContainer>
                    <UserText>Zapomniałeś hasła?</UserText>
                    <StyledLink to="/password-change">
                      Zresetuj hasło!
                    </StyledLink>
                  </TextContainer>
                </LoginContainer>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </AddVisitContainer>
    </PageWrapper>
  );
};

export default LoginPage;
