import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ServiceData from "../../../services/service";
import { refreshApp } from "../../../store/actions/refresh";
import { PageWrapper } from "../../../components/PageWrapper";
import { Container } from "../../ProfilePage/ProfilePageElements";

import styled from "styled-components";
import {
  StyledContainer,
  StyledHeading,
  ButtonControl,
  SubTitle,
  StyledButton,
  ErrorText,
  UserText,
  ServiceWrap,
  DeleteServiceContainer,
} from "..//ControlPanelPageElements";
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../../VisitPage/VisitPageElements";
const StyledLabel = styled.label`
  font-size: 0.813rem;
`;

const StyledHeadingCreate = styled(StyledHeading)`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: "poppins";
`;

const DeleteService = () => {
  const [servicesArr, setServicesArr] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const { isRefresh } = useSelector((state) => state.refresh);
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

  const onServiceDelete = (service) => {
    ServiceData.remove(service)
      .then((response) => {
        dispatch(refreshApp());
        setIsDelete(false);
      })
      .catch((e) => console.log(e));
    console.log(isRefresh);
  };

  return (
    <StyledContainer>
      <SubTitle>Usuń specjalizację</SubTitle>
      <DeleteServiceContainer>
        {servicesArr.map((service) => (
          <ServiceWrap>
            <UserText title>{service.grupa}</UserText>
            {/* {service.uslugi.map((usluga) => (
            <div style={{ margin: '10px 0' }}>
              <p>Nazwa uslugi: {usluga.nazwa}</p>
              <p>Cena uslugi: {usluga.cena}</p>
            </div>
          ))} */}
            <StyledButton
              delete
              onClick={() => {
                setIsDelete(true);
                setServiceToDelete(service._id);
              }}
            >
              Usuń specjalizację
            </StyledButton>
          </ServiceWrap>
        ))}
      </DeleteServiceContainer>
      {isDelete && (
        <ModalShadow>
          <ModalContainer>
            <ModalText>Na pewno chcesz usunąć?</ModalText>
            <ModalButtonsContainer>
              <ModalButton primary onClick={() => setIsDelete(false)}>
                Nie
              </ModalButton>
              <ModalButton
                onClick={() => {
                  onServiceDelete(serviceToDelete);
                }}
              >
                Tak
              </ModalButton>
            </ModalButtonsContainer>
          </ModalContainer>
        </ModalShadow>
      )}
    </StyledContainer>
  );
};

export default DeleteService;
