import { useState, useEffect } from 'react'
import DoctorData from '../services/doctor'

export default function useFetchAllDoctors() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    DoctorData.getAll()
      .then((response) => {
        setDoctors(response.data)
      })
      .catch((e) => console.log('Errors in retrieveDoctors'))
  }, [])

  return doctors
}

