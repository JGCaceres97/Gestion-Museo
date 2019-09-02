const solicitudCtrl = {};

solicitudCtrl.getSolicitudes = (req, res) => res.json({ message: [] });

solicitudCtrl.createSolicitud = (req, res) => res.json({ message: 'Solicitud saved' });

solicitudCtrl.getSolicitud = (req, res) => res.json({ message: [] });

solicitudCtrl.updateSolicitud = (req, res) => res.json({ message: 'Solicitud updated' });

solicitudCtrl.deleteSolicitud = (req, res) => res.json({ message: 'Solicitud deleted' })

module.exports = solicitudCtrl;