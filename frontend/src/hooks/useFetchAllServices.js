import { useState, useEffect } from 'react'
import ServiceData from '../services/service'

export default function useFetchAllServices() {
  const [services, setServices] = useState([])

  useEffect(() => {
    ServiceData.getAll()
      .then((response) => {
        setServices(response.data)
      })
      .catch((e) => console.log(e))
  }, [])

  return services
}
