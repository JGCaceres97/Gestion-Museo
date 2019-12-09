const { Schema, model } = require('mongoose');

const municipioSchema = new Schema(
  {
    IDDepartamento: {
      type: Schema.Types.ObjectId,
      ref: 'Departamento',
      required: true
    },
    Nombre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    }
  },
  {
    timestamps: true,
    collection: 'Municipios'
  }
);

module.exports = model('Municipio', municipioSchema);
