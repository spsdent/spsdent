import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageWrapper } from "../../components/PageWrapper";
import { Formik, Form } from "formik";
import { Pattern } from "../../components/Pattern";
import { useNavigate } from "react-router";

import {
  updateUserDataValidationSchema,
  signInChangePasswordValidationSchema,
} from "../../utils/validationSchemas";

import {
  Container,
  Title,
  TitleContainer,
  DashboardContainer,
  VitalInfoContainer,
  VitalInfoText,
  VitalInfoEdit,
  VitalInfoSocket,
  VitalInfoEditContainer,
  ButtonDashboard,
  PasswordChangeContainer,
  ButtonsContainer,
  ButtonVitalInfo,
  DashboardVisitContainer,
  DashboardVisit,
  DashboardVisitTitle,
  DashboardVisitText,
  DashboardVisitButton,
  VitalInfoWrap,
} from "./ProfilePageElements";
import { logout, changePassword } from "../../store/actions/auth";
import { refreshApp } from "../../store/actions/refresh";
import UserData from "../../services/user";
import VisitData from "../../services/visit";
import { SET_MESSAGE } from "../../store/actions/types";
import { clearMessage } from "../../store/actions/message";
import { AnimatePresence } from "framer-motion";
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../VisitPage/VisitPageElements";
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
  const [oldUserValues, setOldUserValues] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [userData, setUserData] = useState("");
  const [visitsArr, setVisitsArr] = useState([]);
  const [archiveVisits, setArchiveVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isRefresh } = useSelector((state) => state.refresh);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    UserData.getAll().then((response) => {
      setIsLoading(false);
      const signInUser = response.data.filter(
        (user) => user._id === currentUser.id
      )[0];
      const { imie, nazwisko, kodPocztowy, email, ulica, miasto, telefon } =
        signInUser;
      const obj = {
        imie,
        nazwisko,
        kodPocztowy,
        email,
        ulica,
        miasto,
        telefon,
      };
      setUserData(obj);
      setInitialValues(obj);
      setOldUserValues(obj);
    });

    VisitData.getAll().then((response) => {
      const actualVisits = response.data.filter(
        (visit) => visit.status === false && visit.email === currentUser.email
      );
      const ascArr = actualVisits.sort((a, b) => {
        let aa = a.data.split(".").reverse().join();
        let bb = b.data.split(".").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
      const archVisits = response.data.filter(
        (visit) => visit.status === true && visit.email === currentUser.email
      );
      const descArr = archVisits.sort((a, b) => {
        let aa = a.data.split(".").reverse().join();
        let bb = b.data.split(".").reverse().join();
        return aa > bb ? -1 : aa > bb ? 1 : 0;
      });
      setVisitsArr(ascArr);
      setArchiveVisits(descArr);
    });
  }, [isRefresh]);

  const isUser = currentUser.roles.includes("ROLE_USER");
  const isDoctor = currentUser.roles.includes("ROLE_SPEC");

  const onAccountDelete = () => {
    setIsDelete(false);
    UserData.deleteUser(currentUser.id)
      .then((response) => {
        dispatch({
          type: SET_MESSAGE,
          payload: "Konto zostało usunięte, przykro nam, że nas opuszczasz",
        });
        dispatch(logout());
        navigate("/login");
      })
      .catch((e) => console.log("Blad podczas usuwania"));
  };

  const onPwdUpdate = (values, actions) => {
    let updateObj = { ...values, email: currentUser.email };
    dispatch(changePassword(updateObj))
      .then((response) => {
        dispatch({
          type: SET_MESSAGE,
          payload: "Hasło zostało zmienione, zaloguj się używając nowego hasła",
        });
        dispatch(logout());
        actions.resetForm();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onUserUpdate = (values, actions) => {
    UserData.updateUser(currentUser.id, values)
      .then((response) => {
        setIsEditing(false);
        dispatch({ type: SET_MESSAGE, payload: "Dane zostały zmienione!" });
        dispatch(refreshApp());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, {
      state: { item: item, bRoute: "settings" },
    });
  };

  const goToArchiveVisit = (item) => {
    navigate(`/archive/${item.id}`, {
      state: { item: item, bRoute: "settings" },
    });
  };

  return (
    <PageWrapper>
      <Container>
        <TitleContainer>
          <Title
            transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            Panel
          </Title>
          <Title
            primary
            transition={{ type: "spring", bounce: 0.5, duration: 1.7 }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
          >
            Pacjenta
          </Title>
        </TitleContainer>
        <DashboardContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <VitalInfoContainer>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={updateUserDataValidationSchema}
              onSubmit={(values, actions) => {
                onUserUpdate(values, actions);
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
                  <VitalInfoWrap>
                    <Form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <VitalInfoSocket>
                        <VitalInfoText primary>Imię:</VitalInfoText>
                        <VitalInfoText>{userData.imie}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="imie"
                                placeholder="Imię"
                                value={values.imie}
                                onBlur={handleBlur}
                              />
                              {errors.imie && touched.imie ? (
                                <p style={{ color: "red" }}>{errors.imie}</p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <VitalInfoSocket>
                        <VitalInfoText primary>Nazwisko:</VitalInfoText>
                        <VitalInfoText>{userData.nazwisko}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="nazwisko"
                                placeholder="Nazwisko"
                                value={values.nazwisko}
                                onBlur={handleBlur}
                              />
                              {errors.nazwisko && touched.nazwisko ? (
                                <p style={{ color: "red" }}>
                                  {errors.nazwisko}
                                </p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <VitalInfoSocket>
                        <VitalInfoText primary>Telefon:</VitalInfoText>
                        <VitalInfoText>{userData.telefon}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="telefon"
                                placeholder="Telefon"
                                value={values.telefon}
                                onBlur={handleBlur}
                              />
                              {errors.telefon && touched.telefon ? (
                                <p style={{ color: "red" }}>{errors.telefon}</p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <VitalInfoSocket>
                        <VitalInfoText primary>Miasto:</VitalInfoText>
                        <VitalInfoText>{userData.miasto}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="miasto"
                                placeholder="Miasto"
                                value={values.miasto}
                                onBlur={handleBlur}
                              />
                              {errors.miasto && touched.miasto ? (
                                <p style={{ color: "red" }}>{errors.miasto}</p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                    </Form>
                    <Form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <VitalInfoSocket>
                        <VitalInfoText primary>Ulica:</VitalInfoText>
                        <VitalInfoText>{userData.ulica}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="ulica"
                                placeholder="Ulica"
                                value={values.ulica}
                                onBlur={handleBlur}
                              />
                              {errors.miasto && touched.miasto ? (
                                <p style={{ color: "red" }}>{errors.miasto}</p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <VitalInfoSocket>
                        <VitalInfoText primary>Kod pocztowy:</VitalInfoText>
                        <VitalInfoText>{userData.kodPocztowy}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="kodPocztowy"
                                placeholder="Kod-pocztowy"
                                value={values.kodPocztowy}
                                onBlur={handleBlur}
                              />
                              {errors.kodPocztowy && touched.kodPocztowy ? (
                                <p style={{ color: "red" }}>
                                  {errors.kodPocztowy}
                                </p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <VitalInfoSocket>
                        <VitalInfoText primary>Email:</VitalInfoText>
                        <VitalInfoText>{userData.email}</VitalInfoText>
                      </VitalInfoSocket>
                      <AnimatePresence>
                        {isEditing && (
                          <>
                            <VitalInfoEditContainer
                              initial={{ x: -50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -50, opacity: 0 }}
                            >
                              <VitalInfoEdit
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={values.email}
                                onBlur={handleBlur}
                              />
                              {errors.email && touched.email ? (
                                <p style={{ color: "red" }}>{errors.email}</p>
                              ) : null}
                            </VitalInfoEditContainer>
                          </>
                        )}
                      </AnimatePresence>
                      <AnimatePresence>
                        {isEditing && (
                          <ButtonVitalInfo
                            type="submit"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            Zapisz zmiany
                          </ButtonVitalInfo>
                        )}
                      </AnimatePresence>
                    </Form>
                  </VitalInfoWrap>
                </>
              )}
            </Formik>
            <Formik
              enableReinitialize
              initialValues={{ oldPassword: "", newPassword: "" }}
              validationSchema={signInChangePasswordValidationSchema}
              onSubmit={(values, actions) => onPwdUpdate(values, actions)}
            >
              {({ errors, touched, values, setValues }) => (
                <>
                  <Form>
                    <AnimatePresence>
                      {isChangingPwd && (
                        <>
                          <PasswordChangeContainer
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <VitalInfoText password>Zmiana hasła</VitalInfoText>
                            <VitalInfoEdit
                              password
                              type="password"
                              name="oldPassword"
                              placeholder="Stare hasło"
                              value={values.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword ? (
                              <p style={{ color: "red", fontSize: ".6em" }}>
                                {errors.oldPassword}
                              </p>
                            ) : null}
                            <VitalInfoEdit
                              password
                              primary
                              type="password"
                              name="newPassword"
                              placeholder="Nowe haslo"
                              value={values.newPassword}
                            />
                            {errors.newPassword && touched.newPassword ? (
                              <p style={{ color: "red", fontSize: ".6em" }}>
                                {errors.newPassword}
                              </p>
                            ) : null}
                            <ButtonDashboard type="submit">
                              Zmień hasło
                            </ButtonDashboard>
                          </PasswordChangeContainer>
                        </>
                      )}
                    </AnimatePresence>
                  </Form>
                  <ButtonsContainer>
                    <ButtonDashboard
                      type="button"
                      onClick={() => {
                        if (isEditing) {
                          setIsEditing(false);
                        } else {
                          setIsEditing(true);
                        }
                        setValues(oldUserValues);
                      }}
                    >
                      {isEditing ? "Anuluj edycję" : "Edytuj profil"}
                    </ButtonDashboard>
                    <ButtonDashboard
                      type="button"
                      onClick={() => setIsChangingPwd(!isChangingPwd)}
                    >
                      {isChangingPwd ? "Anuluj zmianę" : "Zmień hasło"}
                    </ButtonDashboard>
                    <ButtonDashboard onClick={() => setIsDelete(true)}>
                      Usuń konto
                    </ButtonDashboard>
                  </ButtonsContainer>
                </>
              )}
            </Formik>
          </VitalInfoContainer>

          {isUser || isDoctor ? (
            <DashboardVisitContainer>
              {visitsArr.length > 0 && (
                <DashboardVisit primary>
                  <DashboardVisitTitle>Najbliższa wizyta</DashboardVisitTitle>
                  <DashboardVisitText primary>Usługa</DashboardVisitText>
                  <DashboardVisitText>{visitsArr[0].usluga}</DashboardVisitText>
                  <DashboardVisitText primary>Specjalista</DashboardVisitText>
                  <DashboardVisitText>{`${visitsArr[0].specjalista.imie} ${visitsArr[0].specjalista.nazwisko}`}</DashboardVisitText>
                  <DashboardVisitText primary>Data</DashboardVisitText>
                  <DashboardVisitText>{visitsArr[0].data}</DashboardVisitText>
                  <DashboardVisitText primary>Godzina</DashboardVisitText>
                  <DashboardVisitText>
                    {visitsArr[0].godzina}
                  </DashboardVisitText>
                  <DashboardVisitButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToVisit(visitsArr[0])}
                  >
                    Przejdź do wizyty
                  </DashboardVisitButton>
                </DashboardVisit>
              )}
              {archiveVisits.length > 0 && (
                <DashboardVisit>
                  <DashboardVisitTitle>Ostatnia wizyta</DashboardVisitTitle>
                  <DashboardVisitText primary>Usługa</DashboardVisitText>
                  <DashboardVisitText>
                    {archiveVisits[0].usluga}
                  </DashboardVisitText>
                  <DashboardVisitText primary>Specjalista</DashboardVisitText>
                  <DashboardVisitText>{`${archiveVisits[0].specjalista.imie} ${archiveVisits[0].specjalista.nazwisko}`}</DashboardVisitText>
                  <DashboardVisitText primary>Data</DashboardVisitText>
                  <DashboardVisitText>
                    {archiveVisits[0].data}
                  </DashboardVisitText>
                  <DashboardVisitText primary>Godzina</DashboardVisitText>
                  <DashboardVisitText>
                    {archiveVisits[0].godzina}
                  </DashboardVisitText>
                  <DashboardVisitButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToArchiveVisit(archiveVisits[0])}
                  >
                    Przejdź do wizyty
                  </DashboardVisitButton>
                </DashboardVisit>
              )}
            </DashboardVisitContainer>
          ) : null}
        </DashboardContainer>
        {message && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}
        <AnimatePresence>
          {isDelete && (
            <ModalShadow
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ModalContainer
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ModalText>Na pewno chcesz usunąć konto?</ModalText>
                <ModalButtonsContainer>
                  <ModalButton primary onClick={() => setIsDelete(false)}>
                    Nie
                  </ModalButton>
                  <ModalButton onClick={onAccountDelete}>Tak</ModalButton>
                </ModalButtonsContainer>
              </ModalContainer>
            </ModalShadow>
          )}
        </AnimatePresence>
      </Container>
      <Pattern
        src="/Pattern.png"
        top={"70%"}
        left={"5%"}
        transition={{ type: "spring", bounce: 0.7, duration: 3, delay: 0.4 }}
        initial={{ opacity: 0, x: -200, rotate: 60 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
      />
      <Pattern
        src="/Pattern.png"
        top={"5%"}
        left={"80%"}
        transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.6 }}
        initial={{ opacity: 0, rotate: 90, scale: 1 }}
        animate={{ opacity: 1, rotate: 45, scale: 1.2 }}
      />
    </PageWrapper>
  );
};

export default ProfilePage;
