export const days = ['Nd', 'Pon', 'Wt', 'Sr', 'Czw', 'Pt', 'Sb']
export const months = [
  'Sty',
  'Luty',
  'Mar',
  'Kw',
  'Maj',
  'Cze',
  'Lip',
  'Sie',
  'Wrz',
  'Paz',
  'Lis',
  'Gru',
]
export const initialAddVisitValues = {
  grupa: '',
  usluga: '',
  specjalista: '',
  data: '',
  godzina: '',
  imie: '',
  nazwisko: '',
  email: '',
  telefon: '',
  miasto: '',
  ulica: '',
  kodPocztowy: '',
  status: false,
  pacjent: '',
}

export const dentHours = [8, 9, 10, 11, 12, 13, 14, 15, 16]

export const startDate =
  new Date().getHours() > 16
    ? new Date(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() + 1
        }`
      )
    : new Date()

export const minDate =
  new Date().getHours() > 16
    ? new Date(
        `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
          new Date().getDate() + 1
        }`
      )
    : new Date()
