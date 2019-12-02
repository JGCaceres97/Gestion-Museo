const { Schema, model } = require('mongoose');

const horarioSchema = new Schema(
  {
    Hora: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxlength: 10
    }
  },
  {
    timestamps: true,
    collection: 'Horarios'
  }
);

module.exports = model('Horario', horarioSchema);
