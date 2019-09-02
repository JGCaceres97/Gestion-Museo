const inventarioCtrl = {};

inventarioCtrl.getItems = (req, res) => res.json({ message: [] });

inventarioCtrl.createItem = (req, res) => res.json({ message: 'Item saved' });

inventarioCtrl.getItem = (req, res) => res.json({ message: [] });

inventarioCtrl.updateItem = (req, res) => res.json({ message: 'Item updated' });

inventarioCtrl.deleteItem = (req, res) => res.json({ message: 'Item deleted' })

module.exports = inventarioCtrl;