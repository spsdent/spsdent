module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      grupa: String,
      usluga: String,
      specjalista: {
        sid: String,
        imie: String,
        nazwisko: String,
      },
      data: String,
      godzina: String,
      imie: String,
      nazwisko: String,
      email: String,
      telefon: Number,
      miasto: String,
      ulica: String,
      kodPocztowy: Number,
      cena: String,
      uid: String,
      status: Boolean,
    },
    {
      timestamps: true,
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Visit = mongoose.model('visit', schema)
  return Visit
}
