import React, { useEffect, useState } from "react";
import VisitDataService from "../../services/visit";
import { useSelector, useDispatch } from "react-redux";
import { refreshApp } from "../../store/actions/refresh";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../../components/PageWrapper";
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
  Triangle,
  VisitsListContainer,
  Visit,
  VisitContent,
  VisitDelete,
} from "./VisitsPageElements";

const VisitsPage = () => {
  const [visitsList, setVisitsList] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { refresh: isRefresh } = useSelector((state) => state);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      currentUser.roles.includes("ROLE_SPEC");
      currentUser.roles.includes("ROLE_ADMIN");
    }
  }, [currentUser]);

  useEffect(() => {
    retrieveVisits();
  }, [isRefresh]);

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status === false);
        if (
          currentUser.roles.includes("ROLE_ADMIN") ||
          currentUser.roles.includes("ROLE_SPEC")
        ) {
          setVisitsList(visitsArr);
        } else {
          const userVisitsArr = response.data.filter(
            (visit) => visit.uid === currentUser.id
          );
          setVisitsList(userVisitsArr);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteVisit = (item) => {
    VisitDataService.remove(item.id)
      .then((response) => {
        console.log("Usunieto wizyte pomyslnie!");
        dispatch(refreshApp());
      })
      .catch((e) => console.log(e));
  };

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, { state: item });
  };

  return (
    <PageWrapper>
      <VisitsPageContainer>
        <VisitsPageTitleContainer>
          <VisitsPageTitle>Aktualne</VisitsPageTitle>
          <VisitsPageTitle primary>Rezerwacje</VisitsPageTitle>
        </VisitsPageTitleContainer>
        <VisitsContainer>
          <Headers>
            <Header primary>
              <HeaderText>usługa</HeaderText> <Triangle />
            </Header>
            <Header>
              <HeaderText>lekarz</HeaderText> <Triangle />
            </Header>
            <Header>
              <HeaderText>data</HeaderText> <Triangle />
            </Header>
            <Header>
              <HeaderText>godzina</HeaderText> <Triangle />
            </Header>
            <Header>
              <HeaderText>cena</HeaderText> <Triangle />
            </Header>
          </Headers>
          <VisitsListContainer>
            {visitsList.map((item) => (
              <Visit onClick={() => goToVisit(item)}>
              <VisitContent primary>{item.usluga}</VisitContent>
              <VisitContent >Leno Paleno</VisitContent>
              <VisitContent >{item.data}</VisitContent>
              <VisitContent >{item.godzina}</VisitContent>
              <VisitContent >{item.cena}zł</VisitContent>
              <VisitDelete onClick={() => deleteVisit(item)}><FaTrashAlt/></VisitDelete>
          </Visit>
            ))}
          </VisitsListContainer>
        </VisitsContainer>
      </VisitsPageContainer>
      <Pattern
          src="Pattern.png"
          top={"18%"}
          left={"65%"}
          transition={{ duration: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
        />
        <Pattern
          src="Pattern.png"
          top={"70%"}
          left={"13%"}
          transition={{ duration: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
    </PageWrapper>
  );
};

export default VisitsPage;
