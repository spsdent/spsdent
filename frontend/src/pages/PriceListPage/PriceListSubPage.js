import React, { useEffect, useState } from 'react'
import {
  PriceListTable,
  PriceTableRow,
  PriceTableContent,
} from './PriceListPageElements'
import ServiceData from '../../services/service'
import { useParams } from 'react-router-dom'

const PriceListSubPage = () => {
  const [currentPathServices, setCurrentPathServices] = useState([])
  let { group } = useParams()

  useEffect(() => {
    retrieveServices()
  }, [group])

  const retrieveServices = () => {
    ServiceData.getAll().then((response) => {
      const filteredResult = response.data.filter(
        (item) =>
          item.grupa.toLowerCase() === group.split('-').join(' ').toLowerCase()
      )
      setCurrentPathServices(filteredResult[0].uslugi)
      console.log(currentPathServices)
    })
  }

  const container = {
    hidden: { y: -100, opacity: 0, scale: 1 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }
  return (
    <>
      <PriceListTable variants={container} initial='hidden' animate='visible'>
        <PriceTableRow primary>
          <PriceTableContent>Usługa</PriceTableContent>
          <PriceTableContent price>Cena</PriceTableContent>
        </PriceTableRow>
        {currentPathServices.map((service) => (
          <PriceTableRow variants={item}>
            <PriceTableContent>{service.nazwa}</PriceTableContent>
            <PriceTableContent price>{service.cena}</PriceTableContent>
          </PriceTableRow>
        ))}
      </PriceListTable>
    </>
  )
}

export default PriceListSubPage
