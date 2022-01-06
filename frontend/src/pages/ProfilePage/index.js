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
  DashboardVisitContainer,
  DashboardVisit,
  DashboardVisitTitle,
  DashboardVisitText,
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

          <DashboardVisitContainer>
            <DashboardVisit>
              <DashboardVisitTitle>Najbliższa wizyta</DashboardVisitTitle>
              <DashboardVisitText primary>Usługa</DashboardVisitText>
              <DashboardVisitText>
                Badanie lekarsko-stomatologiczne
              </DashboardVisitText>
              <DashboardVisitText primary>Specjalista</DashboardVisitText>
              <DashboardVisitText>Tosia Dyskretka</DashboardVisitText>
              <DashboardVisitText primary>Data</DashboardVisitText>
              <DashboardVisitText>21.03.21</DashboardVisitText>
              <DashboardVisitText primary>Godzina</DashboardVisitText>
              <DashboardVisitText>12:30</DashboardVisitText>
              <DashboardVisitText>Przejdź do wizyty</DashboardVisitText>
            </DashboardVisit>
            <DashboardVisit>
              <DashboardVisitTitle>Ostatnia wizyta</DashboardVisitTitle>
              <DashboardVisitText primary>Usługa</DashboardVisitText>
              <DashboardVisitText>
                Badanie lekarsko-stomatologiczne
              </DashboardVisitText>
              <DashboardVisitText primary>Specjalista</DashboardVisitText>
              <DashboardVisitText>Adrian Kotletka</DashboardVisitText>
              <DashboardVisitText primary>Data</DashboardVisitText>
              <DashboardVisitText>06.01.21</DashboardVisitText>
              <DashboardVisitText primary>Godzina</DashboardVisitText>
              <DashboardVisitText>11:00</DashboardVisitText>
              <DashboardVisitText>Przejdź do wizyty</DashboardVisitText>
            </DashboardVisit>
          </DashboardVisitContainer>
        </DashboardContainer>
      </Container>
    </PageWrapper>
  );
};

export default ProfilePage;
