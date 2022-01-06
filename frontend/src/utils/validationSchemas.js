import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('Wpisz poprawny adres e-mail')
    .label('E-mail'),
  password: Yup.string().required('Haslo jest wymagane').label('Haslo'),
})

export const passwordChangeValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('Wpisz poprawny adres e-mail')
    .label('E-mail'),
  oldPassword: Yup.string()
    .required('Stare haslo jest wymagane')
    .label('Stare haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
  newPassword: Yup.string()
    .required('Nowe haslo jest wymagane')
    .label('Nowe haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})

export const signupValidationSchema = Yup.object().shape({
  imie: Yup.string()
    .min(3, 'Imie musi miec co najmniej 3 znaki')
    .max(25, 'Imie moze miec maksymalnie 25 znakow')
    .required('Imie jest wymagane'),
  nazwisko: Yup.string()
    .min(3, 'Nazwisko musi miec co najmniej 3 znaki')
    .max(50, 'Nazwisko moze miec maksymalnie 50 znakow')
    .required('Nazwisko jest wymagane'),
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('E-mail jest wymagany')
    .label('E-mail'),
  password: Yup.string()
    .required('Haslo jest wymagane')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
  telefon: Yup.string()
    .required('Numer telefonu jest wymagany')
    .matches(/^\d{9}$/, 'Numer telefonu jest wymagany (9 cyfr)'),
  miasto: Yup.string()
    .min(3, 'Miasto musi miec co najmniej 3 znaki')
    .max(50, 'Miasto moze miec maksymalnie 50 znakow')
    .required('Miasto jest wymagana'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.string()
    .required('Kod-pocztowy jest wymagany')
    .matches(/^\d{5}$/, 'Kod-pocztowy jest wymagany (5 cyfr) - bez(-)'),
})

export const addVisitValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
  imie: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz imie...'),
  nazwisko: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz nazwisko...'),
  email: Yup.string()
    .email('Invalid email')
    .required('Wprowadz adres e-mail...'),
  telefon: Yup.string()
    .matches(/^\d{9}$/, 'Wprowadz prawidlowy numer telefonu')
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.string()
    .matches(/^\d{5}$/, 'Wprowadz prawidlowy kod pocztowy')
    .required('Wprowadz kod pocztowy'),
  password: Yup.string()
    .required('Haslo jest wymagane')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})

export const addVisitUserValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
})

export const addVisitNonAuthValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
  imie: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz imie...'),
  nazwisko: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz nazwisko...'),
  email: Yup.string()
    .email('Invalid email')
    .required('Wprowadz adres e-mail...'),
  telefon: Yup.string()
    .matches(/^\d{9}$/, 'Wprowadz prawidlowy numer telefonu')
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.string()
    .matches(/^\d{5}$/, 'Wprowadz prawidlowy kod pocztowy')
    .required('Wprowadz kod pocztowy'),
  password: Yup.string()
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})

export const addVisitAdminValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
  specjalista: Yup.string().required('Wybierz specjaliste'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzine wizyty'),
  imie: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz imie...'),
  nazwisko: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Wprowadz nazwisko...'),
  email: Yup.string()
    .email('Invalid email')
    .required('Wprowadz adres e-mail...'),
  telefon: Yup.string()
    .matches(/^\d{9}$/, 'Wprowadz prawidlowy numer telefonu')
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.string()
    .matches(/^\d{5}$/, 'Wprowadz prawidlowy kod pocztowy')
    .required('Wprowadz kod pocztowy'),
  password: Yup.string()
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})

export const addVisitSearchUserValidationSchema = Yup.object().shape({
  pacjent: Yup.string()
    .required('Wprowadz nazwisko...')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
})

export const updateUserDataValidationSchema = Yup.object().shape({
  imie: Yup.string()
    .min(3, 'Imie musi miec co najmniej 3 znaki')
    .max(25, 'Imie moze miec maksymalnie 25 znakow')
    .required('Imie jest wymagane'),
  nazwisko: Yup.string()
    .min(3, 'Nazwisko musi miec co najmniej 3 znaki')
    .max(50, 'Nazwisko moze miec maksymalnie 50 znakow')
    .required('Nazwisko jest wymagane'),
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('E-mail jest wymagany')
    .label('E-mail'),
  telefon: Yup.string()
    .required('Numer telefonu jest wymagany')
    .matches(/^\d{9}$/, 'Numer telefonu jest wymagany (9 cyfr)'),
  miasto: Yup.string()
    .min(3, 'Miasto musi miec co najmniej 3 znaki')
    .max(50, 'Miasto moze miec maksymalnie 50 znakow')
    .required('Miasto jest wymagana'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.string()
    .required('Kod-pocztowy jest wymagany')
    .matches(/^\d{5}$/, 'Kod-pocztowy jest wymagany (5 cyfr) - bez(-)'),
})

export const signInChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Stare haslo jest wymagane')
    .label('Stare haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
  newPassword: Yup.string()
    .required('Nowe haslo jest wymagane')
    .label('Nowe haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})
