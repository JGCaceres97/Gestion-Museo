const { Schema, model } = require('mongoose');

const departamentoSchema = new Schema(
  {
    Nombre: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true
    }
  },
  {
    timestamps: true,
    collection: 'Departamentos'
  }
);

module.exports = model('Departamento', departamentoSchema);
