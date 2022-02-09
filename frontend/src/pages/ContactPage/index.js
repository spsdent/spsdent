import React, { useState, useEffect } from 'react'
import { PageWrapper } from '../../components/PageWrapper'
import { Pattern } from '../../components/Pattern'
import {
  ContactContainer,
  ContactForm,
  ContactTitle,
  ContactInfo,
  ContactInfoTitle,
  ContactText,
  ContactInput,
  ContactMessage,
  ButtonContact,
  ContactSocket,
} from './ContactPageElements'
import HashLoader from 'react-spinners/HashLoader'
import emailjs from 'emailjs-com'
import Swal from 'sweetalert2'

const ContactPage = () => {
  const [state, setState] = useState({
    from_name: '',
    from_email: '',
    topic: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text)
          Swal.fire({
            icon: 'success',
            title: 'Wiadomość została wysłana!',
          })
        },
        (error) => {
          console.log(error.text)
          Swal.fire({
            icon: 'error',
            title: 'Ooops, wystąpił błąd.',
          })
        }
      )
    e.target.reset()

    setState({
      from_name: '',
      from_email: '',
      topic: '',
      message: '',
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
        <>
          <ContactContainer>
            <ContactForm
              onSubmit={handleSubmit}
              initial={{ y: -300 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', damping: 10, stiffness: 50 }}
            >
              <ContactTitle>Kontakt</ContactTitle>
              <ContactText primary>
                Chcesz się o coś zapytać?<br></br> Pisz śmiało!
              </ContactText>
              <ContactInput
                type='text'
                name='from_name'
                value={state.name}
                onChange={handleChange}
                placeholder='Imię i Nazwisko'
                required
              />
              <ContactInput
                type='email'
                name='from_email'
                value={state.email}
                onChange={handleChange}
                placeholder='E-mail'
                required
              />
              <ContactInput
                type='text'
                name='topic'
                value={state.topic}
                onChange={handleChange}
                placeholder='Temat'
                required
              />
              <ContactMessage
                type='text'
                name='message'
                value={state.message}
                onChange={handleChange}
                placeholder='Treść'
                required
              />
              <ButtonContact type='submit'>Wyślij</ButtonContact>
            </ContactForm>
            <ContactInfo
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 10,
                stiffness: 50,
                delay: 0.2,
              }}
            >
              <ContactSocket>
                <ContactInfoTitle>Tu nas znajdziesz</ContactInfoTitle>
                <ContactText>
                  ul. Filaretów 27,<br></br>lok.4 20-609<br></br>Lublin
                </ContactText>
              </ContactSocket>
              <ContactSocket>
                <ContactInfoTitle>Godziny otwarcia</ContactInfoTitle>
                <ContactText>
                  Poniedziałek - Piątek<br></br>8:00 - 16:00<br></br>Sobota
                  <br></br>
                  9:00 - 13:00
                </ContactText>
              </ContactSocket>
              <ContactSocket>
                <ContactInfoTitle>Telefon</ContactInfoTitle>
                <ContactText>607 677 888</ContactText>
              </ContactSocket>
              <ContactSocket>
                <ContactInfoTitle>Pomoc</ContactInfoTitle>
                <ContactText>pomoc@spsdent.com</ContactText>
              </ContactSocket>
            </ContactInfo>
          </ContactContainer>
          <Pattern
            src='Pattern.png'
            top='15%'
            left='80%'
            transition={{ duration: 1 }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1.5, rotate: 45 }}
          ></Pattern>
          <Pattern
            src='Pattern.png'
            top='70%'
            left='0'
            transition={{ duration: 1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1.5, rotate: 45 }}
          ></Pattern>
        </>
      )}
    </PageWrapper>
  )
}

export default ContactPage
