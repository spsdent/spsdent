import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PageWrapper } from '../../components/PageWrapper'
import { changePassword } from '../../store/actions/auth'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { passwordChangeValidationSchema } from '../../utils/validationSchemas'
import { clearMessage } from '../../store/actions/message'
import {
  Title,
  FormContainer,
  FormInput,
} from '../AddVisitPage/AddVisitPageElements'
import {
  TitleContainer,
  AddVisitContainer,
  LoginContainer,
  TextContainer,
  StyledLink,
} from '../LoginPage/LoginPageElements'
import {
  UserText,
  ErrorText,
} from '../ControlPanelPage/ControlPanelPageElements'
import HashLoader from 'react-spinners/HashLoader'
import styled from 'styled-components'

export const FI = styled(FormInput)`
  background-color: transparent;
  border: 2px solid #333;
  padding: 0.5em 0 0.5em 1em;
  width: 18em;
  margin: 0.6em 0;
  outline: none;
  color: #333;
  font-family: 'Poppins';
  font-size: 15px;
  max-width: 350px;

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }
`

const StyledBtn = styled.button`
  width: 18em;
  padding: 1em 0;
  max-width: 350px;
  margin-top: 20px;
  border: 2px solid #333;
  cursor: pointer;
  font-size: 15px;
  transition: 0.2s ease;

  &:hover {
    background-color: #01d4bf;
    color: #fff;
    border-color: #fff;
  }

  @media screen and (max-width: 1500px) {
    font-size: 13px;
  }
  @media screen and (max-width: 1280px) {
    font-size: 11px;
  }
  @media screen and (max-width: 960px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 7px;
    max-width: 400px;
  }
`

const MyStyledInput = FI.withComponent('input')

const PwdChangePage = () => {
  const initialValues = {
    email: '',
    oldPassword: '',
    newPassword: '',
  }
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.message)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // funkcja odpowiedzialna za zmiane hasla
  // changePassword jest zdefiniowana w store/actions/auth
  const onPwdUpdate = (values, actions) => {
    dispatch(changePassword(values))
      .then(() => {
        actions.resetForm()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && (
        <AddVisitContainer pswrdChange>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              onPwdUpdate(values, actions)
            }}
            validationSchema={passwordChangeValidationSchema}
          >
            {({ handleBlur }) => (
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
                    <Field
                      as={MyStyledInput}
                      type='text'
                      name='email'
                      placeholder='E-mail'
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name='email'>
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>

                    <Field
                      as={MyStyledInput}
                      type='password'
                      name='oldPassword'
                      placeholder='Stare hasło'
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name='oldPassword'>
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>
                    <Field
                      as={MyStyledInput}
                      type='password'
                      name='newPassword'
                      placeholder='Nowe hasło'
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name='newPassword'>
                      {(msg) => (
                        <ErrorText primary panel>
                          {msg}
                        </ErrorText>
                      )}
                    </ErrorMessage>
                    <StyledBtn>Zmień hasło</StyledBtn>
                    {message && <ErrorText primary>{message}</ErrorText>}
                    <TextContainer>
                      <UserText>Chcesz utworzyć konto?</UserText>
                      <StyledLink
                        to='/rejestracja'
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
      )}
    </PageWrapper>
  )
}

export default PwdChangePage
