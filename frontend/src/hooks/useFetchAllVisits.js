import { useState, useEffect } from 'react'
import VisitData from '../services/visit'

export default function useFetchAllVisits() {
  const [visits, setVisits] = useState([])

  useEffect(() => {
    VisitData.getAll()
      .then((response) => {
        setVisits(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return visits
}
