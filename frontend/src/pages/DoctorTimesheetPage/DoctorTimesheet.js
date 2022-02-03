import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { addDays, getDay } from "date-fns";
import { useNavigate } from "react-router";

import { PageWrapper } from "../../components/PageWrapper";
import VisitData from "../../services/visit";
import { FaTrashAlt } from "react-icons/fa";
import { Pattern } from "../../components/Pattern";
import {
  VisitsPageContainer,
  VisitsPageTitleContainer,
  VisitsPageTitle,
  VisitsContainer,
  Headers,
  Header,
  HeaderText,
  TriangleAsc,
  TriangleDesc,
  TriangleDescActive,
  VisitsListContainer,
  Visit,
  VisitContent,
  VisitDelete,
  MyPaginate,
} from "../VisitsPage/VisitsPageElements";
import {
  ModalShadow,
  ModalContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButton,
} from "../VisitPage/VisitPageElements";
import useFetchAllUsers from "../../hooks/useFetchAllUsers";
import { refreshApp } from "../../store/actions/refresh";

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DoctorTimesheetPage = () => {
  const [filterPosition, setFilterPosition] = useState({
    usluga: 0,
    lekarz: 0,
    data: 0,
    godzina: 0,
    cena: 0,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [visits, setVisits] = useState([]);
  const [selectedDateVisits, setSelectedDateVisits] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isDelete, setIsDelete] = useState(false);
  const [visitId, setVisitId] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const visitsPerPage = 5;
  const pagesVisited = pageNumber * visitsPerPage;
  const allUsers = useFetchAllUsers();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    retrieveVisits();
  }, []);

  const retrieveVisits = () => {
    VisitData.getAll().then((response) => {
      const currentUserVisits = response.data.filter(
        (visit) =>
          visit.specjalista.sid === currentUser.id && visit.status === false
      );
      setVisits(currentUserVisits);
    });
  };

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const onDateSelect = (date) => {
    setSelectedDate(date);
    let selectedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    const selectedDateVisitsArr = visits.filter(
      (visit) => visit.data === selectedDate
    );
    setSelectedDateVisits(selectedDateVisitsArr);
  };

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, {
      state: { item: item, bRoute: "timesheet" },
    });
  };

  const onVisitDelete = () => {
    setIsDelete(false);
    VisitData.remove(visitId.id)
      .then((response) => {
        console.log("Usunieto wizyte pomyslnie!");
        dispatch(refreshApp());
      })
      .catch((e) => console.log(e));
  };

  const displayVisits = selectedDateVisits
    .slice(pagesVisited, pagesVisited + visitsPerPage)
    .map((visit, i) => {
      if (allUsers.length > 0) {
        return (
          <>
            <Visit
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.2 }}
              key={visit._id}
              onClick={() => goToVisit(visit)}
            >
              <VisitContent primary>{visit.usluga}</VisitContent>
              <VisitContent>
                {`${visit.specjalista.imie} ${visit.specjalista.nazwisko}`}
              </VisitContent>
              <VisitContent>{visit.data}</VisitContent>
              <VisitContent>{visit.godzina}:00</VisitContent>
              <VisitContent>{visit.cena}zł</VisitContent>
              <VisitDelete
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDelete(true);
                  setVisitId(visit);
                }}
              >
                <FaTrashAlt />
              </VisitDelete>
            </Visit>
          </>
        );
      }
    });

  const pageCount = Math.ceil(selectedDateVisits.length / visitsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const onFilterByService = () => {
    if (filterPosition.usluga === 0) {
      const descArr = selectedDateVisits.sort((a, b) =>
        b.usluga.toLowerCase() > a.usluga.toLowerCase() ? 1 : -1
      );
      setSelectedDateVisits(descArr);
      setFilterPosition({ usluga: 1, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    } else if (filterPosition.usluga === 1) {
      const ascArr = selectedDateVisits.sort((a, b) =>
        a.usluga.toLowerCase() > b.usluga.toLowerCase() ? 1 : -1
      );
      setSelectedDateVisits(ascArr);
      setFilterPosition({ usluga: 2, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    } else if (filterPosition.usluga === 2) {
      retrieveVisits();
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    }
  };

  const onFilterBySpecialist = () => {
    if (filterPosition.lekarz === 0) {
      const descArr = selectedDateVisits.sort((a, b) =>
        b.specjalista.nazwisko.toLowerCase() >
        a.specjalista.nazwisko.toLowerCase()
          ? 1
          : -1
      );
      setSelectedDateVisits(descArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 1 });
    } else if (filterPosition.lekarz === 1) {
      const ascArr = selectedDateVisits.sort((a, b) =>
        a.specjalista.nazwisko.toLowerCase() >
        b.specjalista.nazwisko.toLowerCase()
          ? 1
          : -1
      );
      setSelectedDateVisits(ascArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 2 });
    } else if (filterPosition.lekarz === 2) {
      retrieveVisits();
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    }
  };

  const onFilterByDate = () => {
    if (filterPosition.data === 0) {
      const descArr = selectedDateVisits.sort((a, b) => {
        let aa = a.data.split(".").reverse().join();
        let bb = b.data.split(".").reverse().join();
        return aa > bb ? -1 : aa > bb ? 1 : 0;
      });
      setSelectedDateVisits(descArr);
      setFilterPosition({ usluga: 0, data: 1, godzina: 0, cena: 0, lekarz: 0 });
    } else if (filterPosition.data === 1) {
      const ascArr = selectedDateVisits.sort((a, b) => {
        let aa = a.data.split(".").reverse().join();
        let bb = b.data.split(".").reverse().join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
      setSelectedDateVisits(ascArr);
      setFilterPosition({ usluga: 0, data: 2, godzina: 0, cena: 0, lekarz: 0 });
    } else if (filterPosition.data === 2) {
      retrieveVisits();
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    }
  };

  const onFilterByHour = () => {
    if (filterPosition.godzina === 0) {
      const descArr = selectedDateVisits.sort((a, b) => b.godzina - a.godzina);
      setSelectedDateVisits(descArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 1, cena: 0, lekarz: 0 });
    } else if (filterPosition.godzina === 1) {
      const ascArr = selectedDateVisits.sort((a, b) => a.godzina - b.godzina);
      setSelectedDateVisits(ascArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 2, cena: 0, lekarz: 0 });
    } else if (filterPosition.godzina === 2) {
      retrieveVisits();
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    }
  };

  const onFilterByPrice = () => {
    if (filterPosition.cena === 0) {
      const descArr = selectedDateVisits.sort((a, b) => b.cena - a.cena);
      setSelectedDateVisits(descArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 1, lekarz: 0 });
    } else if (filterPosition.cena === 1) {
      const ascArr = selectedDateVisits.sort((a, b) => a.cena - b.cena);
      setSelectedDateVisits(ascArr);
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 2, lekarz: 0 });
    } else if (filterPosition.cena === 2) {
      retrieveVisits();
      setFilterPosition({ usluga: 0, data: 0, godzina: 0, cena: 0, lekarz: 0 });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 1,
        staggerChildren: 1,
      },
    },
  };
  const itemOne = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <VisitsPageTitleContainer>
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Grafik
          </VisitsPageTitle>
        </VisitsPageTitleContainer>
        <DatePicker
          selected={false}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => onDateSelect(date)}
          filterDate={isWeekday}
          name="data"
          inline
        />
        <VisitsPageContainer>
          <VisitsContainer>
            {selectedDate !== null ? (
              selectedDateVisits.length > 0 ? (
                <>
                  <Headers variants={container} initial="hidden" animate="show">
                    <Header primary onClick={onFilterByService}>
                      <HeaderText variants={itemOne}>usługa</HeaderText>
                      {filterPosition.usluga === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.usluga === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterBySpecialist}>
                      <HeaderText>lekarz</HeaderText>
                      {filterPosition.lekarz === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.lekarz === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByDate}>
                      <HeaderText>data</HeaderText>
                      {filterPosition.data === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.data === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByHour}>
                      <HeaderText>godzina</HeaderText>
                      {filterPosition.godzina === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.godzina === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                    <Header onClick={onFilterByPrice}>
                      <HeaderText>cena</HeaderText>
                      {filterPosition.cena === 0 ? (
                        <TriangleDesc />
                      ) : filterPosition.cena === 1 ? (
                        <TriangleDescActive />
                      ) : (
                        <TriangleAsc />
                      )}
                    </Header>
                  </Headers>
                  <VisitsListContainer
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {displayVisits}
                    <MyPaginate
                      previousLabel={"Poprzednia strona"}
                      nextLabel={"Następna strona"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                    />
                  </VisitsListContainer>
                </>
              ) : (
                <VisitsPageTitle
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Brak wizyt tego dnia
                </VisitsPageTitle>
              )
            ) : (
              <VisitsPageTitle
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Wybierz datę
              </VisitsPageTitle>
            )}
          </VisitsContainer>
        </VisitsPageContainer>
        {isDelete && (
          <ModalShadow>
            <ModalContainer>
              <ModalText>Na pewno chcesz usunąć wizytę?</ModalText>
              <ModalButtonsContainer>
                <ModalButton primary onClick={() => setIsDelete(false)}>
                  Nie
                </ModalButton>
                <ModalButton onClick={onVisitDelete}>Tak</ModalButton>
              </ModalButtonsContainer>
            </ModalContainer>
          </ModalShadow>
        )}
      </StyledContainer>
    </PageWrapper>
  );
};

export default DoctorTimesheetPage;
