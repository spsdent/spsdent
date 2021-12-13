import React, { Component } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
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
} from "./ContactPageElements";
class ContactPage extends Component {
  state = {
    name: "",
    email: "",
    topic: "",
    message: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      name: "",
      email: "",
      topic: "",
      message: "",
    });
  };
  render() {
    return (
      <PageWrapper>
        <ContactContainer initial={{ x: -300 }} animate={{ x: 0 }}>
          <ContactForm onSubmit={this.handleSubmit}>
            <ContactTitle>Kontakt</ContactTitle>
            <ContactText primary>
              Chcesz się o coś zapytać?<br></br> Pisz śmiało!
            </ContactText>
            <ContactInput
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Imię i Nazwisko"
            />
            <ContactInput
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="E-mail"
            />
            <ContactInput
              type="text"
              name="topic"
              value={this.state.topic}
              onChange={this.handleChange}
              placeholder="Temat"
            />
            <ContactMessage
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              placeholder="Treść"
            />
            <ButtonContact type="submit">Wyślij</ButtonContact>
          </ContactForm>
          <ContactInfo>
            <ContactInfoTitle>Tu nas znajdziesz</ContactInfoTitle>
            <ContactText>
              ul. Filaretów 27,<br></br>lok.4 20-609<br></br>Lublin
            </ContactText>
            <ContactInfoTitle>Godziny otwarcia</ContactInfoTitle>
            <ContactText>
              Poniedziałek - Piątek<br></br>8:00 - 16:00<br></br>Sobota<br></br>
              9:00 - 13:00
            </ContactText>
            <ContactInfoTitle>Telefon</ContactInfoTitle>
            <ContactText>607 677 888</ContactText>
            <ContactInfoTitle>Pomoc</ContactInfoTitle>
            <ContactText>pomoc@spsdent.com</ContactText>
          </ContactInfo>
        </ContactContainer>
        <Pattern
          src="Pattern.png"
          top="15%"
          left="80%"
          transition={{ duration: 1 }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1.5, rotate: 45 }}
        ></Pattern>
        <Pattern
          src="Pattern.png"
          top="70%"
          left="0"
          transition={{ duration: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1.5, rotate: 45 }}
        ></Pattern>
      </PageWrapper>
    );
  }
}

export default ContactPage;
