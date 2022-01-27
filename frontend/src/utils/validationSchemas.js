import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('Wpisz poprawny adres e-mail')
    .label('E-mail'),
  password: Yup.string().required('Hasło jest wymagane').label('Hasło'),
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

export const passwordChangeAdminValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Nowe haslo jest wymagane')
    .label('Nowe haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
  repeatPassword: Yup.string()
    .required('Powtorzenie hasla jest wymagane')
    .label('Powtorz haslo')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    )
    .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
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
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi miec 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miasto musi miec co najmniej 3 znaki')
    .max(50, 'Miasto moze miec maksymalnie 50 znakow')
    .required('Miasto jest wymagane'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi miec 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
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
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi miec 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi miec 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
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
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi miec 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi miec 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
  password: Yup.string()
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})

export const addVisitAdminValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupę usług'),
  usluga: Yup.string().required('Wybierz usługę'),
  specjalista: Yup.string().required('Wybierz specjalistę'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzinę wizyty'),
  imie: Yup.string()
    .min(2, 'Imię jest za krótkie')
    .max(50, 'Imię jest za długie')
    .required('Wprowadź imię'),
  nazwisko: Yup.string()
    .min(2, 'Nazwisko jest za krótkie')
    .max(50, 'Nazwisko jest za długie')
    .required('Wprowadź nazwisko'),
  email: Yup.string()
    .email('Email jest niepoprawny')
    .required('Wprowadź adres e-mail'),
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi mieć 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowość musi mieć co najmniej 3 znaki')
    .max(50, 'Miejscowość może mieć maksymalnie 50 znaków')
    .required('Wprowadź miejscowość'),
  ulica: Yup.string()
    .min(3, 'Ulica musi mieć co najmniej 3 znaki')
    .max(50, 'Ulica może mieć maksymalnie 50 znaków')
    .required('Wprowadź ulicę'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi mieć 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
  password: Yup.string()
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
})

export const addVisitSearchUserValidationSchema = Yup.object().shape({
  pacjent: Yup.string()
    .required('Wprowadź nazwisko')
    .min(2, 'Za krótkie')
    .max(50, 'Za długie'),
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
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi miec 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miasto musi miec co najmniej 3 znaki')
    .max(50, 'Miasto moze miec maksymalnie 50 znakow')
    .required('Miasto jest wymagana'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi miec 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
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

Yup.addMethod(Yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'To pole wymaga podania cyfr')
})

export const createServiceValidationSchema = Yup.object().shape({
  grupa: Yup.string()
    .min(3, 'Grupa musi miec co najmniej 3 znaki')
    .max(25, 'Grupa moze miec maksymalnie 25 znakow')
    .required('Grupa jest wymagana'),
  u1nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(25, 'Usluga moze miec maksymalnie 25 znakow')
    .required('Podanie przynajmniej jednej uslugi jest wymagane'),
  u1cena: Yup.string()
    .integer(Yup.ref('u1cena'))
    .required('Cena jest wymagana'),
  u2nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(25, 'Usluga moze miec maksymalnie 25 znakow'),
  u2cena: Yup.string().integer(Yup.ref('u1cena')),
  u3nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(25, 'Usluga moze miec maksymalnie 25 znakow'),
  u3cena: Yup.string().integer(Yup.ref('u1cena')),
  u4nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(25, 'Usluga moze miec maksymalnie 25 znakow'),
  u4cena: Yup.string().integer(Yup.ref('u1cena')),
  u5nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(25, 'Usluga moze miec maksymalnie 25 znakow'),
  u5cena: Yup.string().integer(Yup.ref('u1cena')),
})

export const updateServiceValidationSchema = Yup.object().shape({
  grupa: Yup.string()
    .min(3, 'Grupa musi miec co najmniej 3 znaki')
    .max(50, 'Grupa moze miec maksymalnie 50 znakow'),
  nazwa: Yup.string()
    .min(3, 'Usluga musi miec co najmniej 3 znaki')
    .max(50, 'Usluga moze miec maksymalnie 50 znakow')
    .required('Podanie nazwy uslugi jest wymagane'),
  cena: Yup.number()
    .test(
      'len',
      'Cena musi byc podana',
      (val) => val && val.toString().length > 0
    )
    .required('Podanie ceny uslugi jest wymagane'),
})

function startBigger(ref, msg) {
  return this.test({
    name: 'startBigger',
    exclusive: false,
    message: msg || 'Godzina rozpoczecia musi byc mniejsza niz zakonczenia',
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value > this.resolve(ref)
    },
  })
}

function endBigger(ref, msg) {
  return this.test({
    name: 'endBigger',
    exclusive: false,
    message: msg || 'Godzina zakonczenia musi byc wieksza niz rozpoczecia',
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value < this.resolve(ref)
    },
  })
}

Yup.addMethod(Yup.number, 'startBigger', startBigger)
Yup.addMethod(Yup.number, 'endBigger', endBigger)

export const updateRoleValidationSchema = Yup.object().shape({
  rola: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
  }),
})

export const updatePermissionsValidationSchema = Yup.object().shape({
  rola: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
  }),
  godzinyStart: Yup.number()
    .integer()
    .moreThan(7, 'Godzina rozpoczecia to min. 8')
    .lessThan(17, 'Godzina zakonczenia to max. 16')
    .endBigger(Yup.ref('godzinyKoniec')),
  godzinyKoniec: Yup.number()
    .integer()
    .moreThan(8, 'Godzina zakonczenia to min. 9')
    .lessThan(17, 'Godzina zakonczenia to max. 16')
    .startBigger(Yup.ref('godzinyStart')),
  specjalizacja: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    )
    .min(1, 'Wybierz min. 1 specjalizacje'),
})

export const addVisitAdminTimesheetValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupe uslug...'),
  usluga: Yup.string().required('Wybierz usluge...'),
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
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi miec 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miejscowosc musi miec co najmniej 3 znaki')
    .max(50, 'Miejscowosc moze miec maksymalnie 50 znakow')
    .required('Wprowadz miejscowosc...'),
  ulica: Yup.string()
    .min(3, 'Ulica musi miec co najmniej 3 znaki')
    .max(50, 'Ulica moze miec maksymalnie 50 znakow')
    .required('Wprowadz ulice...'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi miec 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
  password: Yup.string()
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Haslo musi zawierac min. 8 znakow w tym: litere, cyfre i znak specjalny'
    ),
})
