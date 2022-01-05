import { useState, useEffect } from 'react'

export default function useCreateDates() {
  const [dates, setDates] = useState([])

  useEffect(() => {
    const today = new Date()
    let arrOfDays = []
    for (let i = 0; i < 6; i++) {
      arrOfDays.push({
        dateId: {
          date: `${today.getDate() + i}`,
          month: `${today.getMonth()}`,
        },
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + i
        ),
      })
    }
    let updatedDates = []
    updatedDates = arrOfDays.filter(
      (item) => item.dateId.date == today.getDate() && today.getHours() <= 16
    )
    if (today.getHours() >= 16) {
      updatedDates = arrOfDays.filter(
        (item) => item.dateId.date != today.getDate()
      )
      setDates(updatedDates)
    } else {
      setDates([...arrOfDays])
    }
  }, [])

  return dates
}
