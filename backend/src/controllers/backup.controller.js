const backupCtrl = {};
const { secretKey, maxBackups } = require('../../config');
const { createRegistro } = require('./bitacora.controller');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;
const rimraf = require('rimraf');
const moment = require('moment');

const Autor = require('../models/Autor');
const Bitacora = require('../models/Bitacora');
const Departamento = require('../models/Departamento');
const Estado = require('../models/Estado');
const Etiqueta = require('../models/Etiqueta');
const Horario = require('../models/Horario');
const Libro = require('../models/Libro');
const Municipio = require('../models/Municipio');
const Rol = require('../models/Rol');
const Solicitud = require('../models/Solicitud');
const Usuario = require('../models/Usuario');

const key = crypto
  .createHash('sha256')
  .update(String(secretKey))
  .digest('base64')
  .substr(0, 32);

const readFiles = async fileDir => {
  try {
    const data = await fs.readFile(fileDir, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const encrypt = object => {
  const data = JSON.stringify(object);
  const iv = crypto.randomBytes(128);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(data, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return JSON.stringify({
    Tag: cipher.getAuthTag(),
    IV: iv.toString('hex'),
    Data: encrypted.toString('hex')
  });
};

const decrypt = object => {
  const iv = Buffer.from(object.IV, 'hex');
  const encrypted = Buffer.from(object.Data, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(object.Tag));

  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return JSON.parse(decrypted.toString());
};

const doRestore = async (model, item) => {
  try {
    if (await model.exists()) await model.collection.drop();

    item.map(async i => {
      const nuevo = new model(i);
      await nuevo.save();
    });
  } catch (e) {
    throw e;
  }
};

backupCtrl.getBackups = async (req, res) => {
  try {
    const Backups = await fs.readdir(path.join(__dirname, '../../../db/backups'));

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Lectura de copias de seguridad disponibles.'
    });

    res.status(200).json(Backups);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Ha ocurrido un error al realizar la copia de seguridad de la base de datos.'
    });
  }
};

backupCtrl.backupDB = async (req, res) => {
  try {
    const backupsPath = path.join(__dirname, '../../../db/backups');
    let backups = await fs.readdir(backupsPath);

    while (backups.length >= maxBackups) {
      rimraf(path.join(backupsPath, backups.shift()), err => {
        if (err) throw err;
      });
      backups = await fs.readdir(backupsPath);
    }

    const time = moment().toISOString();
    const folder = path.join(backupsPath, `Backup--${time}`);
    await fs.mkdir(folder);

    const autores = await Autor.find();
    const bitacora = await Bitacora.find();
    const deptos = await Departamento.find();
    const estados = await Estado.find();
    const etiquetas = await Etiqueta.find();
    const libros = await Libro.find();
    const horarios = await Horario.find();
    const municipios = await Municipio.find();
    const roles = await Rol.find();
    const solicitudes = await Solicitud.find();
    const usuarios = await Usuario.find();

    await fs.writeFile(folder + '/Autores', encrypt(autores), 'utf8');
    await fs.writeFile(folder + '/Bitacora', encrypt(bitacora), 'utf8');
    await fs.writeFile(folder + '/Deptos', encrypt(deptos), 'utf8');
    await fs.writeFile(folder + '/Estados', encrypt(estados), 'utf8');
    await fs.writeFile(folder + '/Etiquetas', encrypt(etiquetas), 'utf8');
    await fs.writeFile(folder + '/Libros', encrypt(libros), 'utf8');
    await fs.writeFile(folder + '/Horarios', encrypt(horarios), 'utf8');
    await fs.writeFile(folder + '/Municipios', encrypt(municipios), 'utf8');
    await fs.writeFile(folder + '/Roles', encrypt(roles), 'utf8');
    await fs.writeFile(folder + '/Solicitudes', encrypt(solicitudes), 'utf8');
    await fs.writeFile(folder + '/Usuarios', encrypt(usuarios), 'utf8');

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Copia de seguridad de la base de datos.'
    });

    res.status(201).json({ message: 'Copia de seguridad realizada con éxito.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Ha ocurrido un error al realizar la copia de seguridad de la base de datos.'
    });
  }
};

backupCtrl.restoreDB = async (req, res) => {
  try {
    const { Restore } = req.body;

    const folder = path.join(__dirname, '../../../db/backups/', Restore);
    const backupFiles = await fs.readdir(folder);
    const data = await Promise.all(backupFiles.map(file => readFiles(folder + `/${file}`)));

    const decrypted = data.map(i => decrypt(i));

    await Promise.all(
      decrypted.map(async (item, ind) => {
        switch (backupFiles[ind]) {
          case 'Bitacora':
            await doRestore(Bitacora, item);
            break;
          case 'Deptos':
            await doRestore(Departamento, item);
            break;
          case 'Estados':
            await doRestore(Estado, item);
            break;
          case 'Etiquetas':
            await doRestore(Etiqueta, item);
            break;
          case 'Horarios':
            await doRestore(Horario, item);
            break;
          case 'Libros':
            await doRestore(Libro, item);
            break;
          case 'Municipios':
            await doRestore(Municipio, item);
            break;
          case 'Roles':
            await doRestore(Rol, item);
            break;
          case 'Solicitudes':
            await doRestore(Solicitud, item);
            break;
          case 'Usuarios':
            await doRestore(Usuario, item);
            break;
          default:
            break;
        }
      })
    );

    await createRegistro({
      IDUsuario: req.usuario.ID,
      Email: req.usuario.Email,
      IP: req.ip.split(':').pop(),
      Accion: 'Restauración de la base de datos.'
    });

    res.status(200).json({ message: 'Restauración realizada con éxito.' });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: 'Ha ocurrido un error al realizar la restauración de la base de datos.' });
  }
};

module.exports = backupCtrl;
