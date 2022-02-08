import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ServiceData from "../../../services/service";
import { refreshApp } from "../../../store/actions/refresh";

import {
  StyledContainer,
  SubTitle,
  StyledButton,
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


// funkcja odpowiedzialna za usuniecie uslugi z bazy
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
