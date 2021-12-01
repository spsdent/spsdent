module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      usluga: String,
      specjalista: String,
      data: String,
      godzina: String,
      imie: String,
      nazwisko: String,
      email: String,
      telefon: Number,
      miasto: String,
      ulica: String,
      kodPocztowy: Number,
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

  const Visit = mongoose.model('tutorial', schema)
  return Visit
}
