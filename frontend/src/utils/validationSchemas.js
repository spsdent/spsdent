import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('E-mail jest wymagany').email('Wpisz poprawny adres e-mail').label('E-mail'),
  password: Yup.string()
    .required('Haslo jest wymagane')
    .label('Haslo')
})

export const passwordChangeValidationSchema = Yup.object().shape({
  email: Yup.string().required('E-mail jest wymagany').email().label('E-mail'),
  newPassword: Yup.string()
    .required('Nowe haslo jest wymagane')
    .label('New Password')
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
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    )
    .oneOf([Yup.ref('password')], 'Powtarzane haslo musi byc takie same.')
    .required('Potwierdzenie hasla jest wymagane.'),
  telefon: Yup.string()
    .required('Numer telefonu jest wymagany')
    .matches(/^\d{9}$/, 'Numer telefonu jest wymagany (9 cyfr)'),
  miejscowosc: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Miejscowosc jest wymagana'),
  regulamin: Yup.bool().oneOf([true], 'Pole wymaga zaznaczenia'),
})

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail jst wymagany')
    .label('E-mail')
    .email('Wprowadz poprawny adres e-mail'),
})
