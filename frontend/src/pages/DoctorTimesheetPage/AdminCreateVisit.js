import React, { useState } from "react";
import { Formik, Field, Form } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { useFetchAllServices } from "../../hooks";
import { addVisitAdminTimesheetValidationSchema } from "../../utils/validationSchemas";
import { register } from "../../store/actions/auth";
import { SET_MESSAGE } from "../../store/actions/types";
import { refreshApp } from "../../store/actions/refresh";
import VisitData from "../../services/visit";
import ServiceData from "../../services/service";
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../VisitPage/VisitPageElements";
import {
  SideModalContainer,
  SideModalContent,
  FormColumn,
  FormItem,
  StyledLabel,
} from "./AdminCreateVisitElements.js";
import {
  ErrorText,
  StyledButton,
  UserText,
} from "../ControlPanelPage/ControlPanelPageElements.js";
import {
  RegisterText,
  TextContainer,
  FormInput,
} from "../AddVisitPage/AddVisitPageElements.js";
const styles = {
  inputStyle: {
    backgroundColor: "transparent",
    border: "2px solid #333",
    height: "3em",
    margin: "10px 0",
    paddingLeft: "1em",
    width: "15em",
  },
  buttonStyle: {
    backgroundColor: "transparent",
    border: "2px solid #333",
    height: "3em",
    margin: "10px 5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  buttonBook: {
    backgroundColor: "#01D4BF",
    border: "none",
    height: "3em",
    margin: "10px 5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  selectStyle: {
    backgroundColor: "transparent",
    border: "2px solid #333",
    height: "3em",
    margin: "10px 0",
    paddingLeft: "1em",
    width: "15em",
  },
  errorStyle: {
    color: "red",
  },
};

