import React, { useEffect, useState } from 'react'
import VisitDataService from '../../services/visit'
import { useSelector, useDispatch } from 'react-redux'
import { refreshApp } from '../../store/actions/refresh'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../../components/PageWrapper'
import { FaTrashAlt } from 'react-icons/fa'
import { Pattern } from '../../components/Pattern'
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
} from './VisitsPageElements'

const VisitsPage = () => {
  const [visitsList, setVisitsList] = useState([])
  const { user: currentUser } = useSelector((state) => state.auth)
  const { refresh: isRefresh } = useSelector((state) => state)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      currentUser.roles.includes('ROLE_SPEC')
      currentUser.roles.includes('ROLE_ADMIN')
    }
  }, [currentUser])

  useEffect(() => {
    retrieveVisits()
  }, [isRefresh])

  const retrieveVisits = () => {
    VisitDataService.getAll()
      .then((response) => {
        const visitsArr = response.data.filter((item) => item.status === false)
        if (
          currentUser.roles.includes('ROLE_ADMIN') ||
          currentUser.roles.includes('ROLE_SPEC')
        ) {
          setVisitsList(visitsArr)
        } else {
          const userVisitsArr = response.data.filter(
            (visit) => visit.uid === currentUser.id
          )
          setVisitsList(userVisitsArr)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const deleteVisit = (item) => {
    VisitDataService.remove(item.id)
      .then((response) => {
        console.log('Usunieto wizyte pomyslnie!')
        dispatch(refreshApp())
      })
      .catch((e) => console.log(e))
  }

  const goToVisit = (item) => {
    navigate(`/visits/${item.id}`, { state: item })
  }

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
  }
  const itemOne = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  return (
    <PageWrapper>
      <VisitsPageContainer>
        <VisitsPageTitleContainer>
          <VisitsPageTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Aktualne
          </VisitsPageTitle>
          <VisitsPageTitle
            primary
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rezerwacje
          </VisitsPageTitle>
        </VisitsPageTitleContainer>
        <VisitsContainer>
          {visitsList.length > 0 ? (
            <>
              <Headers variants={container} initial='hidden' animate='show'>
                <Header primary>
                  <HeaderText variants={itemOne}>usługa</HeaderText>{' '}
                  <Triangle />
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
              <VisitsListContainer
                variants={container}
                initial='hidden'
                animate='show'
              >
                {visitsList.map((item, i) => (
                  <Visit
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.2 }}
                    key={item._id}
                    onClick={() => goToVisit(item)}
                  >
                    <VisitContent primary>{item.usluga}</VisitContent>
                    <VisitContent>Leno Paleno</VisitContent>
                    <VisitContent>{item.data}</VisitContent>
                    <VisitContent>{item.godzina}:00</VisitContent>
                    <VisitContent>{item.cena}zł</VisitContent>
                    <VisitDelete onClick={() => deleteVisit(item)}>
                      <FaTrashAlt />
                    </VisitDelete>
                  </Visit>
                ))}
              </VisitsListContainer>
            </>
          ) : (
            <VisitsPageTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Brak aktualnych wizyt
            </VisitsPageTitle>
          )}
        </VisitsContainer>
      </VisitsPageContainer>
      <Pattern
        src='Pattern.png'
        top={'12%'}
        left={'70%'}
        transition={{ duration: 0.5 }}
        initial={{ y: -400 }}
        animate={{ y: 0 }}
      />
      <Pattern
        src='Pattern.png'
        top={'70%'}
        left={'13%'}
        transition={{ duration: 1 }}
        initial={{ y: 400 }}
        animate={{ y: 0 }}
      />
    </PageWrapper>
  )
}

export default VisitsPage
