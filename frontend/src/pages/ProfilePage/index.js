import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PageWrapper } from "../../components/PageWrapper";
import { Formik, Form } from "formik";

import {
  Container,
  Title,
  TitleContainer,
  DashboardContainer,
  VitalInfoContainer,
  VitalInfoText,
  VitalInfoEdit,
  VitalInfoSocket,
  ButtonDashboard,
  PasswordChangeContainer,
  ButtonContainer,
} from "./ProfilePageElements";
import AuthData from "../../services/auth";
import { logout } from "../../store/actions/auth";

const styles = {
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  inputStyle: {
    backgroundColor: "transparent",
    border: "2px solid #333",
    height: "3em",
    margin: "10px 0",
    paddingLeft: "1em",
  },
  buttonStyle: {
    backgroundColor: "transparent",
    border: "2px solid #333",
    cursor: "pointer",
    padding: ".5rem 0",
  },
};

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    imie: "",
    nazwisko: "",
    kodPocztowy: "",
    telefon: "",
    miasto: "",
    email: "",
    ulica: "",
  });
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userPwdData, setUserPwdData] = useState({ email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    const { imie, nazwisko, kodPocztowy, email, ulica, miasto, telefon } =
      currentUser;
    setInitialValues({
      imie,
      nazwisko,
      kodPocztowy,
      email,
      ulica,
      miasto,
      telefon,
    });
  }, []);

  // const onUserDelete = () => {
  //   UserData.deleteUser(currentUser.id).then((response) => (
  //     <Navigate to='/login' />
  //   ))
  // }

  // const onUserUpdate = () => {

  // }

  const onInputHandle = (e) => {
    const { name, value } = e.target;
    setUserPwdData({ ...userPwdData, [name]: value });
  };

  const onPwdUpdate = () => {
    AuthData.passwordChange(userPwdData).then((response) => {
      dispatch(logout());
      return <Navigate to="/login" />;
    });
  };

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title>Panel</Title>
          <Title primary>Pacjenta</Title>
        </TitleContainer>
        <DashboardContainer>
          <VitalInfoContainer>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({
                errors,
                touched,
                values,
                setValues,
                handleChange,
                handleBlur,
              }) => (
                <>
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40%",
                      backgroundColor: "#636",
                    }}
                  >
                    <VitalInfoSocket>
                      <VitalInfoText primary>Imię:</VitalInfoText>
                      <VitalInfoText>{currentUser.imie}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="imie"
                        placeholder="Imie"
                        value={values.imie}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Nazwisko:</VitalInfoText>
                      <VitalInfoText>{currentUser.nazwisko}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="nazwisko"
                        placeholder="Nazwisko"
                        value={values.nazwisko}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Telefon:</VitalInfoText>
                      <VitalInfoText>{currentUser.telefon}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="telefon"
                        placeholder="Telefon"
                        value={values.telefon}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Miasto:</VitalInfoText>
                      <VitalInfoText>{currentUser.miasto}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="miasto"
                        placeholder="Miasto"
                        value={values.miasto}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                  </Form>
                  <Form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40%",
                      backgroundColor: "yellowgreen",
                    }}
                  >
                    <VitalInfoSocket>
                      <VitalInfoText primary>Ulica:</VitalInfoText>
                      <VitalInfoText>{currentUser.ulica}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="ulica"
                        placeholder="Ulica"
                        value={values.ulica}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Kod pocztowy:</VitalInfoText>
                      <VitalInfoText>{currentUser.kodPocztowy}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="kodPocztowy"
                        placeholder="Kod-pocztowy"
                        value={values.kodPocztowy}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    <VitalInfoSocket>
                      <VitalInfoText primary>Email:</VitalInfoText>
                      <VitalInfoText>{currentUser.email}</VitalInfoText>
                    </VitalInfoSocket>
                    {isEditing && (
                      <VitalInfoEdit
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        style={styles.inputStyle}
                      />
                    )}
                    {isEditing && (
                      <ButtonDashboard>Zapisz zmiany</ButtonDashboard>
                    )}
                  </Form>
                </>
              )}
            </Formik>
            <ButtonContainer>
              <ButtonDashboard onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Zakończ edycję" : "Edytuj profil"}
              </ButtonDashboard>
              {!isChangingPwd && (
                <ButtonDashboard
                  onClick={() => setIsChangingPwd(!isChangingPwd)}
                >
                  Zmień hasło
                </ButtonDashboard>
              )}
              <ButtonDashboard>Usuń konto</ButtonDashboard>
            </ButtonContainer>
            {isChangingPwd && (
              <PasswordChangeContainer>
                <VitalInfoText>Zmień hasło</VitalInfoText>
                <VitalInfoEdit
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  onChange={onInputHandle}
                />
                <VitalInfoEdit
                  type="password"
                  name="password"
                  placeholder="Nowe haslo"
                  onChange={onInputHandle}
                />
                <ButtonDashboard onClick={onPwdUpdate}>
                  Zmień hasło
                </ButtonDashboard>
                <ButtonDashboard
                  onClick={() => setIsChangingPwd(!isChangingPwd)}
                >
                  Anuluj zmianę hasła
                </ButtonDashboard>
              </PasswordChangeContainer>
            )}
          </VitalInfoContainer>
        </DashboardContainer>
      </Container>

      {/* <Container>
        <TitleContainer>
          <Title>Panel</Title>
          <Title primary>Pacjenta</Title>
        </TitleContainer>
        <div
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: '2rem',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: ' column',
            gap: '30px',
            margin: '30px 0',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '50%',
              display: 'grid',
              gridTemplateColumns: '80% 20%',
            }}
          >
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values)
              }}
            >
              {({
                errors,
                touched,
                values,
                setValues,
                handleChange,
                handleBlur,
              }) => (
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '300px',
                  }}
                >
                  <p>
                    <strong>Imie:</strong> {currentUser.imie}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='imie'
                      placeholder='Imie'
                      value={values.imie}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Nazwisko:</strong> {currentUser.nazwisko}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='nazwisko'
                      placeholder='Nazwisko'
                      value={values.nazwisko}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Telefon:</strong> {currentUser.telefon}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='telefon'
                      placeholder='Telefon'
                      value={values.telefon}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Miasto:</strong> {currentUser.miasto}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='miasto'
                      placeholder='Miasto'
                      value={values.miasto}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Ulica:</strong> {currentUser.ulica}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='ulica'
                      placeholder='Ulica'
                      value={values.ulica}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Kod-pocztowy:</strong> {currentUser.kodPocztowy}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='kodPocztowy'
                      placeholder='Kod-pocztowy'
                      value={values.kodPocztowy}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  <p>
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  {isEditing && (
                    <input
                      type='text'
                      name='email'
                      placeholder='E-mail'
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      style={styles.inputStyle}
                    />
                  )}
                  {isEditing && (
                    <button style={styles.buttonStyle}>Zapisz zmiany</button>
                  )}
                </Form>
              )}
            </Formik>
            {isChangingPwd && (
              <div
                style={{
                  width: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p>Zmien haslo</p>
                <input
                  type='text'
                  name='email'
                  placeholder='E-mail'
                  style={styles.inputStyle}
                  onChange={onInputHandle}
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Nowe haslo'
                  style={styles.inputStyle}
                  onChange={onInputHandle}
                />
                <button style={styles.buttonStyle} onClick={onPwdUpdate}>
                  Zmien haslo
                </button>
                <button
                  style={styles.buttonStyle}
                  onClick={() => setIsChangingPwd(!isChangingPwd)}
                >
                  Anuluj zmiane hasla
                </button>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '5px',
              }}
            >
              <button
                style={styles.buttonStyle}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Zakoncz edycje' : 'Edytuj profil'}
              </button>
              {!isChangingPwd && (
                <button
                  style={styles.buttonStyle}
                  onClick={() => setIsChangingPwd(!isChangingPwd)}
                >
                  Zmien haslo
                </button>
              )}
              <button style={styles.buttonStyle}>Usun konto</button>
            </div>
          </div>

/////////////////////////////////////////////////////////////


          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                marginRight: '10px',
              }}
            >
              <p>Najblizsza wizyta</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Usluga
              </span>
              <p>Badanie lekarsko-stomatologiczne</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Specjalista
              </span>
              <p>Leno Paleno</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Data
              </span>
              <p>21.21.21</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Godzina
              </span>
              <p>15</p>
              <p style={{ marginTop: '30px' }}>Przejdz do wizyty</p>
            </div>
            <div
              style={{
                width: '100%',
                marginLeft: '10px',
              }}
            >
              <p>Ostatnia wizyta</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Usluga
              </span>
              <p>Badanie lekarsko-stomatologiczne</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Specjalista
              </span>
              <p>Leno Paleno</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Data
              </span>
              <p>21.21.21</p>
              <span style={{ color: 'rgba(75,75,75,.75)', fontSize: '.5rem' }}>
                Godzina
              </span>
              <p>15</p>
              <p style={{ marginTop: '30px' }}>Przejdz do wizyty</p>
            </div>
          </div>
        </div>
      </Container> */}
    </PageWrapper>
  );
};

export default ProfilePage;
