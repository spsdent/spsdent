import React, { useState, useEffect } from "react";
import { Formik, Form, Field, setIn } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { createServiceValidationSchema } from "../../../utils/validationSchemas";

import ServiceData from "../../../services/service";
import { SET_MESSAGE } from "../../../store/actions/types";
import { clearMessage } from "../../../store/actions/message";
import {
  StyledContainer,
  StyledHeading,
  StyledField,
  ErrorText,
  UserText,
  SubTitle,
  StyledButton,
} from "..//ControlPanelPageElements";

const NewService = () => {
  let initialState = {
    grupa: "",
  };
  const [inputArr, setInputArr] = useState([{}]);
  const [services, setServices] = useState(initialState);
  const [servicesArr, setServicesArr] = useState([]);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveSpecializations();
  }, []);

  const retrieveSpecializations = () => {
    ServiceData.getAll()
      .then((response) => {
        setServicesArr(response.data);
      })
      .catch((e) => console.log(e));
  };

  const newServiceInput = () => {
    if (inputArr.length > 4) {
      dispatch({
        type: SET_MESSAGE,
        payload: "Maksymalna liczba usług do dodania za jednym razem to 5.",
      });
    } else {
      setInputArr([...inputArr, {}]);
    }
  };

  const deleteInputService = () => {
    setInputArr(inputArr.slice(0, -1));
  };

  const onSubmitHandle = (values) => {
    const servicesToUpdate = servicesArr.filter(
      (service) => service.grupa === values.grupa
    );
    const { grupa, ...uslugi } = values;
    let obj = [];
    if ("u1nazwa" in uslugi) {
      for (let i = 0; i < inputArr.length; i++) {
        if (uslugi[`u${i + 1}nazwa`]) {
          obj = [
            ...obj,
            {
              nazwa: uslugi[`u${i + 1}nazwa`],
              cena: uslugi[`u${i + 1}cena`],
            },
          ];
        }
      }
    }
    let servicesObj = { grupa: grupa, uslugi: [...obj] };
    if (servicesToUpdate.length) {
      dispatch({
        type: SET_MESSAGE,
        payload: "Ta specjalizacja znajduje się w kolekcji",
      });
      setInputArr([{}]);
      setServices({
        ...values,
      });
    } else {
      ServiceData.create(servicesObj)
        .then((response) => {
          dispatch({
            type: SET_MESSAGE,
            payload: "Specjalizacja została utworzona!",
          });
        })
        .catch((e) => console.log(e));
      setInputArr([{}]);
      setServices({
        grupa: "",
        u1nazwa: "",
        u1cena: null,
        u2nazwa: "",
        u2cena: null,
        u3nazwa: "",
        u3cena: null,
        u4nazwa: "",
        u4cena: null,
        u5nazwa: "",
        u5cena: null,
      });
    }
  };

  return (
    <StyledContainer>
      <SubTitle>Dodaj specjalizację</SubTitle>
      <Formik
        enableReinitialize
        initialValues={services}
        validationSchema={createServiceValidationSchema}
        onSubmit={(values, actions) => {
          onSubmitHandle(values);
          actions.resetForm();
        }}
      >
        {({ errors, touched, values, handleBlur, setValues }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StyledField
              placeholder="Nazwa grupy usług"
              name="grupa"
              onBlur={handleBlur}
              type="text"
            />
            {errors.grupa && touched.grupa ? (
              <ErrorText primary>{errors.grupa}</ErrorText>
            ) : null}
            {values.grupa && (
              <>
                {inputArr.map((item, index) => (
                  <React.Fragment key={index}>
                    <UserText>Usługa {index + 1} </UserText>
                    <StyledField
                      type="text"
                      placeholder="Nazwa usługi"
                      name={`u${index + 1}nazwa`}
                      onBlur={handleBlur}
                    />
                    {errors[`u${index + 1}nazwa`] &&
                    touched[`u${index + 1}nazwa`] ? (
                      <ErrorText primary>
                        {errors[`u${index + 1}nazwa`]}
                      </ErrorText>
                    ) : null}
                    <StyledField
                      type="number"
                      placeholder="Cena usługi"
                      name={`u${index + 1}cena`}
                      onBlur={handleBlur}
                    />
                    {errors[`u${index + 1}cena`] &&
                    touched[`u${index + 1}cena`] ? (
                      <ErrorText primary>
                        {errors[`u${index + 1}cena`]}
                      </ErrorText>
                    ) : null}
                  </React.Fragment>
                ))}
                {inputArr.length !== 5 && (
                  <StyledButton type="button" onClick={newServiceInput}>
                    Dodaj kolejną usługę
                  </StyledButton>
                )}
                {inputArr.length > 1 && (
                  <StyledButton type="button" onClick={deleteInputService}>
                    Usuń ostatnią usługę
                  </StyledButton>
                )}
              </>
            )}
            {values.grupa && <StyledButton type="submit">Dodaj</StyledButton>}
            {message && <ErrorText>{message}</ErrorText>}
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default NewService;
