import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'

import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, getDay } from 'date-fns'
import pl from 'date-fns/locale/pl'

import VisitData from '../../services/visit'
import { refreshApp } from '../../store/actions/refresh'
import { addVisitUserValidationSchema } from '../../utils/validationSchemas'
import { PageWrapper } from '../../components/PageWrapper'

import { initialAddVisitValues, minDate } from '../../helpers'
import {
  useFetchAllDoctors,
  useFetchAllServices,
  useFetchAllVisits,
  useFetchAllUsers,
} from '../../hooks'

import {
  AddVisitContainer,
  FormButton,
  FormColumn,
  FormContainer,
  FormError,
  FormInput,
  ModalContainer,
  ModalVisitContentContainer,
  ModalVisitData,
  ModalVisitDataLabel,
  ModalVisitDataText,
  ModalVisitTextContainer,
  Title,
  TitleContainer,
} from './AddVisitPageElements'

import {
  ModalShadow,
  ModalText,
  ModalButtonsContainer,
} from '../VisitPage/VisitPageElements'
import { StyledModalButton } from '../TimesheetPage/AdminCreateVisitElements'
import HashLoader from 'react-spinners/HashLoader'

const MyStyledSelect = FormInput.withComponent('select')

const AddVisitAuthUser = () => {
  // definiowanie stanów, które będą wkorzystywane w komponencie
  const [visit, setVisit] = useState(initialAddVisitValues)
  const [serviceGroupSelected, setServiceGroupSelected] = useState('')
  const [serviceSelected, setServiceSelected] = useState('')
  const [doctorSelected, setDoctorSelected] = useState('')
  const [selectedServicePrice, setSelectedServicePrice] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // rejestrowanie polskich znaków dla kalendarza
  registerLocale('pl', pl)

  // tutaj redux zwraca obiekt z informacjami o aktualnie zalogowanym użytkowniku
  const { user: currentUser } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  let navigate = useNavigate()

  // hooki pomocnicze do, w których znajdują się funkcje do pobierania informacji z bazki
  // są w folderze hooks
  const allVisitsFromDb = useFetchAllVisits()
  const allServicesFromDb = useFetchAllServices()
  const allDoctorsFromDb = useFetchAllDoctors()
  const allUsersFromDb = useFetchAllUsers()

  useEffect(()=>{
    setIsLoading(true)
    if(allVisitsFromDb.length > 0) {
      setIsLoading(false)
    }
  },[allVisitsFromDb])


  // funkcja odpowiedzialna za dodawanie wizyt
  const createVisit = (values) => {
    // destrukturyzacja wlasciwosci obiektu currentUser
    const { imie, nazwisko, email, telefon, miasto, kodPocztowy, ulica, id } =
      currentUser

    // desktrukturyzacja wlasciwosci z obiektu values, ktory jest obiektem formularza - zawiera wartosci z formularza
    const { grupa, usluga, specjalista, data, godzina, status } = values

    // przeszukuje kolekcje uzytkownicy zeby znalezc uzytkownika w bazie odpowiadajacego temu co wybrany zostal w formularzu
    const doctor = allUsersFromDb.find((user) => user._id === specjalista)

    // obiekt ktory bedzie przekazany do kontrolera zeby utworzyc wizyte w bazie
    let visitData = {
      grupa,
      usluga,
      specjalista: {
        sid: specjalista,
        imie: doctor.imie,
        nazwisko: doctor.nazwisko,
      },
      data,
      godzina,
      imie,
      nazwisko,
      email,
      telefon,
      miasto,
      kodPocztowy,
      ulica,
      status,
      cena: selectedServicePrice,
      uid: currentUser !== null ? id : null,
    }

    // to odpowiada za tworzenie wizyty - VisitData daje ruta znajdujacego sie w services/visit - ktory przyjmuje obiekt(visitData)
    // ktory jest przekazywany potem do backendu do kontrolera zeby utworzyc wizyte
    VisitData.create(visitData)
      .then((response) => {
        // funkcja z reduxa odpowiedzialna za zmiane stanu, ktora przydaje sie do odswiezania na biezaco komponentow
        dispatch(refreshApp())
        // nawigacja od razu do podstrony wizyty po utworzeniu wizyty
        navigate('/wizyty')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  // funkcja odpowiedzialna za wyswietlanie dostepnych w bazie grup uslug
  const onServiceGroupSelect = (values) => {
    // ten if jest tutaj po to zeby wyczyscic pola formularza jesli wybralismy juz opcje w formularzu,
    // ale nagle chcemy zmienic tylko grupe - to zeby wszystkie pozostale pola czyscilo i nie wypierdalalo bledow
    if (serviceGroupSelected !== values.grupa) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
      values.usluga = ''
      setDoctorSelected(null)
      setStartDate(null)
      setServiceSelected('')
    }

    // ustawienie wartosci stanu na wartosc wybranej grupy
    setServiceGroupSelected(values.grupa)

    // pobieranie z kolekcji doktorzy tylko specjalnosci i splaszczanie tablic zeby byly jednowymiarowe
    const doctorsSpecArr = allDoctorsFromDb
      .map((item) => item.specjalnosci)
      .flat()

    // tutaj zwracam tablice z uslugami jakie sa przypisane do istniejacych w bazie lekarzy,
    // zeby nie miec w selectcie opcji, ktore nie sa przypisane do lekarzy
    const servicesAssigned = allServicesFromDb.filter((service) =>
      doctorsSpecArr.includes(service._id)
    )

    // tutaj kolejne czyszczenia w zaleznosci co jest wybrane, a co nie w formularzu
    if (serviceGroupSelected && !serviceSelected) {
      values.specjalista = ''
      values.data = ''
      values.godzina = ''
      setDoctorSelected(null)
      setStartDate(null)
    } else if (!serviceGroupSelected) {
      setServiceSelected(null)
      setDoctorSelected(null)
      values.usluga = ''
      values.data = ''
      values.godzina = ''
      setStartDate(null)
    }

    // tutaj sa zwracane opcje do selecta - grupy jakie sa uzywane przez istniejacych lekarzy
    return servicesAssigned.map((service) => (
      <option value={service.grupa}> {service.grupa} </option>
    ))
  }

  // funkcja odpowiedzialna za wyswietlenie konrketnych uslug dla wybranej grupy
  const onServiceSelect = (values) => {
    // tutaj w tej zmiennej przechowywana jest tablica zawierajaca uslugi tej grupy ktora zostala wybrana w pierwszym polu formularza

    const selectedGroupServices = allServicesFromDb
      .filter((service) => service.grupa === serviceGroupSelected)
      .map((service) => service.uslugi)
      .flatMap((item) => item)

    // tutaj znowu czyszczenie pól formularza
    if (serviceSelected && !doctorSelected) {
      values.godzina = ''
      values.data = ''
      setStartDate(null)
    } else if (!serviceSelected) {
      values.godzina = ''
      values.data = ''
      setDoctorSelected('')
      setStartDate(null)
    }

    // ustawianie wartosci stanu dla serviceSelected na wartosc wybranej uslugi w formularzu
    setServiceSelected(values.usluga)

    // zwracanie uslug ktore zostaly dopasowane w bazie do wybranej grupy
    return selectedGroupServices.map((item) => (
      <option value={item.nazwa}> {item.nazwa} </option>
    ))
  }

  // tutaj sobie grupuje wizyty w bazie zeby miec info ile na jaki dzien juz dzien, przyda sie do wykluczania dat w kalendarzu
  const counts = allVisitsFromDb.reduce(
    (acc, value) => ({
      ...acc,
      [value.data]: (acc[value.data] || 0) + 1,
    }),
    {}
  )

  // tworze sobie tablice z dzisiejsza data to akurat jest potrzebne temu kalendarzowi przy wykluczaniu dat
  let arrToReturn = [new Date()]

  // tutaj robie sobie taka podstawowa tablice z datami do wykluczenia - ona bedzie potem rozszerzana o kolejne
  let datesToExclude = Object.entries(counts)
    .filter((item) => item[1] > 7)
    .map((item) => [
      ...arrToReturn,
      addDays(new Date(), +item[0].split('.')[0] - new Date().getDate()),
    ])
    .flat()

  // ta tablica bedzie podana do kalendarza - z ostatecznymi datami do wykluczania
  let toExclude = []

  // funkcja sluzaca do wyswietlania lekarzy, ktorzy maja przypisana do siebie wybrana wczesniej grupe uslug
  const onDoctorSelect = (values) => {
    // wyszukuje w bazie grupy tej samej co wybrana zostala w formularzu i zwracam jej dane
    const selectedGroupData = allServicesFromDb.find(
      (service) => service.grupa === serviceGroupSelected
    )

    // zapisuje do stanu lekarza informacje o lekarzu
    setDoctorSelected(values.specjalista)

    let doctorsToDisplay = []

    // tutaj sprawdzam czy w formularzu zostala wybrana grupa i usluga jesli tak to:
    if (serviceSelected && serviceGroupSelected) {
      // przeszukuje kolekcje lekarzy w celu znaleznia tych lekarzy ktorzy maja przypisana do siebie grupe uslug
      // taka jaka zostala wybrana w formularzu
      const selectedGroupDoctors = allDoctorsFromDb
        .filter((doctor) => doctor.specjalnosci.includes(selectedGroupData._id))
        .map((item) => item.doctorId)

      // tutaj przeszukuje sobie kolekcje z uzytkownikami zeby pobrac uzytkownikow(lekarz) ktorzy zostali dopasowani
      // w selectedGroupDoctors - przeszukuje wszystkich uzytkownikow poniewaz w kolekcji lekarze nie przechowuje danych o uzytkowniku
      // tylko id zeby móc przeszukac wlasnie tablice uzytkownikow i dopasowac lekarza
      doctorsToDisplay = allUsersFromDb.filter((user) =>
        selectedGroupDoctors.includes(user._id)
      )

      // tutaj sobie grupuje wizyty wybranego lekarza, zeby ułatwic sobie robote z wykluczaniem dat w kalendarzu
      const doctorDatesToExclude = allVisitsFromDb
        .filter((visit) => visit.specjalista.sid === values.specjalista)
        .map((item) => item.data)
        .reduce((cnt, cur) => ((cnt[cur] = cnt[cur] + 1 || 1), cnt), {})

      // szukam w kolekcji lekarzy lekarza, ktorego id jest takie same jak wybranego w formularzu i zwracam jego dane
      // przyda mi sie to zeby wiedziec ile godzin pracuje lekarz, zeby moc wykluczyc date na zasadzie ze pracuje 3h, to max. 3 wizyty z taka
      // sama data moze miec
      const foundDoctor = allDoctorsFromDb.find(
        (doctor) => doctor.doctorId === values.specjalista
      )

      // a tutaj dodaje te daty do wykluczenia do tablicy 
      toExclude = Object.entries(doctorDatesToExclude)
        .filter((item) => item[1] > foundDoctor.godzinyPracy.length - 1)
        .map((item) => [
          ...datesToExclude,
          addDays(new Date(), +item[0].split('.')[0] - new Date().getDate()),
        ])
        .flat()
    }

    // czyszczenie pola daty i godziny jesli lekarz nie jest wybrany
    if (!doctorSelected) {
      values.godzina = ''
      setStartDate(null)
    }

    // wyswietlanie lekarzy majacych przypisana do siebie wybrana grupe w formularzu
    return doctorsToDisplay.map((doctor) => (
      <option value={`${doctor._id}`}>
        {doctor.imie} {doctor.nazwisko}
      </option>
    ))
  }

  // wyswietlanie dostepnych godzin na wizyte
  const onHourSelect = (values) => {
    // przeszukuje kolekcje lekarzy zeby zwrocic informacje o wybranym w formularzu lekarzu
    const selectedDoctorData = allDoctorsFromDb.find(
      (doctor) => doctor.doctorId === doctorSelected
    )

    const today = new Date()

    let updatedHours = []

    // tutaj jesli wszystkie wczesniejsze pola formularza sa wybrane to:
    if (
      serviceSelected &&
      serviceGroupSelected &&
      startDate &&
      doctorSelected
    ) {
      // szukam ceny wybranej uslugi
      const servicePrice = allServicesFromDb
        .filter((service) => service.grupa === serviceGroupSelected)[0]
        .uslugi.filter((usluga) => usluga.nazwa === serviceSelected)[0]
      // zapis dopasowanej ceny do stanu
      setSelectedServicePrice(servicePrice.cena)

    // szukam w kolekcji wizyt z taka sama data jaka zostala wybrana w formularzu i w dodatku tego konkretnego wybranego lekarza
    // a nastepnie zwracam same godziny tych wizyt
      const currentDayDoctorBookedHours = allVisitsFromDb
        .filter(
          (visit) =>
            visit.data.split('.')[0] === values.split('.')[0] &&
            visit.specjalista.sid === `${selectedDoctorData.doctorId}`
        )
        .map((item) => +item.godzina)

      // najpierw szukam godziny, ktore nie zostaly uzyte do rezerwacji wizyty,
      // nastepnie sprawdzam czy wybrana data w formularzu jest taka sama jak dziś - jesli wybrana data w formularzu jest taka sama jak dzis
      // to zwracam tylko te godziny z pozostalych lekarza, ktore sa wieksze od obecnej godziny
      // zalozmy ze lekarz pracuje od 8 do 16
      // ma danego dnia zarezerwowane godziny 8 i 9 - i te godziny sa w tablicy currentDayDoctorHours
      // nastepnie sprawdzam jakie godziny pozostaly wolne czyli od 10 do 16 i je zwracam
      // ale chce zeby np. jak jest 13:13 to zebym nie mogl zabookowac juz na 10, 11, 12 i 13 bo te godziny wlasnie mineły, to muszę je z
      // tych pozostalych lekarza wyrzucic i wlasnie to robie w tym ifie w drugim filter na dole
      updatedHours = selectedDoctorData.godzinyPracy
        .filter((item) => !currentDayDoctorBookedHours.includes(item))
        .filter((hour) => {
          if (today.getDate() === values.split('.')[0]) {
            return hour > today.getHours()
          } else {
            return hour
          }
        })
    }

    // tutaj zwracam godziny do wyswietlenia w selectcie
    return updatedHours.map((item) => (
      <option value={`${item}`} key={`${item}`}>{`${item}`}</option>
    ))
  }

  // tutaj funkcja pomocnicza do zablokowania weekendow w kalendarzu
  const isWeekday = (date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && <AddVisitContainer>
        <TitleContainer>
          <Title>Zarezerwuj</Title>
          <Title primary>Wizytę</Title>
        </TitleContainer>
        {allDoctorsFromDb.length > 0 ? (
          <Formik
            enableReinitialize
            initialValues={visit}
            validationSchema={addVisitUserValidationSchema}
            onSubmit={() => setIsSubmit(true)}
            onReset={() => setVisit(initialAddVisitValues)}
          >
            {({
              errors,
              touched,
              values,
              setValues,
              resetForm,
              handleBlur,
            }) => (
              <Form>
                <FormContainer>
                  <FormColumn>
                    <Field as={MyStyledSelect} name='grupa' onBlur={handleBlur}>
                      <option value=''> Wybierz grupę usługi... </option>
                      {onServiceGroupSelect(values)}
                    </Field>
                    <ErrorMessage name='grupa'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      as={MyStyledSelect}
                      name='usluga'
                      onBlur={handleBlur}
                      disabled={!serviceGroupSelected}
                    >
                      <option value=''> Wybierz usługę... </option>
                      {onServiceSelect(values)}
                    </Field>
                    <ErrorMessage name='usluga'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      as={MyStyledSelect}
                      name='specjalista'
                      onBlur={handleBlur}
                      disabled={!serviceSelected}
                    >
                      <option value=''> Wybierz specjalistę... </option>
                      {onDoctorSelect(values)}
                    </Field>
                    <ErrorMessage name='specjalista'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <DatePicker
                      disabled={!doctorSelected}
                      selected={startDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={(date) => {
                        setStartDate(date)
                        values.data = `${date.getDate()}.${
                          date.getMonth() + 1
                        }.${date.getFullYear()}`
                        setValues(values)
                      }}
                      minDate={minDate}
                      placeholderText='Wybierz termin wizyty'
                      filterDate={isWeekday}
                      excludeDates={toExclude}
                      name='data'
                      onBlur={handleBlur}
                      withPortal
                      locale='pl'
                    />
                    <ErrorMessage name='data'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>
                    <Field
                      disabled={!values.data}
                      as={MyStyledSelect}
                      name='godzina'
                      onBlur={handleBlur}
                    >
                      <option value=''> Wybierz godzinę... </option>
                      {onHourSelect(values.data)}
                    </Field>
                    <ErrorMessage name='godzina'>
                      {(msg) => <FormError>{msg}</FormError>}
                    </ErrorMessage>

                    <FormButton type='submit'>Podsumowanie</FormButton>
                    <FormButton type='reset'>Wyczyść formularz</FormButton>
                    {isSubmit && (
                      <ModalShadow>
                        <ModalContainer>
                          <ModalText>Podsumowanie</ModalText>
                          <ModalVisitContentContainer>
                            <ModalVisitData>
                              <h3>Twoje dane</h3>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Imie i nazwisko
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.imie} {currentUser.nazwisko}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  E-mail
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.email}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Telefon
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.telefon}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Miasto
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.miasto}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>Ulica</ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.ulica}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Kod-pocztowy
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {currentUser.kodPocztowy}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                            </ModalVisitData>
                            <ModalVisitData>
                              <h3>Umówiona wizyta</h3>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>Grupa</ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {values.grupa}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Usługa
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {values.usluga}
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Data wizyty
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {values.data}r.
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                              <ModalVisitTextContainer>
                                <ModalVisitDataLabel>
                                  Godzina wizyty
                                </ModalVisitDataLabel>
                                <ModalVisitDataText>
                                  {values.godzina}:00
                                </ModalVisitDataText>
                              </ModalVisitTextContainer>
                            </ModalVisitData>
                          </ModalVisitContentContainer>
                          <ModalButtonsContainer>
                            <StyledModalButton
                              onClick={() => setIsSubmit(false)}
                            >
                              Anuluj
                            </StyledModalButton>
                            <StyledModalButton
                              onClick={() => {
                                createVisit(values)
                                resetForm()
                                setIsSubmit(false)
                              }}
                            >
                              Potwierdź rezerwację
                            </StyledModalButton>
                          </ModalButtonsContainer>
                        </ModalContainer>
                      </ModalShadow>
                    )}
                  </FormColumn>
                </FormContainer>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Przykro nam, ale nie oferujemy żadnych usług</p>
        )}
      </AddVisitContainer>}
    </PageWrapper>
  )
}

export default AddVisitAuthUser
