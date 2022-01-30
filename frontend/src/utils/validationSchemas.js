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
    .required('Stare hasło jest wymagane')
    .label('Stare hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
  newPassword: Yup.string()
    .required('Nowe hasło jest wymagane')
    .label('Nowe hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
})

export const passwordChangeAdminValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Nowe hasło jest wymagane')
    .label('Nowe hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
  repeatPassword: Yup.string()
    .required('Powtórzenie hasła jest wymagane')
    .label('Powtórz hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierac min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    )
    .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
})

export const signupValidationSchema = Yup.object().shape({
  imie: Yup.string()
    .min(3, 'Imię musi mieć co najmniej 3 znaki')
    .max(25, 'Imię może mieć maksymalnie 25 znaków')
    .required('Imię jest wymagane'),
  nazwisko: Yup.string()
    .min(3, 'Nazwisko musi mieć co najmniej 3 znaki')
    .max(50, 'Nazwisko może mieć maksymalnie 50 znaków')
    .required('Nazwisko jest wymagane'),
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('E-mail jest wymagany')
    .label('E-mail'),
  password: Yup.string()
    .required('Hasło jest wymagane')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi mieć 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miasto musi mieć co najmniej 3 znaki')
    .max(50, 'Miasto może mieć maksymalnie 50 znaków')
    .required('Miasto jest wymagane'),
  ulica: Yup.string()
    .min(3, 'Ulica musi mieć co najmniej 3 znaki')
    .max(50, 'Ulica może mieć maksymalnie 50 znaków')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi mieć 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
})

export const addVisitValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupę usług'),
  usluga: Yup.string().required('Wybierz usługę'),
  specjalista: Yup.string().required('Wybierz specjalistę'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzinę wizyty'),
  imie: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadź imię'),
  nazwisko: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadz nazwisko'),
  email: Yup.string()
    .email('Niepoprawny email')
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
    .required('Hasło jest wymagane')
    .label('Password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
})

export const addVisitUserValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupę usług'),
  usluga: Yup.string().required('Wybierz usługę'),
  specjalista: Yup.string().required('Wybierz specjalistę'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzinę wizyty'),
})

export const addVisitNonAuthValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupę usług'),
  usluga: Yup.string().required('Wybierz usługę'),
  specjalista: Yup.string().required('Wybierz specjalistę'),
  data: Yup.string().required('Wybierz termin wizyty'),
  godzina: Yup.string().required('Wybierz godzinę wizyty'),
  imie: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadź imię'),
  nazwisko: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadź nazwisko'),
  email: Yup.string()
    .email('Niepoprawny email')
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
    .min(3, 'Imię musi mieć co najmniej 3 znaki')
    .max(25, 'Imię może mieć maksymalnie 25 znaków')
    .required('Imię jest wymagane'),
  nazwisko: Yup.string()
    .min(3, 'Nazwisko musi mieć co najmniej 3 znaki')
    .max(50, 'Nazwisko może mieć maksymalnie 50 znaków')
    .required('Nazwisko jest wymagane'),
  email: Yup.string()
    .required('E-mail jest wymagany')
    .email('E-mail jest wymagany')
    .label('E-mail'),
  telefon: Yup.number()
    .test(
      'len',
      'Numer telefonu musi mieć 9 cyfr',
      (val) => val && val.toString().length === 9
    )
    .required('Numer telefonu jest wymagany'),
  miasto: Yup.string()
    .min(3, 'Miasto musi mieć co najmniej 3 znaki')
    .max(50, 'Miasto może mieć maksymalnie 50 znaków')
    .required('Miasto jest wymagane'),
  ulica: Yup.string()
    .min(3, 'Ulica musi mieć co najmniej 3 znaki')
    .max(50, 'Ulica może mieć maksymalnie 50 znaków')
    .required('Ulica jest wymagana'),
  kodPocztowy: Yup.number()
    .test(
      'len',
      'Kod pocztowy musi mieć 5 cyfr',
      (val) => val && val.toString().length === 5
    )
    .required('Kod pocztowy jest wymagany'),
})

export const signInChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Stare hasło jest wymagane')
    .label('Stare hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
  newPassword: Yup.string()
    .required('Nowe hasło jest wymagane')
    .label('Nowe hasło')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Hasło musi zawierać min. 8 znaków w tym: literę, cyfrę i znak specjalny'
    ),
})

Yup.addMethod(Yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'To pole wymaga podania cyfr')
})

export const createServiceValidationSchema = Yup.object().shape({
  grupa: Yup.string()
    .min(3, 'Grupa musi mieć co najmniej 3 znaki')
    .max(25, 'Grupa może mieć maksymalnie 25 znaków')
    .required('Grupa jest wymagana'),
  u1nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(25, 'Usługa może mieć maksymalnie 25 znaków')
    .required('Podanie przynajmniej jednej usługi jest wymagane'),
  u1cena: Yup.string()
    .integer(Yup.ref('u1cena'))
    .required('Cena jest wymagana'),
  u2nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(25, 'Usługa może miec maksymalnie 25 znaków'),
  u2cena: Yup.string().integer(Yup.ref('u1cena')),
  u3nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(25, 'Usługa może mieć maksymalnie 25 znaków'),
  u3cena: Yup.string().integer(Yup.ref('u1cena')),
  u4nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(25, 'Usługa może mieć maksymalnie 25 znaków'),
  u4cena: Yup.string().integer(Yup.ref('u1cena')),
  u5nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(25, 'Usługa może mieć maksymalnie 25 znaków'),
  u5cena: Yup.string().integer(Yup.ref('u1cena')),
})

export const updateServiceValidationSchema = Yup.object().shape({
  grupa: Yup.string()
    .min(3, 'Grupa musi mieć co najmniej 3 znaki')
    .max(50, 'Grupa może mieć maksymalnie 50 znaków'),
  nazwa: Yup.string()
    .min(3, 'Usługa musi mieć co najmniej 3 znaki')
    .max(50, 'Usługa może mieć maksymalnie 50 znaków')
    .required('Podanie nazwy usługi jest wymagane'),
  cena: Yup.number()
    .test(
      'len',
      'Cena musi byc podana',
      (val) => val && val.toString().length > 0
    )
    .required('Podanie ceny usługi jest wymagane'),
})

function startBigger(ref, msg) {
  return this.test({
    name: 'startBigger',
    exclusive: false,
    message: msg || 'Godzina rozpoczęcia musi być mniejsza niż zakończenia',
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
    message: msg || 'Godzina zakończenia musi być większa niż rozpoczęcia',
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
    .moreThan(7, 'Godzina rozpoczęcia to min. 8')
    .lessThan(17, 'Godzina zakończenia to max. 16')
    .endBigger(Yup.ref('godzinyKoniec')),
  godzinyKoniec: Yup.number()
    .integer()
    .moreThan(8, 'Godzina zakończenia to min. 9')
    .lessThan(17, 'Godzina zakończenia to max. 16')
    .startBigger(Yup.ref('godzinyStart')),
  specjalizacja: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      })
    )
    .min(1, 'Wybierz min. 1 specjalizację'),
})

export const addVisitAdminTimesheetValidationSchema = Yup.object().shape({
  grupa: Yup.string().required('Wybierz grupę usług'),
  usluga: Yup.string().required('Wybierz usługę'),
  imie: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadz imię'),
  nazwisko: Yup.string()
    .min(2, 'Za krótkie')
    .max(50, 'Za długie')
    .required('Wprowadz nazwisko'),
  email: Yup.string()
    .email('Niepoprawny email')
    .required('Wprowadź adres email'),
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
