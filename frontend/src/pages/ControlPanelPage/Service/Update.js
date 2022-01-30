import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";

import ServiceData from "../../../services/service";
import { refreshApp } from "../../../store/actions/refresh";

import { updateServiceValidationSchema } from "../../../utils/validationSchemas";
import { SET_MESSAGE } from "../../../store/actions/types";
import { clearMessage } from "../../../store/actions/message";

import {
  StyledContainer,
  StyledButton,
  ErrorText,
  SubTitle,
  UserText,
  StyledField,
  StyledButtonContainer,
  DeleteServiceContainer,
  ServiceWrap,
} from "..//ControlPanelPageElements";
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../../VisitPage/VisitPageElements";
const style = {
  border: "2px solid #333",
  backgroundColor: "transparent",
  height: "3em",
  width: "20em",
  paddingLeft: ".5em",
  outline: "none",
  margin: ".2em 0 .5em 0",
  fontFamily: "poppins",
};

const UpdateService = () => {
  const [servicesArr, setServicesArr] = useState([]);
  const [btnType, setBtnType] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [serviceData, setServiceData] = useState("");
  const { isRefresh } = useSelector((state) => state.refresh);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveServices();
  }, [isRefresh]);

  const retrieveServices = () => {
    ServiceData.getAll()
      .then((response) => {
        setServicesArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const addNewService = (values) => {
    const isDuplicate = servicesArr
      .filter((item) => item.grupa === values.grupa)[0]
      .uslugi.filter((usluga) => usluga.nazwa === values.nazwa);
    if (!isDuplicate.length) {
      const serviceToUpdate = servicesArr.filter(
        (service) => service.grupa === values.grupa
      );
      const [serviceObj] = serviceToUpdate;
      serviceObj.uslugi = [
        ...serviceObj.uslugi,
        { nazwa: values.nazwa, cena: values.cena },
      ];
      ServiceData.update(serviceObj._id, serviceObj)
        .then((response) => {
          dispatch({ type: SET_MESSAGE, payload: "Usługa została dodana!" });
          setBtnType("");
          values.nazwa = "";
          values.cena = "";
        })
        .catch((e) => console.log(e));
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: "Ta usługa znajduje się w kolekcji!",
      });
    }
  };

  const onServiceDelete = (service, usluga) => {
    const { _id: serviceId } = service;
    const updatedServiceArr = service.uslugi.filter(
      (serv) => serv._id !== usluga._id
    );
    service.uslugi = updatedServiceArr;
    ServiceData.update(serviceId, service)
      .then((response) => {
        dispatch({ type: SET_MESSAGE, payload: "Usługa została usunięta!" });
        dispatch(refreshApp());
      })
      .catch((e) => console.log(e));
  };

  const onServiceDeleteModal = () => {
    onServiceDelete(serviceData.service, serviceData.usluga);
    setIsDelete(false);
  };

  return (
    <StyledContainer>
      <SubTitle>Zaktualizuj specjalizację</SubTitle>
      <Formik
        initialValues={{ grupa: "", nazwa: "", cena: "" }}
        validationSchema={updateServiceValidationSchema}
        onSubmit={(values) => {
          addNewService(values);
        }}
      >
        {({ values, errors, touched, handleBlur }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Field
              as="select"
              name="grupa"
              onBlur={handleBlur}
              style={style}
              onClick={() => {
                if (!values.grupa) {
                  setBtnType("");
                }
              }}
            >
              <StyledField as="option" value="" disabled>
                Wybierz grupę usług
              </StyledField>
              {servicesArr.map((service) => (
                <StyledField
                  as="option"
                  key={service.grupa}
                  value={service.grupa}
                >
                  {service.grupa}
                </StyledField>
              ))}
            </Field>
            {errors.grupa && touched.grupa ? (
              <ErrorText primary>{errors.grupa}</ErrorText>
            ) : null}
            {values.grupa && (
              <StyledButtonContainer>
                <StyledButton
                  type="button"
                  onClick={() => {
                    dispatch(clearMessage());
                    if (btnType === "dodaj") {
                      setBtnType("");
                    } else {
                      setBtnType("dodaj");
                    }
                  }}
                >
                  Dodaj usługę
                </StyledButton>
                <StyledButton
                  type="button"
                  onClick={() => {
                    dispatch(clearMessage());
                    if (btnType === "usun") {
                      setBtnType("");
                    } else {
                      setBtnType("usun");
                    }
                  }}
                >
                  Usuń usługę
                </StyledButton>
              </StyledButtonContainer>
            )}
            {btnType === "usun" && (
              <>
                {/* <UserText>Wybierz usługę do usunięcia</UserText> */}
                <DeleteServiceContainer>
                  {servicesArr
                    .filter((item) => item.grupa === values.grupa)
                    .map((service) =>
                      service.uslugi.map((usluga, index) => (
                        <ServiceWrap key={index}>
                          <UserText title>{usluga.nazwa}</UserText>
                          <StyledButton
                            delete
                            type="button"
                            onClick={() => {
                              setServiceData({ service, usluga });
                              setIsDelete(true);
                            }}
                          >
                            Usuń
                          </StyledButton>
                        </ServiceWrap>
                      ))
                    )}
                </DeleteServiceContainer>
              </>
            )}
            {btnType === "dodaj" && (
              <>
                {/* <UserText>Dodaj usługę</UserText> */}
                <Field
                  placeholder="Nazwa usługi"
                  name="nazwa"
                  onBlur={handleBlur}
                  type="text"
                  style={style}
                />
                {errors.nazwa && touched.nazwa ? (
                  <ErrorText primary>{errors.nazwa}</ErrorText>
                ) : null}
                <Field
                  placeholder="Cena usługi"
                  name="cena"
                  type="number"
                  onBlur={handleBlur}
                  style={style}
                />
                {errors.cena && touched.cena ? (
                  <ErrorText primary>{errors.cena}</ErrorText>
                ) : null}
                <StyledButton type="submit">Dodaj</StyledButton>
              </>
            )}
            {message && <ErrorText primary>{message}</ErrorText>}
          </Form>
        )}
      </Formik>
      {isDelete && (
        <ModalShadow>
          <ModalContainer>
            <ModalText>Na pewno chcesz usunąć tę usługę?</ModalText>
            <ModalButtonsContainer>
              <ModalButton primary onClick={() => setIsDelete(false)}>Nie</ModalButton>
              <ModalButton onClick={onServiceDeleteModal}>Tak</ModalButton>
            </ModalButtonsContainer>
          </ModalContainer>
        </ModalShadow>
      )}
    </StyledContainer>
  );
};

export default UpdateService;
