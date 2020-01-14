const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');

/**
 * Método para crear el usuario administrador al iniciar la base de datos.
 * @param {string} adminPassword Contraseña para el usuario administrador.
 */
const createAdmin = async adminPassword => {
  const rolExist = await Rol.findOne({
    Nombre: 'Admin',
    Permisos: { Bitacora: true, Reporteria: true, Usuarios: true, Backup: true }
  });

  if (!rolExist) {
    const adminRol = new Rol({
      Nombre: 'Admin',
      Permisos: {
        Bitacora: true,
        Reporteria: true,
        Usuarios: true,
        Backup: true
      },
      Descripcion: 'Usuario administrador del sistema.'
    });

    const adminExist = await Usuario.findOne({
      Nombre: 'Admin',
      Apellidos: 'Sys',
      Email: 'admin@admin.sys'
    });

    if (!adminExist) {
      const adminUser = new Usuario({
        IDRol: adminRol._id,
        Nombres: 'Admin',
        Apellidos: 'Sys',
        Email: 'admin@admin.sys',
        Password: adminPassword
      });

      adminUser.Password = await adminUser.encryptPassword(adminUser.Password);

      await adminRol.save();
      await adminUser.save();
    }
  }
};

module.exports = createAdmin;