const AdminCreateVisit = ({
  bookingInfo,
  doctors,
  selectedDoctor,
  isSelectedFunc,
  onCreate,
}) => {
  const [visitState, setVisitState] = useState({
    grupa: "",
    usluga: "",
    nazwisko: "",
    imie: "",
    telefon: "",
    miasto: "",
    ulica: "",
    kodPocztowy: "",
    email: "",
  });
  const [serviceGroupSelected, setServiceGroupSelected] = useState("");
  const [selectedServicePrice, setSelectedServicePrice] = useState("");
  const [serviceSelected, setServiceSelected] = useState("");
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const allServicesFromDb = useFetchAllServices();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const serviceGroupHandler = (values) => {
    setServiceGroupSelected(values.grupa);
    const currentSelectedDoctor = doctors
      .filter((doctor) => doctor.doctorId === selectedDoctor)
      .map((item) => item.specjalnosci)
      .flat();
    const servicesToDisplay = allServicesFromDb.filter((service) =>
      currentSelectedDoctor.includes(service._id)
    );
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = "";
      values.data = "";
      values.godzina = "";
    } else if (!serviceGroupSelected) {
      setServiceSelected("");
      values.usluga = "";
      values.data = "";
      values.godzina = "";
    }

    return servicesToDisplay.map((service) => (
      <option value={service.grupa}>{service.grupa}</option>
    ));
  };

  const serviceHandler = (values) => {
    setServiceSelected(values.usluga);
    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item);

    if (values.usluga) {
      const price = selectedGroupServices.find(
        (item) => item.nazwa.toLowerCase() === values.usluga.toLowerCase()
      ).cena;
      setSelectedServicePrice(price);
    }

    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}>{item.nazwa}</option>
    ));
  };

  const createVisit = (values) => {
    const {
      grupa,
      usluga,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
    } = values;

    // Create object with values from form
    let visitData = {
      grupa,
      usluga,
      specjalista: {
        sid: bookingInfo.specjalista.sid,
        imie: bookingInfo.specjalista.imie,
        nazwisko: bookingInfo.specjalista.nazwisko,
      },
      data: bookingInfo.data,
      godzina: bookingInfo.godzina,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
      cena: selectedServicePrice,
      uid: currentUser !== null ? currentUser.id : null,
    };
    console.log("bookinginfo", bookingInfo);

    if (values.password) {
      // Create new visit based on provide visitData object
      dispatch(
        register(
          imie,
          nazwisko,
          telefon,
          miasto,
          ulica,
          kodPocztowy,
          email,
          values.password
        )
      );
    }
    // Create new visit based on provide visitData object
    VisitData.create(visitData)
      .then((response) => {
        setIsSubmit(false);
        isSelectedFunc(false);
        onCreate(true);
        dispatch(refreshApp());
        dispatch({
          type: SET_MESSAGE,
          payload: "Wizyta została utworzona!",
        });
      })
      .catch((e) => {
        dispatch({
          type: SET_MESSAGE,
          payload: "Wystapił błąd podczas tworzenia rezerwacji, przepraszamy.",
        });
      });
  };

  const onVisitSubmit = (values, actions) => {
    createVisit(values);
    actions.resetForm();
  };

  const onCreateHandler = (values, setValues) => {
    const { password, ...oldValues } = values;
    setIsCreateAccount(false);
    setValues(oldValues);
  };

  return (
    <>
      <SideModalContainer>
        <ModalText>Zarezerwuj</ModalText>
        {allServicesFromDb.length > 0 ? (
          <Formik
            enableReinitialize
            initialValues={visitState}
            validationSchema={addVisitAdminTimesheetValidationSchema}
            onSubmit={(values, actions) => onVisitSubmit(values, actions)}
            onReset={() => setVisitState({})}
          >
            {({
              errors,
              touched,
              values,
              setValues,
              handleBlur,
              resetForm,
            }) => (
              <SideModalContent>
                <Form>
                  <FormColumn>
                    <FormItem>
                      <StyledLabel>Grupa usług</StyledLabel>
                      <Field
                        as="select"
                        name="grupa"
                        style={styles.selectStyle}
                        onBlur={handleBlur}
                      >
                        <option value="">Wybierz grupę usług</option>
                        {serviceGroupHandler(values)}
                      </Field>
                      {errors.grupa && touched.grupa ? (
                        <ErrorText primary>{errors.grupa}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Usługa</StyledLabel>
                      <Field
                        as="select"
                        name="usluga"
                        style={styles.inputStyle}
                        onBlur={handleBlur}
                      >
                        <option value="">Wybierz usługę</option>
                        {serviceHandler(values)}
                      </Field>
                      {errors.usluga && touched.usluga ? (
                        <ErrorText primary>{errors.usluga}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Imię</StyledLabel>
                      <Field
                        name="imie"
                        type="text"
                        style={styles.inputStyle}
                        placeholder="Imie"
                        onBlur={handleBlur}
                      />
                      {errors.imie && touched.imie ? (
                        <ErrorText primary>{errors.imie}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Nazwisko</StyledLabel>
                      <Field
                        name="nazwisko"
                        type="text"
                        style={styles.inputStyle}
                        placeholder="Nazwisko"
                        onBlur={handleBlur}
                      />
                      {errors.nazwisko && touched.nazwisko ? (
                        <ErrorText primary>{errors.nazwisko}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>E-mail</StyledLabel>
                      <Field
                        name="email"
                        type="email"
                        style={styles.inputStyle}
                        placeholder="E-mail"
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <ErrorText primary>{errors.email}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Telefon</StyledLabel>
                      <Field
                        name="telefon"
                        type="number"
                        style={styles.inputStyle}
                        placeholder="Telefon"
                        onBlur={handleBlur}
                      />
                      {errors.telefon && touched.telefon ? (
                        <ErrorText primary>{errors.telefon}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Miasto</StyledLabel>
                      <Field
                        name="miasto"
                        type="text"
                        style={styles.inputStyle}
                        placeholder="Miasto"
                        onBlur={handleBlur}
                      />
                      {errors.miasto && touched.miasto ? (
                        <ErrorText primary>{errors.miasto}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Ulica</StyledLabel>
                      <Field
                        name="ulica"
                        type="text"
                        style={styles.inputStyle}
                        placeholder="Ulica"
                        onBlur={handleBlur}
                      />
                      {errors.ulica && touched.ulica ? (
                        <ErrorText primary>{errors.ulica}</ErrorText>
                      ) : null}
                    </FormItem>
                    <FormItem>
                      <StyledLabel>Kod-pocztowy</StyledLabel>
                      <Field
                        name="kodPocztowy"
                        type="number"
                        style={styles.inputStyle}
                        placeholder="Kod-pocztowy"
                        onBlur={handleBlur}
                      />
                      {errors.kodPocztowy && touched.kodPocztowy ? (
                        <ErrorText primary>{errors.kodPocztowy}</ErrorText>
                      ) : null}
                    </FormItem>
                    {isCreateAccount ? (
                      <>
                        <TextContainer>
                          <RegisterText>
                            Jednak nie chcesz tworzyc konta?
                          </RegisterText>
                          <RegisterText
                            primary
                            onClick={() => {
                              const { password, ...oldValues } = values;
                              setIsCreateAccount(false);
                              setValues(oldValues);
                            }}
                          >
                            Kliknij tutaj
                          </RegisterText>
                        </TextContainer>
                        <FormInput
                          name="password"
                          type="password"
                          placeholder="Wpisz hasło"
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <ErrorText primary>{errors.password}</ErrorText>
                        ) : null}
                      </>
                    ) : (
                      <TextContainer>
                        <RegisterText>Chcesz utworzyć konto?</RegisterText>
                        <RegisterText
                          primary
                          onClick={() => setIsCreateAccount(true)}
                        >
                          Kliknij tutaj
                        </RegisterText>
                      </TextContainer>
                    )}
                  </FormColumn>

                  <StyledButton type="button" onClick={() => setIsSubmit(true)}>
                    Zarezerwuj
                  </StyledButton>
                  <StyledButton type="reset">Wyczyść formularz</StyledButton>

                  {isSubmit && (
                    <ModalShadow>
                      <ModalContainer>
                        <ModalText>Podsumowanie</ModalText>
                        <div
                          style={{
                            position: "relative",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "50%",
                            }}
                          >
                            <h3>Twoje dane</h3>
                            <p>
                              {values.imie} {values.nazwisko}
                            </p>
                            <p>{values.email}</p>
                            <p>{values.telefon}</p>
                            <p>{values.miasto}</p>
                            <p>{values.ulica}</p>
                            <p>{values.kodPocztowy}</p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "50%",
                            }}
                          >
                            <h3>Umówiona wizyta</h3>
                            <p>
                              {bookingInfo.specjalista.imie}
                              {bookingInfo.specjalista.nazwisko}
                            </p>
                            <p>{values.grupa}</p>
                            <p>{values.usluga}</p>
                            <p>{bookingInfo.data}r.</p>
                            <p>{bookingInfo.godzina}:00</p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <button
                            onClick={() => setIsSubmit(false)}
                            style={styles.buttonStyle}
                          >
                            Anuluj
                          </button>
                          <button type="submit" style={styles.buttonBook}>
                            Potwierdź rezerwacje
                          </button>
                        </div>
                      </ModalContainer>
                    </ModalShadow>
                  )}
                </Form>
              </SideModalContent>
            )}
          </Formik>
        ) : (
          <p>Loading...</p>
        )}
      </SideModalContainer>
    </>
  );
};

export default AdminCreateVisit;
