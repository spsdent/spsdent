import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageWrapper } from "../../components/PageWrapper";
import { changePassword, logout } from "../../store/actions/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { passwordChangeValidationSchema } from "../../utils/validationSchemas";
import { Link } from "react-router-dom";
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
  LoginButton,
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  FieldContainer,
  TextContainer,
  StyledLink,
} from "../LoginPage/LoginPageElements";
import {
  UserText,
  StyledField,
  ErrorText,
  StyledButton,
} from "../ControlPanelPage/ControlPanelPageElements";
const MyStyledInput = FormInput.withComponent("input");

const PwdChangePage = () => {
  const initialValues = {
    email: "",
    oldPassword: "",
    newPassword: "",
  };
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const onPwdUpdate = (values, actions) => {
    dispatch(changePassword(values))
      .then(() => {
        actions.resetForm();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <PageWrapper>
      <AddVisitContainer pswrdChange>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            onPwdUpdate(values, actions);
          }}
          validationSchema={passwordChangeValidationSchema}
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
                    <Title>Zmień</Title>
                    <Title primary>hasło</Title>
                  </TitleContainer>
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
                    name="oldPassword"
                    placeholder="Stare hasło"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="oldPassword">
                    {(msg) => (
                      <ErrorText primary panel>
                        {msg}
                      </ErrorText>
                    )}
                  </ErrorMessage>
                  <StyledField
                    type="password"
                    name="newPassword"
                    placeholder="Nowe hasło"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage name="newPassword">
                    {(msg) => (
                      <ErrorText primary panel>
                        {msg}
                      </ErrorText>
                    )}
                  </ErrorMessage>
                  <FormButton>Zmień hasło</FormButton>
                  {message && <ErrorText primary>{message}</ErrorText>}
                  <TextContainer>
                    <UserText>Chcesz utworzyć konto?</UserText>
                    <StyledLink
                      to="/register"
                      onClick={() => dispatch(clearMessage())}
                    >
                      Kliknij tutaj!
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

export default PwdChangePage;
