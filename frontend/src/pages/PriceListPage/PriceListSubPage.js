import React, { useEffect, useState } from 'react'
import {
  PriceListTable,
  PriceTableRow,
  PriceTableContent,
} from './PriceListPageElements'
import ServiceData from '../../services/service'
import { useParams } from 'react-router-dom'

const container = {
  hidden: { y: -100, opacity: 0, scale: 1 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
}


const PriceListSubPage = () => {
  const [currentPathServices, setCurrentPathServices] = useState([])
  let { grupa } = useParams()

  useEffect(() => {
    retrieveServices()
  }, [grupa])

  const retrieveServices = () => {
    ServiceData.getAll().then((response) => {
      const filteredResult = response.data.filter(
        (item) =>
          item.grupa.toLowerCase() === grupa.split('-').join(' ').toLowerCase()
      )
      console.log(filteredResult);
      setCurrentPathServices(filteredResult[0].uslugi)
    })
  }

  const services = currentPathServices.map((service, i) => (
    <PriceTableRow
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: i * 0.2 }}
      key={service._id}
    >
      <PriceTableContent>{service.nazwa}</PriceTableContent>
      <PriceTableContent price>{service.cena}</PriceTableContent>
    </PriceTableRow>
  ))

  return (
    <>
      <PriceListTable variants={container} initial='hidden' animate='visible'>
        <PriceTableRow primary>
          <PriceTableContent>Usługa</PriceTableContent>
          <PriceTableContent price>Cena</PriceTableContent>
        </PriceTableRow>
        {services}
        {/* {arr.map((item, i) => (
          <motion.div
            key={item.nazwa}
            initial={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3, delay: i * 0.2 }}
          >
            <div>
              <p>{item.nazwa}</p>
              <p>{item.cena}</p>
            </div>
          </motion.div>
        ))}
        <PriceTableRow variants={item}>
          <PriceTableContent>test</PriceTableContent>
          <PriceTableContent price>55</PriceTableContent>
        </PriceTableRow> */}
      </PriceListTable>
    </>
  )
}

export default PriceListSubPage
